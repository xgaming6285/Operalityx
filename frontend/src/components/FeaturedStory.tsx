import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedStory = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredStory = {
    title: "Operalityx Stories: AI Transformation Journey",
    subtitle: "Experience the Future of AI Innovation",
    excerpt: "Watch exclusive behind-the-scenes footage showcasing real AI transformations, breakthrough moments, and the human stories that drive innovation forward.",
    author: "Operalityx Team",
    readTime: "Featured Video",
    category: "Featured Story",
    videoSrc: "/stories/stories-video.mp4"
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg p-8 lg:p-12 shadow-lg border border-gray-200"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium mb-6">
                Featured Story
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                {featuredStory.title}
              </h2>
              <h3 className="text-xl text-gray-600 font-medium mb-6">
                {featuredStory.subtitle}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                {featuredStory.excerpt}
              </p>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                    O
                  </div>
                  <div>
                    <div className="font-semibold text-black">{featuredStory.author}</div>
                    <div className="text-gray-600 text-sm font-medium">{featuredStory.readTime}</div>
                  </div>
                </div>
                <div className="text-gray-600 font-medium">{featuredStory.category}</div>
              </div>
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium"
                onClick={handlePlayVideo}
              >
                {isVideoPlaying ? (
                  <Pause className="mr-2 h-5 w-5" />
                ) : (
                  <Play className="mr-2 h-5 w-5" />
                )}
                {isVideoPlaying ? 'Pause Story' : 'Play Story'}
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster="/stories/stories-9.jpeg"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src={featuredStory.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured Story
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStory; 