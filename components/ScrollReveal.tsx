'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.section:not(.hero)');
    elements.forEach((element) => element.classList.add('scroll-target'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
