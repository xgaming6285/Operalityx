import { useState, useEffect, useCallback, useMemo } from "react";
import { ArticleService, ArticleMeta } from "../services/articleService";
import { Document } from "../types/document";

export interface UseArticlesOptions {
  /** Filter articles by type (e.g., "research", "news", "solution", "community", "stories") */
  type?: string;
  /** Auto-load articles on mount */
  autoLoad?: boolean;
  /** Optional: narrow results to a category (if your ArticleMeta has `category`) */
  category?: string;
  /** Optional: automatically open this article id after load (if found) */
  initialArticleId?: string;
  /** How many items to include in related lists (defaults to 12) */
  relatedLimit?: number;
}

export const useArticles = (options: UseArticlesOptions = {}) => {
  const {
    type,
    autoLoad = true,
    category,
    initialArticleId,
    relatedLimit = 12,
  } = options;

  // List state
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Viewer state
  const [selectedArticle, setSelectedArticle] = useState<ArticleMeta | null>(null);
  const [articleContent, setArticleContent] = useState<string | null>(null);
  const [showArticleViewer, setShowArticleViewer] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false);

  /**
   * Load articles metadata
   */
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let loaded: ArticleMeta[];

      if (type) {
        loaded = await ArticleService.getArticlesByType(type);
      } else {
        loaded = await ArticleService.loadArticlesMetadata();
      }

      // Optional narrowing by category if provided
      if (category) {
        loaded = loaded.filter(a => (a as any)?.category === category);
      }

      setArticles(loaded);
      return loaded;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load articles";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, [type, category]);

  /**
   * Open an article given ArticleMeta
   */
  const openArticle = useCallback(async (article: ArticleMeta) => {
    setLoadingArticle(true);
    setError(null);
    try {
      const content = await ArticleService.loadArticleContent(article);
      setSelectedArticle(article);
      setArticleContent(content);
      setShowArticleViewer(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load article");
    } finally {
      setLoadingArticle(false);
    }
  }, []);

  /**
   * Open by id
   */
  const openArticleById = useCallback(async (articleId: string) => {
    setLoadingArticle(true);
    setError(null);
    try {
      const article = await ArticleService.getArticleById(articleId);
      if (!article) {
        throw new Error(`Article with ID "${articleId}" not found`);
      }
      const content = await ArticleService.loadArticleContent(article);
      setSelectedArticle(article);
      setArticleContent(content);
      setShowArticleViewer(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load article");
    } finally {
      setLoadingArticle(false);
    }
  }, []);

  /**
   * Open first article (useful for quick demos)
   */
  const openFirstArticle = useCallback(async () => {
    if (articles.length > 0) {
      await openArticle(articles[0]);
    }
  }, [articles, openArticle]);

  /**
   * Close the viewer
   */
  const closeArticleViewer = useCallback(() => {
    setShowArticleViewer(false);
    setSelectedArticle(null);
    setArticleContent(null);
  }, []);

  /**
   * Convert the current article to a Document for DocumentViewer
   */
  const currentDocument: Document | null = useMemo(() => {
    if (!selectedArticle || !articleContent) return null;
    return ArticleService.articleToDocument(selectedArticle, articleContent);
  }, [selectedArticle, articleContent]);

  /**
   * Refresh (clear cache, reload)
   */
  const refreshArticles = useCallback(async () => {
    ArticleService.clearCache();
    await loadArticles();
  }, [loadArticles]);

  /**
   * Index helpers for next/prev
   */
  const currentIndex = useMemo(() => {
    if (!selectedArticle) return -1;
    return articles.findIndex(a => a.id === selectedArticle.id);
  }, [articles, selectedArticle]);

  const openNext = useCallback(async () => {
    if (currentIndex < 0) return;
    const next = articles[currentIndex + 1];
    if (next) await openArticle(next);
  }, [currentIndex, articles, openArticle]);

  const openPrev = useCallback(async () => {
    if (currentIndex <= 0) return;
    const prev = articles[currentIndex - 1];
    if (prev) await openArticle(prev);
  }, [currentIndex, articles, openArticle]);

  /**
   * Related lists (exclude current). If your ArticleMeta has `category`,
   * relatedByCategory will use the current article's category automatically.
   */
  const relatedByType: ArticleMeta[] = useMemo(() => {
    const curId = selectedArticle?.id;
    return articles
      .filter(a => a.id !== curId)
      .slice(0, relatedLimit);
  }, [articles, selectedArticle, relatedLimit]);

  const relatedByCategory: ArticleMeta[] = useMemo(() => {
    const cat = (selectedArticle as any)?.category;
    if (!cat) return [];
    const curId = selectedArticle?.id;
    return articles
      .filter(a => a.id !== curId && (a as any)?.category === cat)
      .slice(0, relatedLimit);
  }, [articles, selectedArticle, relatedLimit]);

  /**
   * On-demand related getter
   */
  const getRelated = useCallback(
    (opts?: { limit?: number; byCategory?: boolean }) => {
      const lim = opts?.limit ?? relatedLimit;
      const byCat = !!opts?.byCategory;
      const base = byCat && relatedByCategory.length > 0 ? relatedByCategory : relatedByType;
      return base.slice(0, lim);
    },
    [relatedByCategory, relatedByType, relatedLimit]
  );

  /**
   * Auto-load on mount, optionally auto-open an initial article
   */
  useEffect(() => {
    if (!autoLoad) return;
    let cancelled = false;

    (async () => {
      const loaded = await loadArticles();
      if (cancelled) return;

      if (initialArticleId) {
        const match = loaded.find(a => a.id === initialArticleId);
        if (match) {
          await openArticle(match);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [autoLoad, loadArticles, initialArticleId, openArticle]);

  return {
    // Article list state
    articles,
    loading,
    error,

    // Viewer state
    selectedArticle,
    articleContent,
    showArticleViewer,
    loadingArticle,

    // Actions
    loadArticles,
    openArticleById,
    openArticle,
    openFirstArticle,
    closeArticleViewer,
    refreshArticles,

    // Navigation helpers
    openNext,
    openPrev,
    currentIndex,
    isFirst: currentIndex <= 0,
    isLast: currentIndex < 0 ? true : currentIndex >= articles.length - 1,

    // Derived
    currentDocument,
    hasArticles: articles.length > 0,

    // Related lists
    relatedByType,
    relatedByCategory,
    getRelated,
  };
};
