import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ResearchPage from './pages/ResearchPage';
import SolutionsPage from './pages/SolutionsPage';
import CommunityPage from './pages/CommunityPage';
import StoriesPage from './pages/StoriesPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    )
}

export default App 