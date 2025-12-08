
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { checkPasswordPwned } from '@/utils/passwordSecurity';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: t('auth.success'),
          description: t('auth.login.success'),
        });
        
        navigate('/');
      } else {
        toast({
          title: t('auth.checking.password'),
          description: t('auth.password.check.desc'),
        });

        const pwnedCheck = await checkPasswordPwned(password);
        
        if (pwnedCheck.isCompromised) {
          setLoading(false);
          toast({
            title: t('auth.compromised.password'),
            description: t('auth.compromised.message'),
            variant: "destructive",
          });
          return;
        }

        if (pwnedCheck.error) {
          toast({
            title: "Warning",
            description: pwnedCheck.error,
          });
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`.trim(),
            }
          }
        });

        if (error) throw error;
        
        setShowResendConfirmation(true);
        toast({
          title: t('auth.success'),
          description: `${t('auth.signup.success')} ${t('auth.check.spam')}`,
        });
      }
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.error.message'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      toast({
        title: t('auth.error'),
        description: t('auth.enter.email.first'),
        variant: "destructive",
      });
      return;
    }

    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;
      
      toast({
        title: t('auth.success'),
        description: t('auth.resend.success'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.error.message'),
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-pink-100">
          <h1 className="text-2xl font-serif font-bold text-black text-center mb-6">
            {isLogin ? t('auth.welcome.back') : t('auth.create.account')}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('auth.first.name')}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder={t('auth.first.name.placeholder')}
                    required={!isLogin}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-black focus:border-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('auth.last.name')}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder={t('auth.last.name.placeholder')}
                    required={!isLogin}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-black focus:border-gray-800"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-black focus:border-gray-800"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-black focus:border-gray-800"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="default"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('auth.processing') : isLogin ? t('auth.sign.in') : t('auth.sign.up')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setShowResendConfirmation(false);
              }}
              className="text-black hover:underline text-sm"
            >
              {isLogin ? t('auth.no.account') : t('auth.have.account')}
            </button>
          </div>
          
          {showResendConfirmation && (
            <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <p className="text-sm text-pink-700 mb-2">
                {t('auth.resend.question')}
              </p>
              <Button
                onClick={handleResendConfirmation}
                disabled={resendLoading}
                variant="outline"
                size="sm"
                className="w-full border-pink-300 text-pink-700 hover:bg-pink-100"
              >
                {resendLoading ? t('auth.resend.sending') : t('auth.resend.button')}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
