import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-4">
          <div>
            <h3 className="text-base font-semibold mb-5 text-foreground">À PROPOS</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Notre histoire</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Notre équipe</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Carrières</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-5 text-foreground">INFORMATIONS</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Conditions générales</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Politique de retour</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-5 text-foreground">CONTACT</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Service client</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Nous contacter</a></li>
              <li><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">Stores</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-5 text-foreground">NEWSLETTER</h3>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full py-3 px-3 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="w-full bg-primary text-primary-foreground border-0 py-3 px-4 rounded font-semibold cursor-pointer hover:opacity-90 transition-opacity">
                S'abonner
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center py-5 border-t border-border text-muted-foreground text-sm">
          &copy; 2025 korean skincare.fr - Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;