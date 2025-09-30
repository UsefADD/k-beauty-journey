import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary name="Navbar">
        <Navbar />
      </ErrorBoundary>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-cream-100 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-center text-foreground mb-6">
              About Blissful
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
              Discover the story behind your favorite K-beauty destination
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-pink-300 mb-8">
                Our Story 🌿✨
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left md:text-center">
                <p>
                  At <span className="font-semibold text-foreground">Blissful</span>, beauty is more than skin deep — it's about self-care, confidence, and the little rituals that make us feel good every day.
                </p>
                
                <p>
                  Our journey began with a simple passion: sharing the secrets of Korean skincare with everyone who dreams of healthy, radiant, and glowing skin. After discovering how effective, gentle, and innovative K-beauty products are, we wanted to bring that same experience to you — carefully selected, authentic, and always with love.
                </p>
                
                <p>
                  We believe skincare should never feel complicated. That's why we choose products that combine natural ingredients, advanced formulas, and a touch of Korean innovation to make your daily routine simple, enjoyable, and effective.
                </p>
                
                <p>
                  <span className="font-semibold text-foreground">Blissful</span> is more than a shop — it's a space where beauty meets care, and where every product has been handpicked to help you feel confident in your own skin.
                </p>
                
                <p className="text-xl font-medium text-foreground pt-4">
                  ✨ From Seoul to your skincare shelf, our mission is to help you glow every single day.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default About;
