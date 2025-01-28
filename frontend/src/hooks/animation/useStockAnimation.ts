import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useDebounce } from 'react-use';
import classNames from 'classnames';

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
  styles: {
    active: string;
    inactive: string;
    shake: string;
    priceUp: string;
    priceDown: string;
  };
  animationDuration?: number;
  priceChangeThreshold?: number;
}

export const useStockAnimation = ({
  price,
  isActive,
  hasActiveCard,
  styles,
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

  const calculatePriceChange = useCallback((currentPrice: number, previousPrice: number) => {
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  }, []);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;
    if (prevPrice !== price) {
      const priceChange = calculatePriceChange(price, prevPrice);

      setAnimationState((current) => ({
        ...current,
        isShaking: Math.abs(priceChange) >= priceChangeThreshold,
        isPriceUp: price > prevPrice,
        isPriceDown: price < prevPrice
      }));

      prevPriceRef.current = price;
    }
  }, [price, priceChangeThreshold, calculatePriceChange]);

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

  const computedClassNames = useMemo(() => {
    return classNames({
      [styles.active]: isActive && hasActiveCard,
      [styles.inactive]: !isActive && hasActiveCard,
      [styles.priceUp]: animationState.isPriceUp,
      [styles.priceDown]: animationState.isPriceDown,
      [styles.shake]: animationState.isShaking,
    });
  }, [
    styles,
    animationState.isShaking,
    animationState.isPriceUp,
    animationState.isPriceDown,
    isActive,
    hasActiveCard
  ]);

  return {
    classNames: computedClassNames,
    animationState
  };
};
