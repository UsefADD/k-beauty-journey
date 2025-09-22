
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import koreanSkincareStepsPoster from '@/assets/korean-skincare-steps-poster.jpg';

const BlogSection = () => {
  console.log('BlogSection render - timestamp:', Date.now());
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
      
      <div className="container mx-auto px-4">
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
                <h3 className="font-medium text-knude-800 text-center">{post.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
