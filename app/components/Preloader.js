"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const svgWrapperRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);

  // Fetch and render SVG inline
  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch("/svgcode");
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error("Failed to load SVG:", error);
      }
    };

    fetchSVG();
  }, []);

  // Animation logic
  useEffect(() => {
    if (!svgContent || !svgWrapperRef.current) return;

    // Wait for SVG to be rendered in DOM
    setTimeout(() => {
      const tl = gsap.timeline();
      let loadProgress = 0;
      const startTime = Date.now();
      const MIN_DISPLAY_TIME = 4000; // 4 seconds to show full animation

      const simulateProgress = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const timeProgress = (elapsed / MIN_DISPLAY_TIME) * 100;

        if (loadProgress < 85) {
          loadProgress = Math.min(timeProgress, 85 + Math.random() * 5);
        }

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            width: `${Math.min(loadProgress, 90)}%`,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }, 100);

      const handlePageLoad = () => {
        clearInterval(simulateProgress);

        // Calculate how long to wait before fading out
        const elapsed = Date.now() - startTime;
        const waitTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);

        setTimeout(() => {
          // Complete progress bar
          gsap.to(progressRef.current, {
            width: "100%",
            duration: 0.3,
            ease: "power2.out",
          });

          // Hold for a moment then fade out
          setTimeout(() => {
            tl.to(preloaderRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
              pointerEvents: "none",
            });

            // Scale down the container
            tl.to(
              containerRef.current,
              {
                scale: 0.95,
                duration: 0.8,
                ease: "back.in",
              },
              0
            );
          }, 200);
        }, waitTime);
      };

      // Get all paths from the SVG
      const svgElement = svgWrapperRef.current.querySelector("svg");
      if (svgElement) {
        const paths = svgElement.querySelectorAll("path");

        // First, add stroke attributes and convert to drawing-friendly paths
        paths.forEach((path, index) => {
          const bbox = path.getBBox();
          const centerX = bbox.x + bbox.width / 2;
          const centerY = bbox.y + bbox.height / 2;

          // Set initial state
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", "#000000");
          path.setAttribute("stroke-width", "2");
          path.setAttribute("stroke-linecap", "round");
          path.setAttribute("stroke-linejoin", "round");

          // Calculate path length for stroke animation
          const pathLength = path.getTotalLength();
          path.setAttribute("stroke-dasharray", pathLength);
          path.setAttribute("stroke-dashoffset", pathLength);

          // Apply styles
          path.style.strokeDasharray = pathLength;
          path.style.strokeDashoffset = pathLength;
          path.style.opacity = "1";

          // Animate stroke drawing with stagger
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.inOut",
            },
            index * 0.08 // Stagger each path
          );
        });
      }

      // Animate text entrance
      tl.from(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        1.5
      );

      // Gentle scale animation after drawing completes
      gsap.to(svgWrapperRef.current, {
        scale: 1.05,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "center center",
        delay: 3, // Start after drawing completes
      });

      if (document.readyState === "complete") {
        handlePageLoad();
      } else {
        window.addEventListener("load", handlePageLoad);
        return () => {
          window.removeEventListener("load", handlePageLoad);
          clearInterval(simulateProgress);
          tl.kill();
        };
      }

      return () => {
        clearInterval(simulateProgress);
        tl.kill();
      };
    }, 50);
  }, [svgContent]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f4c3a 100%)",
      }}
    >
      {/* Animated gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
            animation: "float-slow 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/4 w-3/4 h-3/4 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #64748b 0%, transparent 70%)",
            animation: "float-slow-reverse 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main content container */}
      <div ref={containerRef} className="relative z-10 text-center">
        {/* Logo with drawing animation */}
        <div className="relative mb-12">
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.15), transparent)",
                filter: "blur(20px)",
              }}
            />

            {/* Inline SVG container with drawing animation */}
            {svgContent && (
              <div
                ref={svgWrapperRef}
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(212, 175, 55, 0.3))",
                }}
                dangerouslySetInnerHTML={{
                  __html: svgContent,
                }}
              />
            )}

            {/* Accent line orbiting */}
            <div
              className="absolute inset-0 rounded-full border border-amber-600/20"
              style={{
                animation: "orbit-line 20s linear infinite",
              }}
            />
          </div>
        </div>

        {/* Premium text section */}
        <div ref={textRef} className="space-y-6">
          <h2 className="text-2xl font-light tracking-widest text-slate-100/90">
            CLASSIC HORIZON
          </h2>
          <p className="text-xs tracking-[0.15em] text-amber-600/60 uppercase font-medium">
            Curating Extraordinary Journeys
          </p>
        </div>

        {/* Premium progress bar */}
        <div className="mt-16 w-48 mx-auto">
          <div className="relative h-px bg-slate-700/40 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-amber-600/0 via-amber-600 to-amber-600/0 rounded-full"
              style={{
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
                width: "0%",
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 tracking-wide">
            Loading Experience
          </p>
        </div>
      </div>
    </div>
  );
}
