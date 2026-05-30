import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from './Logo';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    })
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.inOut"
    })
    .to(logoRef.current, {
      scale: 1,
      duration: 0.2
    })
    .to(loaderRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.5
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#1A3A5C' }}
    >
      <div ref={logoRef}>
        <Logo className="w-64 h-auto" variant="light" />
      </div>
    </div>
  );
}
