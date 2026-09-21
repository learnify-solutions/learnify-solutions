import { useEffect } from 'react';

interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonicalUrl,
  jsonLd,
}: SeoConfig) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes('Learnify') ? title : `${title} | Learnify Solutions`;
    document.title = formattedTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. Update OpenGraph Tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute('content', ogTitle || formattedTitle);

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) ogDescTag.setAttribute('content', ogDescription || description);

    if (ogImage) {
      const ogImgTag = document.querySelector('meta[property="og:image"]');
      if (ogImgTag) ogImgTag.setAttribute('content', ogImage);
    }

    if (ogUrl) {
      const ogUrlTag = document.querySelector('meta[property="og:url"]');
      if (ogUrlTag) ogUrlTag.setAttribute('content', ogUrl);
    }

    // 5. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl || window.location.href);

    // 6. Twitter Card Tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', ogTitle || formattedTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', ogDescription || description);

    // 7. Dynamic JSON-LD Structured Data
    const scriptId = 'learnify-dynamic-jsonld';
    let dynamicJsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!dynamicJsonLdScript) {
        dynamicJsonLdScript = document.createElement('script');
        dynamicJsonLdScript.id = scriptId;
        dynamicJsonLdScript.type = 'application/ld+json';
        document.head.appendChild(dynamicJsonLdScript);
      }
      dynamicJsonLdScript.text = JSON.stringify(jsonLd);
    } else if (dynamicJsonLdScript) {
      dynamicJsonLdScript.remove();
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonicalUrl, jsonLd]);
}
