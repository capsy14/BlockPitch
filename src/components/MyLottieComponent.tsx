'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationPath: string;
  width?: string;
  height?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationPath,
  width = '300px',
  height = '300px',
  loop = true,
  autoplay = true,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const animInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (container.current) {
      animInstance.current = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop,
        autoplay,
        path: animationPath,
      });
    }

    return () => {
      animInstance.current?.destroy();
    };
  }, [animationPath, loop, autoplay]);

  return <div
  
   ref={container}
    style={{
      width,
      height,
      position: 'absolute',
      top: -50,
      left: 0,
      right: 0,
      bottom: 0,
     
    }}
//   ref={container}
//    style={{ width, height }}
    />;
};

export default LottieAnimation;
