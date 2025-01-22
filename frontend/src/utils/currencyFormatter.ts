type FormatterOptions = {
  currency?: string;
  locale?: string;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const DEFAULT_OPTIONS: FormatterOptions = {
  currency: 'USD',
  locale: 'en-US',
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
};

const formatCurrency = (
  price: number | undefined | null,
  options: FormatterOptions = {}
): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return '--';
  }

  try {
    const mergedOptions = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    const formatter = new Intl.NumberFormat(mergedOptions.locale, {
      style: 'currency',
      currency: mergedOptions.currency,
      notation: mergedOptions.notation,
      minimumFractionDigits: mergedOptions.minimumFractionDigits,
      maximumFractionDigits: mergedOptions.maximumFractionDigits
    });

    return formatter.format(price);
  } catch (error) {
    console.error('Currency formatting error:', error);

    if (error instanceof RangeError) {
      throw new Error(`Invalid currency code: ${options.currency}`);
    }

    return '--';
  }
};

export { formatCurrency, type FormatterOptions };
