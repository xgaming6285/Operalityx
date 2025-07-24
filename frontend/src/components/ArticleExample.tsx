import { useArticles } from "../hooks/useArticles";
import DocumentViewer from "./DocumentViewer";
import "../styles/article.css";

// Example component showing how to use articles in any component
const ArticleExample = () => {
    const {
        articles,
        loading,
        error,
        showArticleViewer,
        loadingArticle,
        openArticle,
        openArticleById,
        openFirstArticle,
        closeArticleViewer,
        currentDocument,
        hasArticles
    } = useArticles({ type: "news" }); // Can filter by any type

    if (loading) {
        return <div className="p-4">Loading articles...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">News Articles</h2>
            
            {/* Different ways to open articles */}
            <div className="space-y-4 mb-6">
                <button 
                    onClick={openFirstArticle}
                    disabled={!hasArticles}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Open First Article
                </button>
                
                <button 
                    onClick={() => openArticleById("ai-design-tools-2025")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                >
                    Open Specific Article by ID
                </button>
            </div>

            {/* Article list */}
            <div className="grid gap-4">
                {articles.map((article) => (
                    <div 
                        key={article.id}
                        className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => openArticle(article)}
                    >
                        <h3 className="font-semibold text-lg">{article.title}</h3>
                        {article.subtitle && (
                            <p className="text-gray-600 text-sm">{article.subtitle}</p>
                        )}
                        <p className="text-gray-700 mt-2">{article.description}</p>
                        <div className="text-xs text-gray-500 mt-2">
                            Type: {article.type} | Author: {article.author}
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading indicator */}
            {loadingArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-lg">
                        Loading article...
                    </div>
                </div>
            )}

            {/* Article Viewer */}
            {showArticleViewer && currentDocument && (
                <DocumentViewer
                    document={currentDocument}
                    onClose={closeArticleViewer}
                />
            )}
        </div>
    );
};

export default ArticleExample; 