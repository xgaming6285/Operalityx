import { useState, useEffect } from "react";
import { ArticleService, ArticleMeta } from "../services/articleService";
import { Document } from "../types/document";

export interface UseArticlesOptions {
    type?: string; // Filter articles by type
    autoLoad?: boolean; // Whether to load articles on mount
}

export const useArticles = (options: UseArticlesOptions = {}) => {
    const { type, autoLoad = true } = options;
    
    const [articles, setArticles] = useState<ArticleMeta[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Article viewer state
    const [selectedArticle, setSelectedArticle] = useState<ArticleMeta | null>(null);
    const [articleContent, setArticleContent] = useState<string | null>(null);
    const [showArticleViewer, setShowArticleViewer] = useState(false);
    const [loadingArticle, setLoadingArticle] = useState(false);

    /**
     * Load articles metadata
     */
    const loadArticles = async () => {
        setLoading(true);
        setError(null);
        
        try {
            let loadedArticles: ArticleMeta[];
            
            if (type) {
                loadedArticles = await ArticleService.getArticlesByType(type);
            } else {
                loadedArticles = await ArticleService.loadArticlesMetadata();
            }
            
            setArticles(loadedArticles);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load articles");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Open an article by ID
     */
    const openArticleById = async (articleId: string) => {
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
    };

    /**
     * Open an article directly (if you already have the ArticleMeta)
     */
    const openArticle = async (article: ArticleMeta) => {
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
    };

    /**
     * Open the first article of the loaded articles (useful for card clicks)
     */
    const openFirstArticle = async () => {
        if (articles.length > 0) {
            await openArticle(articles[0]);
        }
    };

    /**
     * Close the article viewer
     */
    const closeArticleViewer = () => {
        setShowArticleViewer(false);
        setSelectedArticle(null);
        setArticleContent(null);
    };

    /**
     * Get the current article as a Document (for DocumentViewer)
     */
    const getCurrentDocument = (): Document | null => {
        if (!selectedArticle || !articleContent) {
            return null;
        }
        
        return ArticleService.articleToDocument(selectedArticle, articleContent);
    };

    /**
     * Refresh articles (clear cache and reload)
     */
    const refreshArticles = async () => {
        ArticleService.clearCache();
        await loadArticles();
    };

    // Auto-load articles on mount if enabled
    useEffect(() => {
        if (autoLoad) {
            loadArticles();
        }
    }, [type, autoLoad]);

    return {
        // Article list state
        articles,
        loading,
        error,
        
        // Article viewer state
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
        
        // Computed values
        currentDocument: getCurrentDocument(),
        hasArticles: articles.length > 0,
    };
}; 