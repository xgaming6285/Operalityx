import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Download,
  FileText,
  Calendar,
  User,
  ExternalLink,
  Search,
  ChevronDown,
  Brain,
  Zap,
  Users,
  BookOpen,
  Newspaper,
  Briefcase,
  HelpCircle,
  Home,
} from "lucide-react";
import { DocumentViewerProps, RelatedArticle } from "../types/document";
import ContactForm from "./ContactForm";
import { ArticleService, ArticleMeta } from "../services/articleService";

// -----------------------------
// Types
// -----------------------------

type Props = DocumentViewerProps & {
  /** Optional: related items to show in the right sidebar */
  relatedArticles?: RelatedArticle[];
  /** Optional: called when a related item is clicked */
  onSelectArticle?: (article: RelatedArticle) => void;
};

const NAV_HEIGHT = 56; // px

// -----------------------------
// Navigation Sidebar (new)
// -----------------------------

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  action?: 'navigate' | 'close';
  category: string; // Add category for filtering
};

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home, description: "Close viewer", category: "all", action: "close" },
  { name: "Research", href: "/research", icon: Brain, description: "Research papers and studies", category: "research" },
  { name: "Solutions", href: "/solutions", icon: Zap, description: "Business solutions", category: "solution" },
  { name: "Community", href: "/community", icon: Users, description: "Community content", category: "community" },
  { name: "Stories", href: "/stories", icon: BookOpen, description: "Success stories", category: "story" },
  { name: "News", href: "/news", icon: Newspaper, description: "Latest news", category: "news" },
  { name: "Careers", href: "/careers", icon: Briefcase, description: "Career opportunities", category: "careers" },
  { name: "Support", href: "/support", icon: HelpCircle, description: "Get help and support", category: "support" },
];

