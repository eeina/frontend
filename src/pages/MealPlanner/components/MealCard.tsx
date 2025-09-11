import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus, X, Clock, Utensils, Coffee, Sun, Moon, Apple } from "lucide-react";

interface MealCardProps {
   mealType: string;
   meals: any[];
   selectedDateKey: string;
   formatMealTypeName: (mealType: string) => string;
   onAdd: () => void;
   onRemove: (mealId: number) => void;
   onRemoveCustomMeal: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
   mealType,
   meals,
   selectedDateKey,
   formatMealTypeName,
   onAdd,
   onRemove,
   onRemoveCustomMeal,
}) => {
   const mealIcons = {
      breakfast: Coffee,
      lunch: Sun,
      dinner: Moon,
      snack: Apple,
      default: Utensils,
   };

   const MealIcon = mealIcons[mealType] || mealIcons.default;
   const isCustomMeal = !["breakfast", "lunch", "dinner", "snack"].includes(mealType);

   return (
      <Card className="hover:shadow-md transition-shadow">
         <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2 sm:gap-3">
                  <MealIcon className="w-5 h-5 text-[#22ae4b]" />
                  <h4 className="font-semibold capitalize text-gray-800 text-sm sm:text-base">
                     {formatMealTypeName(mealType)}
                  </h4>
               </div>
               <div className="flex items-center gap-2">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={onAdd}
                     className="w-6 h-6 text-[#22ae4b] hover:text-[#1c9a40] hover:bg-green-50"
                  >
                     <Plus className="w-4 h-4" />
                  </Button>
                  {isCustomMeal && meals.length === 0 && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={onRemoveCustomMeal}
                        className="w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                     >
                        <X className="w-4 h-4" />
                     </Button>
                  )}
               </div>
            </div>

            {meals.length === 0 ? (
               <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm text-gray-400">No meals added</p>
               </div>
            ) : (
               <div className="space-y-3">
                  {meals.map((meal, index) => (
                     <div
                        key={`${meal.id}-${index}`}
                        className="flex gap-2 sm:gap-3 p-2 bg-gray-50 rounded-lg group"
                     >
                        <img
                           src={meal.image}
                           alt={meal.name}
                           className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                           <h5 className="font-medium text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                              {meal.name}
                           </h5>
                           <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Clock className="w-3 h-3" />
                              <span>{meal.time}</span>
                           </div>
                           <div className="flex gap-3 text-xs text-gray-500">
                              <span>{meal.calories} cal</span>
                              <span>{meal.protein}g protein</span>
                           </div>
                        </div>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => onRemove(meal.id)}
                           className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                        >
                           <X className="w-4 h-4" />
                        </Button>
                     </div>
                  ))}
               </div>
            )}
         </CardContent>
      </Card>
   );
};