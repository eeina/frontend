import React from "react";
import { MealCard } from "./MealCard";
import { EmptyMealCard } from "./EmptyMealCard";

interface DailyMealsSectionProps {
   selectedDate: Date;
   selectedDateKey: string;
   selectedDayMeals: any;
   getMealTypes: (dateKey: string) => string[];
   formatMealTypeName: (mealType: string) => string;
   language: string;
   onAddMealClick: (mealType: string) => void;
   onRemoveMeal: (dateKey: string, mealType: string, mealId: number) => void;
   onRemoveCustomMeal: (dateKey: string, mealType: string) => void;
   onShowCustomMealModal: () => void;
   setMealPlans: React.Dispatch<React.SetStateAction<any>>;
}

export const DailyMealsSection: React.FC<DailyMealsSectionProps> = ({
   selectedDate,
   selectedDateKey,
   selectedDayMeals,
   getMealTypes,
   formatMealTypeName,
   language,
   onAddMealClick,
   onRemoveMeal,
   onRemoveCustomMeal,
   onShowCustomMealModal,
   setMealPlans,
}) => {
   const handleRemoveMeal = (mealId: number) => {
      onRemoveMeal(selectedDateKey, "", mealId);
   };

   const handleRemoveCustomMeal = (mealType: string) => {
      setMealPlans((prev) => {
         const updated = { ...prev };
         if (updated[selectedDateKey]) {
            delete updated[selectedDateKey][mealType];
         }
         return updated;
      });
   };

   return (
      <div className="lg:col-span-8">
         <div className="mb-4 sm:mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
               {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
               })}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
               {language === "ar" ? "خطط وجباتك لهذا اليوم" : "Plan your meals for the day"}
            </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {getMealTypes(selectedDateKey).map((mealType) => (
               <MealCard
                  key={mealType}
                  mealType={mealType}
                  meals={selectedDayMeals[mealType] || []}
                  selectedDateKey={selectedDateKey}
                  formatMealTypeName={formatMealTypeName}
                  onAdd={() => onAddMealClick(mealType)}
                  onRemove={handleRemoveMeal}
                  onRemoveCustomMeal={() => handleRemoveCustomMeal(mealType)}
               />
            ))}

            <EmptyMealCard onAdd={onShowCustomMealModal} language={language} />
         </div>
      </div>
   );
};