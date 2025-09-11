import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { X, TrendingUp, Heart, Search, Plus, Coffee, Sun, Moon, Apple, Utensils } from "lucide-react";
import { RecipeCard } from "./RecipeCard";

interface AddRecipeModalProps {
   showAddRecipeModal: boolean;
   selectedMealType: string;
   activeTab: "trending" | "saved" | "search";
   searchQuery: string;
   trendingRecipes: any[];
   savedRecipes: any[];
   searchResults: any[];
   selectedDateKey: string;
   getMealTypes: (dateKey: string) => string[];
   formatMealTypeName: (mealType: string) => string;
   language: string;
   onAddRecipeToMeal: (recipe: any, mealType: string) => void;
   onClose: () => void;
   onMealTypeSelect: (mealType: string) => void;
   onTabChange: (tab: "trending" | "saved" | "search") => void;
   onSearchChange: (query: string) => void;
   onShowCustomMealModal: () => void;
}

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({
   showAddRecipeModal,
   selectedMealType,
   activeTab,
   searchQuery,
   trendingRecipes,
   savedRecipes,
   searchResults,
   selectedDateKey,
   getMealTypes,
   formatMealTypeName,
   language,
   onAddRecipeToMeal,
   onClose,
   onMealTypeSelect,
   onTabChange,
   onSearchChange,
   onShowCustomMealModal,
}) => {
   if (!showAddRecipeModal) return null;

   const getCurrentRecipes = () => {
      switch (activeTab) {
         case "trending":
            return trendingRecipes;
         case "saved":
            return savedRecipes;
         case "search":
            return searchResults;
         default:
            return trendingRecipes;
      }
   };

   const mealIcons = {
      breakfast: Coffee,
      lunch: Sun,
      dinner: Moon,
      snack: Apple,
      default: Utensils,
   };

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
         <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-white shadow-2xl">
            <CardContent className="p-0">
               {/* Modal Header */}
               <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-bold text-gray-900">
                        {selectedMealType
                           ? `Add Recipe to ${selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}`
                           : "Choose Meal Type"}
                     </h3>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                        onClick={onClose}
                     >
                        <X className="w-4 h-4" />
                     </Button>
                  </div>

                  {/* Meal Type Selection (if no meal type selected) */}
                  {!selectedMealType && (
                     <div className="mb-4 sm:mb-6 bg-white">
                        <p className="text-gray-600 mb-4">
                           {language === "ar"
                              ? "اختر الوجبة التي تريد إضافة هذه الوصفة إليها:"
                              : "Select which meal to add this recipe to:"}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                           {getMealTypes(selectedDateKey).map((mealType) => {
                              const MealIcon = mealIcons[mealType] || mealIcons.default;

                              return (
                                 <Button
                                    key={mealType}
                                    variant="outline"
                                    className="flex flex-col items-center gap-1 sm:gap-2 h-16 sm:h-20 hover:border-[#22ae4b] hover:text-[#22ae4b] bg-white hover:bg-green-50"
                                    onClick={() => onMealTypeSelect(mealType)}
                                 >
                                    <MealIcon className="w-5 h-5" />
                                    <span className="capitalize text-sm">{formatMealTypeName(mealType)}</span>
                                 </Button>
                              );
                           })}
                        </div>

                        <Button
                           variant="outline"
                           className="w-full border-dashed border-[#22ae4b] text-[#22ae4b] hover:bg-green-50"
                           onClick={onShowCustomMealModal}
                        >
                           <Plus className="w-4 h-4 mr-2" />
                           {language === "ar" ? "إضافة وقت وجبة مخصص" : "Add Custom Meal Time"}
                        </Button>
                     </div>
                  )}

                  {/* Tabs */}
                  {selectedMealType && (
                     <div className="flex gap-2 sm:gap-4 mb-4 bg-white overflow-x-auto">
                        <Button
                           variant={activeTab === "trending" ? "default" : "outline"}
                           size="sm"
                           onClick={() => onTabChange("trending")}
                           className={
                              activeTab === "trending"
                                 ? "bg-[#22ae4b] hover:bg-[#1c9a40]"
                                 : "bg-white hover:bg-gray-50"
                           }
                        >
                           <TrendingUp className="w-4 h-4 mr-2" />
                           Trending
                        </Button>
                        <Button
                           variant={activeTab === "saved" ? "default" : "outline"}
                           size="sm"
                           onClick={() => onTabChange("saved")}
                           className={
                              activeTab === "saved" ? "bg-[#22ae4b] hover:bg-[#1c9a40]" : "bg-white hover:bg-gray-50"
                           }
                        >
                           <Heart className="w-4 h-4 mr-2" />
                           Saved
                        </Button>
                        <Button
                           variant={activeTab === "search" ? "default" : "outline"}
                           size="sm"
                           onClick={() => onTabChange("search")}
                           className={
                              activeTab === "search"
                                 ? "bg-[#22ae4b] hover:bg-[#1c9a40]"
                                 : "bg-white hover:bg-gray-50"
                           }
                        >
                           <Search className="w-4 h-4 mr-2" />
                           Search
                        </Button>
                     </div>
                  )}

                  {/* Search Input */}
                  {activeTab === "search" && selectedMealType && (
                     <div className="relative bg-white">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                           placeholder="Search recipes..."
                           value={searchQuery}
                           onChange={(e) => onSearchChange(e.target.value)}
                           className="pl-10 bg-white border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]"
                        />
                     </div>
                  )}
               </div>

               {/* Modal Content */}
               {selectedMealType && (
                  <div className="p-6 max-h-96 overflow-y-auto bg-white">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {getCurrentRecipes().map((recipe) => (
                           <RecipeCard
                              key={recipe.id}
                              recipe={recipe}
                              onAdd={(recipe) => onAddRecipeToMeal(recipe, selectedMealType)}
                           />
                        ))}
                     </div>

                     {getCurrentRecipes().length === 0 && (
                        <div className="text-center py-6 sm:py-8 bg-white">
                           <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                           <p className="text-gray-500">No recipes found</p>
                        </div>
                     )}
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
};