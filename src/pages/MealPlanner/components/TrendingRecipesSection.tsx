import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { TrendingUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";

interface TrendingRecipesSectionProps {
   trendingRecipes: any[];
   t: any;
   language: string;
   onShowMealSelectionModal: (recipe: any) => void;
}

export const TrendingRecipesSection: React.FC<TrendingRecipesSectionProps> = ({
   trendingRecipes,
   t,
   language,
   onShowMealSelectionModal,
}) => {
   return (
      <Card className="mt-8">
         <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2 sm:gap-3">
                  <TrendingUp className="w-5 h-5 text-[#22ae4b]" />
                  <h4 className="text-base sm:text-lg font-bold text-gray-900">{t.meal_planner.trending_recipes}</h4>
               </div>
               <Link to={language === "ar" ? "/ar/explore" : "/explore"}>
                  <Button variant="outline" size="sm">
                     {t.common.view_all}
                  </Button>
               </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
               {trendingRecipes.slice(0, 4).map((recipe) => (
                  <div
                     key={recipe.id}
                     className="group cursor-pointer"
                     onClick={() => onShowMealSelectionModal(recipe)}
                  >
                     <div className="relative mb-2">
                        <img
                           src={recipe.image}
                           alt={recipe.title}
                           className="w-full h-16 sm:h-20 rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button
                              size="sm"
                              className="bg-white text-gray-900 hover:bg-gray-100"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 onShowMealSelectionModal(recipe);
                              }}
                           >
                              <Plus className="w-3 h-3 mr-1" />
                              Add
                           </Button>
                        </div>
                     </div>
                     <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-[#22ae4b] transition-colors">
                        {recipe.title}
                     </div>
                     <div className="text-xs text-gray-500">
                        {recipe.calories} cal • {recipe.time}
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
};