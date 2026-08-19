import { useEffect } from 'react';

export function useSEO({
  title,
  description,
  keywords,
  image = 'https://alqwmya.com/images/logo.png',
  url = window.location.href,
  type = 'website',
  schema = null,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
      setMeta('twitter:description', description);
    }

    if (keywords) {
      setMeta('keywords', keywords);
    }

    if (title) {
      setMeta('og:title', title, true);
      setMeta('twitter:title', title);
    }

    if (image) {
      const fullImg = image.startsWith('http') ? image : `https://alqwmya.com${image}`;
      setMeta('og:image', fullImg, true);
      setMeta('twitter:image', fullImg);
    }

    if (url) {
      setMeta('og:url', url, true);
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    setMeta('og:type', type, true);

    let scriptEl = document.getElementById('ax-json-ld');
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'ax-json-ld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, image, url, type, schema]);
}
