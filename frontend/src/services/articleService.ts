import { Document } from "../types/document";

export interface ArticleMeta {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    thumbnail?: string;
    file: string;
    type: string;
    author?: string;
    createdAt?: string;
}

export class ArticleService {
    private static articlesCache: ArticleMeta[] | null = null;
    private static htmlCache: Map<string, string> = new Map();

    /**
     * Load all articles metadata from the JSON file
     */
    static async loadArticlesMetadata(): Promise<ArticleMeta[]> {
        if (this.articlesCache) {
            return this.articlesCache;
        }

        try {
            const response = await fetch("/articles/articles.json");
            const articles: ArticleMeta[] = await response.json();
            this.articlesCache = articles;
            return articles;
        } catch (error) {
            console.error("Failed to load articles metadata:", error);
            return [];
        }
    }

    /**
     * Get articles by type (e.g., 'solution', 'news', 'community')
     */
    static async getArticlesByType(type: string): Promise<ArticleMeta[]> {
        const articles = await this.loadArticlesMetadata();
        return articles.filter(article => article.type === type);
    }

    /**
     * Get a specific article by ID
     */
    static async getArticleById(id: string): Promise<ArticleMeta | null> {
        const articles = await this.loadArticlesMetadata();
        return articles.find(article => article.id === id) || null;
    }

    /**
     * Load article HTML content with image path fixes
     */
    static async loadArticleContent(article: ArticleMeta): Promise<string> {
        // Check cache first
        if (this.htmlCache.has(article.id)) {
            return this.htmlCache.get(article.id)!;
        }

        try {
            const response = await fetch(article.file);
            const html = await response.text();
            
            // Fix relative image paths to absolute paths
            const articleDir = article.file.substring(0, article.file.lastIndexOf('/'));
            const fixedHtml = html.replace(
                /src="images\//g, 
                `src="${articleDir}/images/`
            );
            
            // Wrap content with article-content class for styling
            const styledHtml = `<div class="article-content">${fixedHtml}</div>`;
            
            // Cache the processed HTML
            this.htmlCache.set(article.id, styledHtml);
            
            return styledHtml;
        } catch (error) {
            console.error(`Failed to load article content for ${article.id}:`, error);
            throw error;
        }
    }

    /**
     * Convert ArticleMeta to Document format for DocumentViewer
     */
    static articleToDocument(article: ArticleMeta, htmlContent: string): Document {
        return {
            id: article.id,
            title: article.title,
            subtitle: article.subtitle,
            description: article.description,
            type: article.type as "story" | "news", // Use the actual article type
            contentType: "html",
            originalFileName: article.file.split("/").pop(),
            thumbnail: article.thumbnail,
            content: htmlContent,
            metadata: {
                author: article.author,
                createdAt: article.createdAt || new Date().toISOString(),
                updatedAt: article.createdAt || new Date().toISOString(),
                wordCount: htmlContent ? htmlContent.split(/\s+/).length : 0
            }
        };
    }

    /**
     * Clear caches (useful for development or when articles are updated)
     */
    static clearCache(): void {
        this.articlesCache = null;
        this.htmlCache.clear();
    }
} 