import React from "react";

interface NutritionProgressProps {
   label: string;
   current: number;
   goal: number;
   unit: string;
   color: string;
}

export const NutritionProgress: React.FC<NutritionProgressProps> = ({
   label,
   current,
   goal,
   unit,
   color,
}) => {
   const percentage = Math.min((current / goal) * 100, 100);

   return (
      <div className="space-y-2">
         <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm text-gray-600">
               {current}/{goal}
               {unit}
            </span>
         </div>
         <div className="w-full bg-gray-200 rounded-full h-2">
            <div
               className={`h-2 rounded-full transition-all duration-300 ${color}`}
               style={{ width: `${percentage}%` }}
            />
         </div>
         <div className="text-xs text-gray-500 text-right">{percentage.toFixed(0)}% of goal</div>
      </div>
   );
};