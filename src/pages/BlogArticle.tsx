import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const articles = {
    'k-beauty-secret': {
      title: 'K-Beauty : Le secret coréen pour une peau éclatante',
      category: 'K-Beauty',
      image: '/k-beauty-hero.png',
      intro: 'Vous avez sûrement déjà entendu parler de la K-beauty, cette tendance venue de Corée qui fait le buzz partout dans le monde. Plus qu\'une simple mode, c\'est une véritable philosophie qui met en avant le soin, la douceur et la prévention pour révéler une peau éclatante jour après jour. Dans cet article, découvrez pourquoi la K-beauty séduit autant et comment elle peut transformer votre routine beauté.',
      content: (
        <div className="prose prose-lg max-w-none text-knude-700">
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
    },
    'spf-protection-annuelle': {
      title: 'SPF : indispensable en été… mais aussi en automne et en hiver !',
      category: 'Protection Solaire',
      image: '/spf-seasonal-protection.png',
      intro: 'Quand les journées se raccourcissent et que les températures baissent, on a tendance à ranger sa crème solaire au fond du placard. Pourtant, le SPF n\'est pas seulement un allié de l\'été : il protège votre peau toute l\'année, même lorsque le soleil est discret.',
      content: (
        <div className="prose prose-lg max-w-none text-knude-700">
          <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
            Pourquoi le SPF est essentiel même en automne et en hiver ?
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li><strong>Les UV ne prennent pas de vacances :</strong> même par temps nuageux, 80 % des rayons UV atteignent la peau.</li>
            <li><strong>Vieillissement prématuré :</strong> rides, taches brunes, perte d'élasticité… Les dommages causés par les UV sont cumulatifs et invisibles au quotidien.</li>
            <li><strong>Protection en ville comme à la montagne :</strong> les surfaces réfléchissantes (neige, eau, vitres) augmentent l'exposition, parfois plus qu'en plein été !</li>
          </ul>
          
          <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
            Les bénéfices d'une protection solaire au quotidien
          </h2>
          <ul className="list-none pl-0 mb-6 space-y-2">
            <li>✔️ Prévenir les rides et garder une peau jeune plus longtemps.</li>
            <li>✔️ Éviter les taches pigmentaires.</li>
            <li>✔️ Maintenir l'éclat et la santé de votre peau, saison après saison.</li>
          </ul>
          
          <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
            Comment intégrer le SPF dans votre routine ?
          </h2>
          <p className="mb-6">
            Pas besoin de multiplier les produits : une crème hydratante avec SPF ou une protection solaire légère appliquée le matin suffit pour protéger votre peau. Choisissez une texture adaptée à votre type de peau, confortable à porter même sous le maquillage.
          </p>
          
          <h2 className="text-2xl font-serif font-bold text-knude-900 mt-8 mb-4">
            En résumé 🌸
          </h2>
          <p className="mb-6">
            Adopter le SPF en automne et en hiver, c'est offrir à sa peau une barrière invisible mais puissante contre les agressions du soleil, même quand il se cache. Votre peau vous remerciera en restant lumineuse, douce et jeune plus longtemps.
          </p>
          
          <p className="text-lg font-medium text-knude-800 mb-6">
            👉 Découvrez notre sélection de protections solaires coréennes, légères et agréables à porter toute l'année, sur BLISSFUL.
          </p>
        </div>
      )
    }
  };

  const currentArticle = articles[articleId as keyof typeof articles];
  
  if (!currentArticle) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-knude-50">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
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
          
          <div className="flex gap-8">
            {/* Article Section - Full Width */}
            <div className="w-full">
              {/* Hero Banner Section */}
              <div className="bg-gradient-to-r from-pink-200 to-pink-300 overflow-hidden rounded-t-2xl mb-8">
                <div className="flex items-center">
                  {/* Image Section */}
                  <div className="w-1/3 lg:w-1/4">
                    <img 
                      src={currentArticle.image} 
                      alt={currentArticle.title}
                      className="w-full h-32 lg:h-40 object-cover"
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className="flex-1 px-6 lg:px-12 py-8">
                    <div className="mb-2">
                      <span className="text-xs lg:text-sm font-medium text-pink-800 uppercase tracking-wide">
                        {currentArticle.category}
                      </span>
                    </div>
                    
                    <h1 className="text-xl lg:text-3xl font-bold text-pink-900 leading-tight">
                      {currentArticle.title}
                    </h1>
                    
                    <div className="text-xs lg:text-sm text-pink-700 mt-3">
                      <span className="font-medium">BLISSFUL</span> - {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Layout with Intro on Left */}
              <div className="flex gap-8">
                {/* Intro Section - Left */}
                <div className="w-1/3">
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl shadow-sm sticky top-8 border border-rose-100">
                    <p className="text-rose-700 font-serif text-lg leading-relaxed italic">
                      {currentArticle.intro}
                    </p>
                  </div>
                </div>

                {/* Article Content - Right */}
                <div className="w-2/3">
                  <article className="bg-white rounded-2xl border border-knude-100 shadow-sm">
                    {/* Full content below */}
                    <div className="px-8 lg:px-12 pb-12 pt-8">
                      {currentArticle.content}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;