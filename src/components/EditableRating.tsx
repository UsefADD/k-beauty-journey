
import React, { useState } from "react";
import { Star, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableRatingProps {
  rating: number;
  review?: string;
  onChange?: (rating: number, review: string) => void;
}

const EditableRating: React.FC<EditableRatingProps> = ({ rating, review = "", onChange }) => {
  const [editing, setEditing] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReview, setNewReview] = useState(review);

  function handleSave() {
    setEditing(false);
    if (onChange) onChange(newRating, newReview);
  }

  function handleCancel() {
    setNewRating(rating);
    setNewReview(review);
    setEditing(false);
  }

  return (
    <div className="mb-4">
      {!editing ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(newRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-black">{newRating.toFixed(1)}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setEditing(true)}
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
            <span className="ml-3 text-base font-medium text-black">{newRating.toFixed(1)}</span>
          </div>
          <Input
            className="mb-2"
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} className="bg-pink-600 text-white hover:bg-pink-700">Save</Button>
            <Button size="sm" variant="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableRating;
