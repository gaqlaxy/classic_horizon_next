"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Entrance: Cover the screen
        tl.to(overlayRef.current, {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 0.6,
            ease: "power4.inOut"
        });

        // 2. Change content while covered
        tl.add(() => {
            setDisplayChildren(children);
            window.scrollTo(0, 0);
        });

        // 3. Exit: Reveal the screen
        tl.to(overlayRef.current, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power4.inOut",
            delay: 0.1
        });

        // 4. Content reveal
        tl.fromTo(contentRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        );

    }, [pathname]);

    return (
        <>
            {/* The Shutter Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-brand-forest z-[1000] scale-y-0"
                style={{ pointerEvents: "none" }}
            />

            {/* The Main Content */}
            <main ref={contentRef}>
                {displayChildren}
            </main>
        </>
    );
}
