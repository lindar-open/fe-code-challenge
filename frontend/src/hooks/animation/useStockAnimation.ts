import { useRef, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

interface AnimationState {
  isShaking: boolean;
  isPriceUp: boolean;
  isPriceDown: boolean;
  isActive: boolean;
}

interface UseStockAnimationProps {
  price: number;
  isActive: boolean;
  hasActiveCard: boolean;
  animationDuration?: number;
  priceChangeThreshold?: number;
}

export const useStockAnimation = ({
  price,
  isActive,
  hasActiveCard,
  animationDuration = 2000,
  priceChangeThreshold = 25
}: UseStockAnimationProps) => {
  const prevPriceRef = useRef<number>(price);
  const [animationState, setAnimationState] = useState<AnimationState>({
    isShaking: false,
    isPriceUp: false,
    isPriceDown: false,
    isActive: false
  });

  useEffect(() => {
    const prevPrice = prevPriceRef.current;
    if (prevPrice !== price) {
      const priceChange = ((price - prevPrice) / prevPrice) * 100;

      setAnimationState((current) => ({
        ...current,
        isShaking: Math.abs(priceChange) >= priceChangeThreshold,
        isPriceUp: price > prevPrice,
        isPriceDown: price < prevPrice
      }));

      prevPriceRef.current = price;
    }
  }, [price, priceChangeThreshold]);

  useDebounce(
    () => {
      if (animationState.isShaking || animationState.isPriceUp || animationState.isPriceDown) {
        setAnimationState((current) => ({
          ...current,
          isShaking: false,
          isPriceUp: false,
          isPriceDown: false
        }));
      }
    },
    animationDuration,
    [animationState]
  );

  useEffect(() => {
    setAnimationState((current) => ({
      ...current,
      isActive
    }));
  }, [isActive]);

  const classNames = useMemo(() => {
    const classes = ['stock', 'accelerated'];

    if (hasActiveCard) {
      classes.push(isActive ? 'stock__active' : 'stock__inactive');
    } else if (isActive) {
      classes.push('stock__active');
    }

    if (animationState.isShaking) {
      classes.push('stock__shake');
    }

    if (animationState.isPriceUp) {
      classes.push('stock__price-up');
    } else if (animationState.isPriceDown) {
      classes.push('stock__price-down');
    }

    return classes.join(' ');
  }, [animationState, isActive, hasActiveCard]);

  return {
    classNames,
    animationState
  };
};
