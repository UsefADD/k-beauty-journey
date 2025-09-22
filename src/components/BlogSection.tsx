
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import koreanSkincareStepsPoster from '@/assets/korean-skincare-steps-poster.jpg';

const BlogSection = () => {
  console.info('Render: BlogSection');
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 'k-beauty-secret',
      title: 'K-Beauty : Le secret coréen pour une peau éclatante',
      description: 'Découvrez la philosophie coréenne de beauté et ses rituels en plusieurs étapes pour une peau saine et lumineuse.',
      image: koreanSkincareStepsPoster,
    }
  ];

  return (
    <div className="bg-knude-50 py-16">
      {/* Blog Banner */}
      <div className="container mx-auto px-4 mb-12">
        <div className="relative overflow-hidden rounded-2xl">
          <img 
            src="/blog-banner.png" 
            alt="Pourquoi tout le monde craque pour la K-beauty - l'art coréen du soin qui change tout"
            className="w-full h-auto"
          />
        </div>
      </div>
      
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="bg-white border border-knude-100 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
                  onClick={() => navigate(`/blog/${post.id}`)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
