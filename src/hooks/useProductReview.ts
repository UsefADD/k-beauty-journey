
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProductReviewParams {
  productId: string;
  rating: number;
  review: string;
}

export const useProductReview = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const submitReview = async ({ productId, rating, review }: ProductReviewParams) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('product_reviews')
        .upsert(
          { 
            product_id: productId, 
            user_id: user.id,
            rating,
            review,
            updated_at: new Date().toISOString(),
          },
          { 
            onConflict: 'product_id,user_id',
            ignoreDuplicates: false,
          }
        );

      if (error) {
        console.error("Error submitting review:", error);
        toast({
          title: "Error",
          description: "Failed to submit your review. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Review Submitted",
        description: "Thank you for sharing your feedback!",
      });
      return true;
    } catch (error) {
      console.error("Error in review submission:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserReview = async (productId: string) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('rating, review')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user review:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in get user review:", error);
      return null;
    }
  };

  const getProductReviews = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select(`
          rating, 
          review,
          created_at
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching product reviews:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in get product reviews:", error);
      return [];
    }
  };

  return {
    submitReview,
    getUserReview,
    getProductReviews,
    isSubmitting
  };
};
