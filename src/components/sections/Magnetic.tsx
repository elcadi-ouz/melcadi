"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Magnetic({ children }: { children: React.ReactElement<any> }) {
    const magnetic = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const node = magnetic.current;
        if (!node) return;

        const xTo = gsap.quickTo(node, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
        const yTo = gsap.quickTo(node, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = node.getBoundingClientRect();
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)
            xTo(x);
            yTo(y)
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0)
        };

        node.addEventListener("mousemove", handleMouseMove)
        node.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            node.removeEventListener("mousemove", handleMouseMove)
            node.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    return (
        <div ref={magnetic as React.RefObject<HTMLDivElement>} style={{ display: "inline-flex" }}>
            {children}
        </div>
    )
}