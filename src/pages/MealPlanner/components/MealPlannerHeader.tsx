import React from "react";
import { CalendarDays } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

interface MealPlannerHeaderProps {
   t: any;
}

export const MealPlannerHeader: React.FC<MealPlannerHeaderProps> = ({ t }) => {
   return (
      <div className="mb-6 sm:mb-8">
         <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-[#22ae4b]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.meal_planner.title}</h1>
         </div>
         <p className="text-sm sm:text-base text-gray-600">{t.meal_planner.plan_meals}</p>
      </div>
   );
};