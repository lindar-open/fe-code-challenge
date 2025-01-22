import { useEffect } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

export const usePerformanceTracking = (componentName: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor.startMeasure(`${componentName}Render`);
      return () => performanceMonitor.endMeasure(`${componentName}Render`);
    }
  }, [componentName]);
};
