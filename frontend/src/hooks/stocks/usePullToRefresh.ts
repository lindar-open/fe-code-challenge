import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshProps {
  onRefresh: () => Promise<void>;
  pullDistance?: number;
  resistance?: number;
}

interface PullState {
  pulling: boolean;
  progress: number;
  refreshing: boolean;
}

export const usePullToRefresh = ({
  onRefresh,
  pullDistance = 100,
  resistance = 2.5
}: UsePullToRefreshProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const mouseDown = useRef(false);
  const [pullState, setPullState] = useState<PullState>({
    pulling: false,
    progress: 0,
    refreshing: false
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let currentY = 0;

    const isAtTop = () => {
      return element.scrollTop <= 0;
    };

    const updatePullState = (y: number) => {
      if (!pullState.refreshing) {
        const progress = Math.min(y / pullDistance, 1);
        setPullState((prev) => ({ ...prev, progress }));
        element.style.transform = `translateY(${y}px)`;
      }
    };

    const resetPullState = () => {
      element.style.transform = 'translateY(0px)';
      element.style.transition = 'transform 0.3s ease-out';
      setPullState((prev) => ({ ...prev, pulling: false, progress: 0 }));
    };

    const handleStart = (clientY: number) => {
      if (isAtTop()) {
        startY.current = clientY;
        setPullState((prev) => ({ ...prev, pulling: true }));
        element.style.transition = 'none';
      }
    };

    const handleMove = (clientY: number) => {
      if (pullState.pulling && !pullState.refreshing) {
        const delta = (clientY - startY.current) / resistance;
        if (delta > 0) {
          currentY = delta;
          updatePullState(currentY);
        }
      }
    };

    const handleEnd = async () => {
      if (pullState.pulling) {
        if (currentY >= pullDistance && !pullState.refreshing) {
          setPullState((prev) => ({ ...prev, refreshing: true }));
          try {
            await onRefresh();
          } finally {
            setPullState((prev) => ({ ...prev, refreshing: false }));
          }
        }
        resetPullState();
        currentY = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (pullState.pulling) {
        e.preventDefault();
      }
      handleMove(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseDown.current = true;
      handleStart(e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDown.current) {
        handleMove(e.clientY);
      }
    };

    const handleMouseUp = () => {
      if (mouseDown.current) {
        mouseDown.current = false;
        handleEnd();
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [onRefresh, pullDistance, resistance, pullState.pulling, pullState.refreshing]);

  return {
    ref: elementRef,
    pullState
  };
};
