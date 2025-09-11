import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Target, BarChart3, Heart } from "lucide-react";
import { NutritionProgress } from "./NutritionProgress";

interface NutritionTrackingSectionProps {
   selectedDayNutrition: { calories: number; protein: number; carbs: number; fat: number };
   nutritionGoals: { calories: number; protein: number; carbs: number; fat: number };
   t: any;
   language: string;
}

export const NutritionTrackingSection: React.FC<NutritionTrackingSectionProps> = ({
   selectedDayNutrition,
   nutritionGoals,
   t,
   language,
}) => {
   const dailyProgressPercentage = Math.round((selectedDayNutrition.calories / nutritionGoals.calories) * 100);

   return (
      <div className="lg:col-span-4">
         <div className="sticky top-24 space-y-6">
            {/* Daily Nutrition - Recipe Page Style */}
            <Card>
               <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Target className="w-5 h-5 text-[#22ae4b]" />
                     <h3 className="text-lg font-bold text-gray-900">{t.meal_planner.daily_nutrition}</h3>
                  </div>

                  {/* Main Nutrition Bar - Recipe Page Style */}
                  <div className="bg-[#22ae4b] text-white rounded-2xl p-6 mb-6">
                     <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                        <div>
                           <div className="text-2xl font-bold">{selectedDayNutrition.calories}</div>
                           <div className="text-sm opacity-90">{t.recipe.calories}</div>
                           <div className="text-xs opacity-75">of {nutritionGoals.calories}</div>
                        </div>
                        <div>
                           <div className="text-2xl font-bold">{selectedDayNutrition.protein}g</div>
                           <div className="text-sm opacity-90">{t.recipe.protein}</div>
                           <div className="text-xs opacity-75">of {nutritionGoals.protein}g</div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center mt-4">
                        <div>
                           <div className="text-2xl font-bold">{selectedDayNutrition.carbs}g</div>
                           <div className="text-sm opacity-90">{t.recipe.carbs}</div>
                           <div className="text-xs opacity-75">of {nutritionGoals.carbs}g</div>
                        </div>
                        <div>
                           <div className="text-2xl font-bold">{selectedDayNutrition.fat}g</div>
                           <div className="text-sm opacity-90">{t.recipe.fat}</div>
                           <div className="text-xs opacity-75">of {nutritionGoals.fat}g</div>
                        </div>
                     </div>
                  </div>

                  {/* Detailed Progress Bars */}
                  <div className="space-y-4">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-medium text-gray-700">Daily Progress</span>
                           <span className="text-sm text-gray-600">
                              {dailyProgressPercentage}% Complete
                           </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                           <div
                              className="h-3 rounded-full bg-[#22ae4b] transition-all duration-300"
                              style={{
                                 width: `${Math.min(dailyProgressPercentage, 100)}%`,
                              }}
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-sm mt-6">
                        <div>
                           <div className="bg-red-50 rounded-lg p-3">
                              <div className="text-red-600 font-bold text-lg">
                                 {selectedDayNutrition.protein}g
                              </div>
                              <div className="text-red-500 text-xs font-medium">Protein</div>
                              <div className="w-full bg-red-200 rounded-full h-1 mt-2">
                                 <div
                                    className="h-1 rounded-full bg-red-500 transition-all duration-300"
                                    style={{
                                       width: `${Math.min(
                                          (selectedDayNutrition.protein / nutritionGoals.protein) * 100,
                                          100
                                       )}%`,
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                        <div>
                           <div className="bg-yellow-50 rounded-lg p-3">
                              <div className="text-yellow-600 font-bold text-lg">
                                 {selectedDayNutrition.carbs}g
                              </div>
                              <div className="text-yellow-500 text-xs font-medium">Carbs</div>
                              <div className="w-full bg-yellow-200 rounded-full h-1 mt-2">
                                 <div
                                    className="h-1 rounded-full bg-yellow-500 transition-all duration-300"
                                    style={{
                                       width: `${Math.min(
                                          (selectedDayNutrition.carbs / nutritionGoals.carbs) * 100,
                                          100
                                       )}%`,
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                        <div>
                           <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-blue-600 font-bold text-lg">
                                 {selectedDayNutrition.fat}g
                              </div>
                              <div className="text-blue-500 text-xs font-medium">Fat</div>
                              <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                                 <div
                                    className="h-1 rounded-full bg-blue-500 transition-all duration-300"
                                    style={{
                                       width: `${Math.min(
                                          (selectedDayNutrition.fat / nutritionGoals.fat) * 100,
                                          100
                                       )}%`,
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
               <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                     <BarChart3 className="w-5 h-5 text-[#22ae4b]" />
                     <h3 className="text-lg font-bold text-gray-900">{t.meal_planner.weekly_summary}</h3>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t.meal_planner.avg_daily_calories}</span>
                        <span className="font-semibold text-sm sm:text-base">1,850</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t.meal_planner.days_on_track}</span>
                        <span className="font-semibold text-[#22ae4b]">5/7</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t.meal_planner.meals_planned}</span>
                        <span className="font-semibold text-sm sm:text-base">18/21</span>
                     </div>
                  </div>

                  <Button className="w-full mt-6 bg-[#22ae4b] hover:bg-[#1c9a40] text-white">
                     {language === "ar" ? "عرض التقرير المفصل" : "View Detailed Report"}
                  </Button>
               </CardContent>
            </Card>

            {/* Nutrition Tips */}
            <Card>
               <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                     <Heart className="w-5 h-5 text-red-500" />
                     <h3 className="text-lg font-bold text-gray-900">
                        {language === "ar" ? "نصيحة اليوم" : "Today's Tip"}
                     </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                     {language === "ar"
                        ? "حاول تضمين الخضروات الملونة في وجباتك للحصول على تغذية أفضل وفوائد صحية."
                        : "Try to include colorful vegetables in your meals for better nutrition and health benefits."}
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};