const NavigationSidebar: React.FC<{ 
  onClose: () => void; 
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}> = ({ onClose, onCategoryChange, selectedCategory }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const controls = useAnimation();

  const handleItemClick = async (item: NavigationItem) => {
    if (item.action === 'close') {
      onClose();
    } else {
      // Add a subtle animation feedback
      await controls.start({ scale: 0.95 });
      await controls.start({ scale: 1 });
      
      // Filter articles by category instead of navigating
      onCategoryChange(item.category);
    }
  };

  return (
    <aside className={`hidden xl:flex flex-col border-r border-gray-200 bg-gray-50/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50 min-h-0 transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <div className="text-sm font-semibold text-gray-900">Navigation</div>
                <div className="text-xs text-gray-500">Quick access</div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-auto scrollbar-custom px-3 py-4 space-y-2">
        {navigationItems.map((item, index) => (
          <motion.button
            key={item.name}
            onClick={() => handleItemClick(item)}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 w-full text-left ${
              isCollapsed ? "justify-center" : ""
            } ${
              selectedCategory === item.category ? "bg-white shadow-sm border border-gray-200" : ""
            }`}
            title={isCollapsed ? item.description : undefined}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex-shrink-0">
              <item.icon className={`w-5 h-5 transition-colors ${
                selectedCategory === item.category 
                  ? "text-blue-600" 
                  : "text-gray-600 group-hover:text-gray-900"
              }`} />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-medium transition-colors ${
                  selectedCategory === item.category 
                    ? "text-blue-900 font-semibold" 
                    : "text-gray-900 group-hover:text-gray-700"
                }`}>
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {item.description}
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="text-xs text-gray-500 text-center">
            Operalityx
          </div>
        </div>
      )}
    </aside>
  );
};

// -----------------------------
// Sidebar (existing - renamed to RelatedSidebar)
// -----------------------------

type SidebarProps = {
  items: RelatedArticle[];
  formatDate: (d?: string) => string;
  onSelect?: (a: RelatedArticle) => void;
  loading?: boolean;
  category?: string;
};

const RelatedSidebar: React.FC<SidebarProps> = ({ items, formatDate, onSelect, loading, category }) => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "title">("recent");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((a) =>
      q
        ? `${a.title} ${a.subtitle ?? ""} ${a.description ?? ""}`.toLowerCase().includes(q)
        : true
    );

    return [...list].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      // recent first (fallback to 0)
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }, [items, query, sortBy]);

  const isNew = (d?: string) => {
    if (!d) return false;
    const created = new Date(d).getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - created < sevenDays;
  };

  return (
    <aside className="hidden lg:flex flex-col border-l border-gray-200 bg-gray-50/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50 min-h-0">
      {/* Sticky/filter bar */}
      <div className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur border-b border-gray-200">
        <div className="px-5 pt-4">
          <div className="flex items-baseline justify-between">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-sm font-semibold text-gray-900"
                animate={{ color: loading ? "#9ca3af" : "#111827" }}
                transition={{ duration: 0.2 }}
              >
                {(category || "all") === "all" ? "More articles" : `${(category || "").charAt(0).toUpperCase() + (category || "").slice(1)} articles`}
              </motion.div>
              <motion.div 
                className="text-xs text-gray-500"
                animate={{ opacity: loading ? 0.6 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {loading ? "Loading..." : (category || "all") === "all" ? "You might also like" : `All ${category || ""} content`}
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-[11px] text-gray-500"
              animate={{ opacity: loading ? 0.6 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? "..." : `${filtered.length} results`}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center gap-2 pb-4">
            <motion.div 
              className="relative flex-1"
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Search className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${
                isSearchFocused ? "text-blue-500" : "text-gray-400"
              }`} />
              <input
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-md border transition-all duration-200 bg-white focus:outline-none ${
                  isSearchFocused 
                    ? "border-blue-300 ring-2 ring-blue-100 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="Search related articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>

            <div className="relative">
              <select
                className="appearance-none text-xs pl-3 pr-7 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Most recent</option>
                <option value="title">Title (A–Z)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

             {/* List */}
       <div className="flex-1 overflow-auto scrollbar-custom px-4 py-4 space-y-4">
         <AnimatePresence mode="wait">
           {loading ? (
             <motion.div
               key="loading"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="space-y-4"
             >
               {/* Professional Loading Skeletons */}
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="rounded-xl bg-white border border-gray-200 overflow-hidden"
                 >
                   <div className="relative w-full h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                   </div>
                   <div className="p-4 space-y-3">
                     <div className="space-y-2">
                       <div className="h-4 bg-gray-200 rounded animate-pulse" />
                       <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                     </div>
                     <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                   </div>
                 </motion.div>
               ))}
             </motion.div>
           ) : (
             <motion.div
               key="content"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="space-y-4"
             >
               {filtered.map((a, index) => (
                 <motion.button
                   key={a.id}
                   onClick={() => onSelect?.(a)}
                   className="group w-full text-left"
                   aria-label={`Open ${a.title}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.05, duration: 0.3 }}
                   whileHover={{ 
                     scale: 1.02,
                     transition: { duration: 0.2 }
                   }}
                   whileTap={{ scale: 0.98 }}
                 >
                   <motion.div 
                     className="rounded-xl bg-white border border-gray-200/80 overflow-hidden shadow-sm"
                     whileHover={{ 
                       borderColor: "#d1d5db",
                       boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                       transition: { duration: 0.2 }
                     }}
                   >
               {/* Thumbnail - larger and more prominent */}
               <div className="relative w-full h-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                 {a.thumbnail ? (
                   <motion.img
                     src={a.thumbnail}
                     alt={a.title}
                     className="w-full h-full object-cover"
                     loading="lazy"
                     whileHover={{ scale: 1.08 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                   />
                 ) : (
                   <motion.div 
                     className="w-full h-full flex items-center justify-center text-gray-400"
                     whileHover={{ scale: 1.1 }}
                     transition={{ duration: 0.2 }}
                   >
                     <FileText className="w-8 h-8" />
                   </motion.div>
                 )}
                 {/* Enhanced gradient overlay */}
                 <motion.div 
                   className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"
                   initial={{ opacity: 0 }}
                   whileHover={{ opacity: 1 }}
                   transition={{ duration: 0.3 }}
                 />
                 
                 {/* New badge positioned on thumbnail */}
                 {isNew(a.createdAt) && (
                   <motion.div 
                     className="absolute top-2 right-2"
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                   >
                     <motion.span 
                       className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                       initial={{ 
                         boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.3)"
                       }}
                       whileHover={{ 
                         boxShadow: "0 8px 12px -1px rgba(16, 185, 129, 0.4)"
                       }}
                       transition={{ duration: 0.2 }}
                     >
                       New
                     </motion.span>
                   </motion.div>
                 )}
               </div>

               {/* Content - more spacious */}
               <div className="p-5">
                 <div className="flex items-start justify-between gap-3 mb-3">
                   <motion.h4 
                     className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight"
                     whileHover={{ color: "#374151" }}
                     transition={{ duration: 0.2 }}
                   >
                     {a.title}
                   </motion.h4>
                   <motion.div
                     whileHover={{ scale: 1.2, color: "#4b5563" }}
                     transition={{ duration: 0.2 }}
                   >
                     <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                   </motion.div>
                 </div>
                 
                 {a.subtitle && (
                   <motion.p 
                     className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed"
                     initial={{ opacity: 0.8 }}
                     whileHover={{ opacity: 1 }}
                     transition={{ duration: 0.2 }}
                   >
                     {a.subtitle}
                   </motion.p>
                 )}

                 <div className="flex items-center gap-3 text-xs text-gray-500">
                   {a.createdAt && (
                     <motion.span 
                       className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50"
                       whileHover={{ backgroundColor: "#f3f4f6", scale: 1.05 }}
                       transition={{ duration: 0.2 }}
                     >
                       <Calendar className="w-3.5 h-3.5" />
                       {formatDate(a.createdAt)}
                     </motion.span>
                   )}
                 </div>
               </div>
                   </motion.div>
                 </motion.button>
               ))}
             </motion.div>
           )}
         </AnimatePresence>

        {!loading && filtered.length === 0 && (
          <motion.div 
            className="px-3 py-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              {category === "careers" ? "🚀 Career opportunities coming soon..." :
               category === "support" ? "💬 Support resources coming soon..." :
               "🔍 No articles match your search."}
            </motion.div>
          </motion.div>
        )}
      </div>
    </aside>
  );
};

// -----------------------------
// Main viewer
// -----------------------------

const DocumentViewer: React.FC<Props> = ({
  document: doc,
  onClose,
  fullscreen = false,
  relatedArticles = [],
  onSelectArticle,
}) => {
  // Device / layout state
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showMetadata, setShowMetadata] = useState(false);
  const [isCleanView, setIsCleanView] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState<RelatedArticle[]>(relatedArticles);
  const [loadingArticles, setLoadingArticles] = useState(false);

  // Detect mobile and maintain fullscreen default
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && !fullscreen) {
        setIsFullscreen(true);
      } else if (!mobile && !fullscreen) {
        setIsFullscreen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [fullscreen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCleanView) {
          setIsCleanView(false);
        } else if (isFullscreen && !isMobile) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if ((e.key === "h" || e.key === "H") && doc.contentType === "pdf") {
        setIsCleanView((v) => !v);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen, isCleanView, isMobile, onClose, doc.contentType]);

  // Help bubble when entering clean view
  useEffect(() => {
    if (isCleanView) {
      setShowHelpTooltip(true);
      const t = setTimeout(() => setShowHelpTooltip(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isCleanView]);

  const toggleFullscreen = () => {
    if (isMobile && isFullscreen) return; // keep fullscreen on mobile
    setIsFullscreen((v) => !v);
  };

  const toggleCleanView = () => setIsCleanView((v) => !v);

  const downloadDocument = () => {
    if (doc.contentType === "pdf") {
      const a = document.createElement("a");
      a.href = doc.content;
      a.download = doc.originalFileName || `${doc.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([doc.content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasSidebar = useMemo(
    () => Array.isArray(relatedArticles) && relatedArticles.length > 0,
    [relatedArticles]
  );

  // Load articles for the selected category
  const loadArticlesForCategory = useCallback(async (category: string) => {
    if (category === "all") {
      setFilteredArticles(relatedArticles);
      return;
    }

    // Handle special categories that don't have articles
    if (category === "careers" || category === "support") {
      setFilteredArticles([]);
      return;
    }

    setLoadingArticles(true);
    try {
      const articles = await ArticleService.getArticlesByType(category);
      const relatedArticlesForCategory = articles.map((article: ArticleMeta) => ({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        thumbnail: article.thumbnail,
        createdAt: article.createdAt,
        description: article.description,
      }));
      setFilteredArticles(relatedArticlesForCategory);
    } catch (error) {
      console.error("Failed to load articles for category:", category, error);
      setFilteredArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  }, [relatedArticles]);

  // Handle category change
  const handleCategoryChange = useCallback(async (category: string) => {
    // Add a subtle loading transition
    setLoadingArticles(true);
    setSelectedCategory(category);
    
    // Small delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 200));
    
    loadArticlesForCategory(category);
  }, [loadArticlesForCategory]);

  // Load initial articles
  useEffect(() => {
    loadArticlesForCategory(selectedCategory);
  }, [loadArticlesForCategory, selectedCategory]);

  // Prevent body scroll when DocumentViewer is open
  useEffect(() => {
    // Save the original styles
    const originalBodyOverflow = window.getComputedStyle(document.body).overflow;
    const originalHtmlOverflow = window.getComputedStyle(document.documentElement).overflow;
    const originalBodyPosition = window.getComputedStyle(document.body).position;
    const rootElement = document.getElementById('root');
    const originalRootOverflow = rootElement ? window.getComputedStyle(rootElement).overflow : '';
    
    // Prevent body, html, and root scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    // Also prevent root element scroll
    if (rootElement) {
      rootElement.style.overflow = 'hidden';
    }
    
    // Cleanup: restore original styles when component unmounts
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = '';
      document.body.style.height = '';
      
      if (rootElement) {
        rootElement.style.overflow = originalRootOverflow;
      }
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isFullscreen || isCleanView
          ? "bg-white"
          : "bg-black/50 flex items-center justify-center p-4"
      }`}
    >
      {/* Outer container */}
      <div
        className={`relative bg-white ${
          isFullscreen || isCleanView
            ? "w-full h-full"
            : "w-full max-w-[1200px] h-full max-h-[92vh] rounded-2xl shadow-2xl"
        } flex flex-col overflow-hidden`}
        style={{
          // smooth corners in non-fullscreen
          ...(isFullscreen || isCleanView ? {} : { backdropFilter: "blur(0.5px)" }),
        }}
      >
        {/* Sticky Nav (always visible) */}
        <div
          className="sticky top-0 z-20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200"
          style={{ height: NAV_HEIGHT }}
        >
          <div className="h-full px-3 sm:px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 border border-gray-200">
                <FileText className="w-4 h-4 text-gray-700" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-[15px] truncate">
                  {doc.title}
                </h3>
                {doc.subtitle && (
                  <p className="text-[11px] sm:text-xs text-gray-500 truncate">{doc.subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Metadata toggle (desktop) */}
              {!isMobile && (
                <button
                  onClick={() => setShowMetadata((v) => !v)}
                  className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  title="Show document info"
                >
                  <FileText className="w-4 h-4 text-gray-700" />
                </button>
              )}

              {/* Clean view for PDFs (desktop) */}
              {doc.contentType === "pdf" && !isMobile && (
                <button
                  onClick={toggleCleanView}
                  className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  title="Toggle clean view (H)"
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              )}

              {/* Download */}
              <button
                onClick={downloadDocument}
                className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                title="Download document"
              >
                <Download className="w-4 h-4 text-gray-700" />
              </button>

              {/* Fullscreen toggle (desktop) */}
              {!isMobile && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-700" />
                  )}
                </button>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                title="Close viewer"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Metadata row (desktop only) */}
          {showMetadata && !isMobile && (
            <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-600 bg-white/80">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {doc.metadata?.author && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{doc.metadata.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="truncate">{formatDate(doc.metadata?.createdAt)}</span>
                </div>
                {doc.metadata?.wordCount && <div>{doc.metadata.wordCount} words</div>}
                {doc.originalFileName && <div className="truncate">Source: {doc.originalFileName}</div>}
              </div>
            </div>
          )}
        </div>

        {/* Content Area: navigation + main + sidebar */}
        <div className="flex-1 min-h-0">
          <div className="flex h-full">
            {/* Navigation Sidebar (left) */}
            <NavigationSidebar 
              onClose={onClose} 
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
            
            {/* Main content and related sidebar */}
            <div
              className={`flex-1 grid ${
                hasSidebar ? "lg:grid-cols-[1fr_360px]" : "grid-cols-1"
              }`}
            >
              {/* MAIN */}
              <div className="min-h-0 overflow-auto bg-white scrollbar-main">
                {/* Padding top = 0 because header is sticky and outside scroll context */}
                <div
                  className={`${isCleanView ? "" : "px-4 sm:px-6 lg:px-8"} py-0`}
                  style={{ minHeight: `calc(100% - 0px)` }}
                >
                  {/* Render content EXACTLY */}
                  <div className="w-full h-full">
                    <div
                      dangerouslySetInnerHTML={{ __html: doc.content }}
                      style={{
                        width: "100%",
                        minHeight: `calc(100vh - ${NAV_HEIGHT + 8}px)`,
                        backgroundColor: "white",
                      }}
                      className={`${isCleanView ? "" : "prose max-w-none prose-p:leading-7"} `}
                    />
                    {/* Contact form for HTML */}
                    <div className={`${isCleanView ? "hidden" : "px-0 sm:px-2 lg:px-4 py-6 border-t border-gray-200 bg-white"}`}>
                      <ContactForm
                        articleTitle={doc.title}
                        className="max-w-2xl mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR (enhanced) */}
              {hasSidebar && (
                <RelatedSidebar 
                  items={filteredArticles} 
                  formatDate={formatDate} 
                  onSelect={onSelectArticle}
                  loading={loadingArticles}
                  category={selectedCategory}
                />
              )}
            </div>
          </div>
        </div>

        {/* Help tooltip for clean view (still visible, but nav remains) */}
        {isCleanView && showHelpTooltip && (
          <div className="absolute top-[72px] left-1/2 -translate-x-1/2 z-30 bg-black/80 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
            <div className="text-center">
              <p>Clean View Mode</p>
              <p className="text-xs mt-1">Press H to toggle • ESC to exit</p>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close (only when not fullscreen and not clean view) */}
      {!isFullscreen && !isCleanView && (
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      )}
    </div>
  );
};

export default DocumentViewer;
