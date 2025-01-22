class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private measures: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(label: string): void {
    if (process.env.NODE_ENV !== 'development') return;

    const start = performance.now();
    this.measures.set(label, start);
  }

  endMeasure(label: string): void {
    if (process.env.NODE_ENV !== 'development') return;

    const start = this.measures.get(label);
    if (start) {
      const duration = performance.now() - start;
      console.log(`${label} took ${duration.toFixed(2)}ms`);
      this.measures.delete(label);
    }
  }

  trackLongTasks(): void {
    if (process.env.NODE_ENV !== 'development') return;
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn(`Long Task Detected - Duration: ${entry.duration.toFixed(2)}ms`);
      });
    });

    observer.observe({ entryTypes: ['longtask'] });
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
