import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { formatTimeLocalized } from "../../../../lib/formatTimeLocalized";

type RecipeCardSectionProps = {
   recipe: any;
  getLocalizedPath: (path: string) => string;
  toggleLike: (recipeId: number) => void;
  toggleSave: (recipeId: number) => void;
  likedRecipes: number[];
  savedRecipes: number[];
};
export const RecipeCardSection = ({
  getLocalizedPath,
  toggleLike,
  toggleSave,
  likedRecipes,
  savedRecipes,

  recipe
}:RecipeCardSectionProps): JSX.Element => {
    const {isRTL,language } = useLanguage();
      const [newComment, setNewComment] = useState("");
       const handleComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim()) {
         console.log("New comment:", newComment);
         setNewComment("");
      }
   };
   console.log("RecipeCardSection render", recipe);
  return (
  <Card className="bg-white rounded-3xl border-0 shadow-sm">
      <CardContent className="p-4 sm:p-6">
         {/* Post Header */}
         <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
               <Link to={getLocalizedPath("/profile")}>
                  <img
                     src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                     alt="Adam Ahmed"
                     className="w-full h-full object-cover"
                  />
               </Link>
            </Avatar>
            <div className="flex-1">
               <Link
                  to={getLocalizedPath("/profile")}
                  className="font-semibold text-sm sm:text-base text-black hover:text-[#22ae4b] transition-colors"
               >
                  {`${recipe.createdBy?.firstName} ${recipe.createdBy?.lastName}`}
                
               </Link>
               <div className="font-medium text-[#7a7a7a] text-xs sm:text-sm"> {formatTimeLocalized(recipe.time)}</div>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
               <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-current rounded-full" />
                  <div className="w-1 h-1 bg-current rounded-full" />
                  <div className="w-1 h-1 bg-current rounded-full" />
               </div>
            </Button>
         </div>

         {/* Post Content */}
         <div className="mb-4 sm:mb-6">
            <p className="font-semibold text-black text-base sm:text-lg mb-3 sm:mb-4">
            {recipe.title[language]}
            </p>
            <Link
               to={getLocalizedPath(`/recipe/${recipe.slug[language]}`)}
               className="block rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
            >
               <img
                  className="w-full h-60 sm:h-80 object-cover"
                  alt={recipe.title[language]}
                  src={recipe.thumbnail.url}
               />
            </Link>
         </div>

         {/* Interactive Actions */}
         <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <Button
               variant="ghost"
               size="sm"
               className={`flex items-center gap-2 ${
                  likedRecipes.includes(recipe._id) ? "text-red-500" : "text-gray-600 hover:text-red-500"
               }`}
               onClick={() => toggleLike(recipe._id)}
            >
               <Heart className={`w-5 h-5 ${likedRecipes.includes(recipe._id) ? "fill-current" : ""}`} />
               <span>{likedRecipes.includes(recipe._id) ? 25 : 24}</span>
            </Button>
            <Button
               variant="ghost"
               size="sm"
               className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
            >
               <MessageCircle className="w-5 h-5" />
               <span>8</span>
            </Button>
            <Button
               variant="ghost"
               size="sm"
               className="flex items-center gap-2 text-gray-600 hover:text-green-500"
            >
               <Share2 className="w-5 h-5" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               className={`ml-auto ${
                  savedRecipes.includes(recipe._id) ? "text-yellow-500" : "text-gray-600 hover:text-yellow-500"
               }`}
               onClick={() => toggleSave(recipe._id)}
            >
               <Bookmark className={`w-5 h-5 ${savedRecipes.includes(recipe._id) ? "fill-current" : ""}`} />
            </Button>
         </div>

         {/* Comment Input */}
         <form
            onSubmit={handleComment}
            className="flex items-center gap-3 p-3 rounded-full border border-gray-300 bg-gray-50"
         >
            <Avatar className="w-8 h-8">
               <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                  alt="Your avatar"
                  className="w-full h-full object-cover"
               />
            </Avatar>
            <Input
               placeholder={language === "ar" ? "أضف تعليقاً..." : "Add a comment..."}
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
               className={`flex-1 border-0 bg-transparent text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 ${
                  isRTL ? "text-right" : "text-left"
               }`}
            />
            {newComment.trim() && (
               <Button
                  type="submit"
                  size="sm"
                  className="bg-[#22ae4b] hover:bg-[#1c9a40] text-white rounded-full px-4"
               >
                  {language === "ar" ? "نشر" : "Post"}
               </Button>
            )}
         </form>
      </CardContent >
   </Card>
  );
};