import { useEffect, useRef, useState } from "react";

export default function Loader({ show = true, onComplete }) {
  const loaderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Auto-hide after 1.5 seconds
      const timer = setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.classList.add("animate-zoomOut");
        }
        
        // Wait for zoom out animation to complete, then hide completely
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.(); // Call callback if provided
        }, 500); // Match the zoomOut animation duration
        
      }, 1500); // Show for 1.5 seconds, then start exit animation (total 2s)

      return () => clearTimeout(timer);
    } else {
      // Manual hide trigger
      if (loaderRef.current) {
        loaderRef.current.classList.add("animate-zoomOut");
      }
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    }
  }, [show, onComplete]);

  return (
    isVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]">
        <div
          ref={loaderRef}
          className="relative flex flex-col items-center justify-center animate-zoomIn"
          style={{ minHeight: "160px", minWidth: "320px" }}
        >
          {/* Neon Glow Behind Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-24 rounded-full bg-blue-400 opacity-30 blur-2xl"></div>
          </div>
          {/* Animated Gradient Text */}
          <span className="relative text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-widest animate-glow-text drop-shadow-xl select-none text-center px-4 pb-2">
            YR-IT E-Learning
          </span>
        </div>
        <style>
          {`
            @keyframes zoomIn {
              0% { transform: scale(0.7); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes zoomOut {
              0% { transform: scale(1); opacity: 1; }
              100% { transform: scale(0.7); opacity: 0; }
            }
            .animate-zoomIn {
              animation: zoomIn 0.5s cubic-bezier(0.4,0,0.2,1);
            }
            .animate-zoomOut {
              animation: zoomOut 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            @keyframes glow-text {
              0%,100% { filter: brightness(1.1) drop-shadow(0 0 12px #38bdf8); }
              50% { filter: brightness(1.5) drop-shadow(0 0 32px #38bdf8); }
            }
            .animate-glow-text {
              animation: glow-text 1.4s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    )
  );
}