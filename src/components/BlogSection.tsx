
import React, { useState } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import koreanSkincareStepsPoster from '@/assets/korean-skincare-steps-poster.jpg';

const BlogSection = () => {
  console.info('Render: BlogSection');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const blogPosts = [
    {
      id: 'k-beauty-secret',
      title: 'K-Beauty : Le secret coréen pour une peau éclatante',
      description: 'Découvrez la philosophie coréenne de beauté et ses rituels en plusieurs étapes pour une peau saine et lumineuse.',
      image: koreanSkincareStepsPoster,
    }
  ];

  const kBeautyArticle = {
    title: 'K-Beauty : Le secret coréen pour une peau éclatante',
    content: (
      <div className="prose prose-lg max-w-none text-knude-700">
        <p className="mb-4">
          Depuis quelques années, la K-beauty (Korean Beauty) a conquis le monde entier. Venue de Corée du Sud, cette approche du soin de la peau ne se limite pas à quelques produits, mais repose sur une véritable philosophie de beauté : prendre soin de sa peau au quotidien, avec douceur et régularité, pour révéler son éclat naturel.
        </p>
        
        <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
          Qu'est-ce qui rend la K-beauty unique ?
        </h2>
        <p className="mb-4">
          Contrairement aux routines classiques souvent réduites à 2 ou 3 étapes, la K-beauty met l'accent sur un rituel en plusieurs étapes, où chaque produit a un rôle bien précis. L'objectif n'est pas seulement de corriger les imperfections, mais surtout de prévenir et de maintenir une peau saine et lumineuse sur le long terme.
        </p>
        
        <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
          Les étapes incontournables de la routine coréenne
        </h2>
        <p className="mb-4">
          La routine K-beauty peut varier de 5 à 10 étapes, mais les plus essentielles restent :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Le double nettoyage :</strong> une huile démaquillante suivie d'un nettoyant doux pour éliminer impuretés et maquillage sans agresser la peau.</li>
          <li><strong>La lotion / toner :</strong> pour rééquilibrer le pH et préparer la peau à recevoir les soins.</li>
          <li><strong>L'essence :</strong> star de la K-beauty, elle hydrate en profondeur et booste la régénération cellulaire.</li>
          <li><strong>Le sérum :</strong> concentré d'actifs ciblés (anti-acné, anti-âge, éclat).</li>
          <li><strong>La crème hydratante :</strong> pour sceller l'hydratation.</li>
          <li><strong>La protection solaire :</strong> étape indispensable pour protéger la peau du vieillissement prématuré.</li>
        </ul>
        
        <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
          Pourquoi adopter la K-beauty ?
        </h2>
        <ul className="list-none pl-0 mb-4 space-y-2">
          <li>🌿 Des formules innovantes et respectueuses de la peau (ingrédients naturels, extraits de plantes, innovations technologiques).</li>
          <li>💧 Une hydratation en profondeur, clé d'une peau rebondie et lumineuse.</li>
          <li>🕊️ Une approche préventive et douce, qui privilégie la régularité plutôt que les solutions agressives.</li>
        </ul>
        
        <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
          En résumé
        </h2>
        <p className="mb-6">
          La K-beauty, ce n'est pas seulement une tendance, c'est une manière de prendre soin de soi avec patience et plaisir. Que vous soyez débutant(e) ou passionné(e), intégrer quelques produits coréens dans votre routine peut transformer l'aspect et la santé de votre peau.
        </p>
        
        <p className="text-lg font-medium text-knude-800 mb-6">
          ✨ Découvrez notre sélection de produits K-beauty sur BLISSFUL et commencez votre voyage vers une peau éclatante !
        </p>
        
        <div className="mt-8">
          <img 
            src={koreanSkincareStepsPoster} 
            alt="Poster des étapes de soins coréens en noir et blanc"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    )
  };

  return (
    <div className="bg-knude-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h2 className="text-4xl font-serif font-bold text-knude-900">The Blog</h2>
            <p className="mt-4 text-lg text-knude-700">
              Le skincare n'est pas une tendance, c'est un art de vivre.
            </p>
            <a href="#" className="mt-4 inline-block text-knude-700 hover:text-knude-900 underline font-medium">
              Visit The Blog
            </a>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            {selectedArticle ? (
              <Card className="bg-white border border-knude-100 overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedArticle(null)}
                      className="flex items-center text-knude-700 hover:text-knude-900 p-0 h-auto font-normal"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour aux articles
                    </Button>
                  </div>
                  
                  <h1 className="text-3xl font-serif font-bold text-knude-900 mb-6">
                    {kBeautyArticle.title}
                  </h1>
                  
                  {kBeautyArticle.content}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="bg-white border border-knude-100 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
                    onClick={() => setSelectedArticle(post.id)}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mt-2 font-medium text-knude-800 text-center">{post.title}</h3>
                      <p className="mt-2 text-knude-600 text-sm text-center">{post.description}</p>
                      <div className="mt-4 flex items-center justify-center text-knude-700 hover:text-knude-900 text-sm">
                        Lire l'article
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
