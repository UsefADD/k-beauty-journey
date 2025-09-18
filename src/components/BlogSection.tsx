
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const BlogSection = () => {
  console.info('Render: BlogSection');
  const blogPosts: any[] = []; // Empty array - all articles and photos removed

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <Card key={post.id} className="bg-white border border-knude-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mt-2 text-center font-medium text-knude-800">{post.title}</h3>
                      <p className="mt-2 text-center text-knude-600 text-sm">{post.description}</p>
                      <a 
                        href={post.link} 
                        className="mt-4 flex items-center justify-center text-knude-700 hover:text-knude-900 text-sm underline"
                      >
                        Read On The Blog
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-knude-600">No articles available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
