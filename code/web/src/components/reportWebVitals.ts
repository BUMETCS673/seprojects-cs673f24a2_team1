import type { CLSMetric, FIDMetric, FCPMetric, LCPMetric, TTFBMetric } from 'web-vitals';

type WebVitalsMetric = CLSMetric | FIDMetric | FCPMetric | LCPMetric | TTFBMetric;

const reportWebVitals = (onPerfEntry?: (metric: WebVitalsMetric) => void): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
