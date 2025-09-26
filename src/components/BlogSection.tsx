
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import koreanSkincareStepsPoster from '@/assets/korean-skincare-steps-poster.jpg';

const BlogSection = () => {
  console.log('BlogSection render - timestamp:', Date.now());
  const navigate = useNavigate();

  const cards = [
    {
      id: 'a-propos',
      title: 'À PROPOS',
      description: "Pour découvrir qui nous sommes et en apprendre plus sur les valeurs qui animent notre fondatrice et notre équipe, c'est par ici !",
      image: '/blog-banner.png',
      cta: 'EN SAVOIR PLUS',
      to: '#',
    },
    {
      id: 'pourquoi',
      title: 'LA SKINCARE CORÉENNE, POURQUOI ?',
      description: 'Lis notre article détaillé pour comprendre pourquoi la skincare coréenne est si efficace et populaire !',
      image: '/k-beauty-hero.png',
      cta: 'LIRE LE BLOG',
      to: '/blog/k-beauty-secret',
    },
  ];

  return (
    <section className="bg-knude-50 py-16" aria-labelledby="starter-blog">
      <div className="container mx-auto px-4">
        <header className="mb-10 flex items-center justify-center gap-6">
          <div className="hidden md:block h-px w-24 bg-knude-200" />
          <h2 id="starter-blog" className="text-2xl md:text-3xl font-serif font-bold text-knude-900 text-center tracking-wide uppercase">
            BIEN DÉBUTER DANS LA SKINCARE CORÉENNE
          </h2>
          <div className="hidden md:block h-px w-24 bg-knude-200" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="bg-white border border-knude-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              onClick={() => (card.to !== '#' ? navigate(card.to) : undefined)}
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-knude-900 mb-2">{card.title}</h3>
                <p className="text-knude-700 mb-6">{card.description}</p>
                <div className="flex justify-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (card.to !== '#') navigate(card.to);
                    }}
                  >
                    {card.cta}
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
