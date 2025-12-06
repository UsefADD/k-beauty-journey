import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';

const BlogSection = () => {
  console.log('BlogSection render - timestamp:', Date.now());
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const cards = [
    {
      id: 'a-propos',
      titleKey: 'blog.about.title',
      descriptionKey: 'blog.about.description',
      image: '/blog-banner.png',
      ctaKey: 'blog.about.cta',
      to: '#',
    },
    {
      id: 'pourquoi',
      titleKey: 'blog.kbeauty.title',
      descriptionKey: 'blog.kbeauty.description',
      image: '/k-beauty-hero.png',
      ctaKey: 'blog.kbeauty.cta',
      to: '/blog/k-beauty-secret',
    },
    {
      id: 'spf-protection',
      titleKey: 'blog.spf.title',
      descriptionKey: 'blog.spf.description',
      image: "/blog-hero-image.png",
      ctaKey: 'blog.spf.cta',
      to: '/blog/spf-protection-annuelle',
    },
  ];

  return (
    <section className={`bg-knude-50 py-16 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} aria-labelledby="starter-blog">
      <div className="container mx-auto px-4">
        <header className="mb-10 flex items-center justify-center">
          <div className="flex-1 h-px bg-knude-900" />
          <h2 id="starter-blog" className="text-2xl md:text-3xl font-serif font-bold text-knude-900 text-center tracking-wide uppercase px-8">
            {t('blog.title')}
          </h2>
          <div className="flex-1 h-px bg-knude-900" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="bg-white border border-knude-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              onClick={() => (card.to !== '#' ? navigate(card.to) : undefined)}
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={card.image}
                  alt={t(card.titleKey)}
                  loading="lazy"
                  className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-knude-900 mb-2">{t(card.titleKey)}</h3>
                <p className="text-knude-700 mb-6">{t(card.descriptionKey)}</p>
                <div className="flex justify-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (card.to !== '#') navigate(card.to);
                    }}
                  >
                    {t(card.ctaKey)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;