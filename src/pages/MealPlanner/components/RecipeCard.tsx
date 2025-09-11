import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Star, Clock, Zap } from "lucide-react";

interface RecipeCardProps {
   recipe: any;
   onAdd: (recipe: any) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onAdd }) => {
   return (
      <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
         <CardContent className="p-0">
            <div className="relative">
               <img src={recipe.image} alt={recipe.title} className="w-full h-24 sm:h-32 object-cover rounded-t-lg" />
               <Badge className="absolute top-2 left-2 bg-[#22ae4b] text-white text-xs">{recipe.category}</Badge>
               <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{recipe.rating}</span>
               </div>
            </div>

            <div className="p-2 sm:p-3">
               <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[#22ae4b] transition-colors">
                  {recipe.title}
               </h4>

               <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                     <Clock className="w-3 h-3" />
                     <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Zap className="w-3 h-3" />
                     <span>{recipe.calories} cal</span>
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                     {recipe.protein}g protein • {recipe.carbs}g carbs
                  </div>
                  <Button
                     size="sm"
                     className="bg-[#22ae4b] hover:bg-[#1c9a40] text-white text-xs px-3 py-1 h-7"
                     onClick={() => onAdd(recipe)}
                  >
                     Add
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};