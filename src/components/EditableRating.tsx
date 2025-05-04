
import React, { useState, useEffect } from "react";
import { Star, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProductReview } from "@/hooks/useProductReview";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface EditableRatingProps {
  rating: number;
  review?: string;
  productId: string;
  onChange?: (rating: number, review: string) => void;
}

const EditableRating: React.FC<EditableRatingProps> = ({ 
  rating: initialRating, 
  review: initialReview = "", 
  productId,
  onChange 
}) => {
  const [editing, setEditing] = useState(false);
  const [newRating, setNewRating] = useState(initialRating || 0); // Ensure we have a default value
  const [hoverRating, setHoverRating] = useState(0);
  const [newReview, setNewReview] = useState(initialReview);
  const { submitReview, getUserReview, isSubmitting } = useProductReview();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserReview = async () => {
      if (isAuthenticated && productId) {
        const userReview = await getUserReview(productId);
        if (userReview) {
          setNewRating(userReview.rating);
          setNewReview(userReview.review || "");
          if (onChange) onChange(userReview.rating, userReview.review || "");
        }
      }
    };
    
    fetchUserReview();
  }, [isAuthenticated, productId]);

  async function handleSave() {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }

    // Ensure rating is at least 1 before submitting
    if (newRating < 1) {
      toast({
        title: "Rating Required",
        description: "Please select at least 1 star to submit your review",
        variant: "destructive",
      });
      return;
    }

    const success = await submitReview({
      productId,
      rating: newRating,
      review: newReview
    });

    if (success) {
      setEditing(false);
      if (onChange) onChange(newRating, newReview);
    }
  }

  function handleCancel() {
    setNewRating(initialRating || 0);
    setNewReview(initialReview);
    setEditing(false);
  }

  function handleStartEditing() {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }
    setEditing(true);
  }

  return (
    <div className="mb-4">
      {!editing ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(newRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-black">{newRating ? newRating.toFixed(1) : "0.0"}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleStartEditing}
            className="ml-2"
            aria-label="Edit rating and review"
          >
            <Pencil className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 cursor-pointer transition-all ${
                  (hoverRating ? i < hoverRating : i < newRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setNewRating(i + 1)}
              />
            ))}
            <span className="ml-3 text-base font-medium text-black">{newRating ? newRating.toFixed(1) : "0.0"}</span>
          </div>
          <Textarea
            className="mb-2"
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleSave} 
              className="bg-pink-600 text-white hover:bg-pink-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                'Save'
              )}
            </Button>
            <Button size="sm" variant="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableRating;
