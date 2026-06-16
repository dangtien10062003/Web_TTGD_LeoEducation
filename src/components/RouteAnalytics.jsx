import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta } from './RouteSEO';
import { trackPageView } from '../utils/analytics';

export const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    trackPageView(location.pathname, meta.title);
  }, [location.pathname]);

  return null;
};
