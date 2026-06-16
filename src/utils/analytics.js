export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
};

export const trackPageView = (path, title) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
};
