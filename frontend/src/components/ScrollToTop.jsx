import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight);
    window.scrollTo(0, height);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [pathname]);

  return null;
};

export default ScrollToTop;