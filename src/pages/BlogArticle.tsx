import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

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
            src="/routine-coreenne-10-etapes.png" 
            alt="Routine coréenne en 10 étapes illustrée"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    )
  };

  if (articleId !== 'k-beauty-secret') {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-knude-50">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center text-knude-700 hover:text-knude-900 p-0 h-auto font-normal"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </div>
          
          <article className="bg-white rounded-2xl border border-knude-100 p-8 shadow-sm">
            <div className="mb-8">
              <img 
                src="/k-beauty-header.png" 
                alt="Pourquoi tout le monde craque pour la K-beauty - l'art coréen du soin qui change tout"
                className="w-full max-w-2xl mx-auto h-auto rounded-lg"
              />
            </div>
            
            <h1 className="text-4xl font-serif font-bold text-knude-900 mb-8">
              {kBeautyArticle.title}
            </h1>
            
            {kBeautyArticle.content}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;