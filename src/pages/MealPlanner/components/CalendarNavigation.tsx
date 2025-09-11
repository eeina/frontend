import React from "react";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarNavigationProps {
   currentDate: Date;
   viewMode: "week" | "day";
   weekDates: Date[];
   dayNames: string[];
   monthNames: string[];
   selectedDate: Date;
   calculateDayNutrition: (dateStr: string) => { calories: number; protein: number; carbs: number; fat: number };
   formatDateKey: (date: Date) => string;
   onDateChange: (date: Date) => void;
   onViewModeChange: (mode: "week" | "day") => void;
   onWeekChange: (direction: "prev" | "next") => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
   currentDate,
   viewMode,
   weekDates,
   dayNames,
   monthNames,
   selectedDate,
   calculateDayNutrition,
   formatDateKey,
   onDateChange,
   onViewModeChange,
   onWeekChange,
}) => {
   return (
      <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 sm:gap-4">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onWeekChange("prev")}
               >
                  <ChevronLeft className="w-4 h-4" />
               </Button>

               <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
               </h2>

               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onWeekChange("next")}
               >
                  <ChevronRight className="w-4 h-4" />
               </Button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1">
               <Button
                  variant={viewMode === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange("week")}
                  className={viewMode === "week" ? "bg-white shadow-sm" : "hover:bg-white/50"}
               >
                  Week
               </Button>
               <Button
                  variant={viewMode === "day" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange("day")}
                  className={viewMode === "day" ? "bg-white shadow-sm" : "hover:bg-white/50"}
               >
                  Day
               </Button>
            </div>
         </div>

         {/* Week Calendar */}
         <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {weekDates.map((date, index) => {
               const dateKey = formatDateKey(date);
               const dayNutrition = calculateDayNutrition(dateKey);
               const isSelected = formatDateKey(date) === formatDateKey(selectedDate);
               const isToday = formatDateKey(date) === formatDateKey(new Date());

               return (
                  <div
                     key={index}
                     className={`p-2 sm:p-4 rounded-lg cursor-pointer transition-all ${
                        isSelected
                           ? "bg-[#22ae4b] text-white"
                           : isToday
                           ? "bg-blue-50 border-2 border-blue-200"
                           : "bg-gray-50 hover:bg-gray-100"
                     }`}
                     onClick={() => onDateChange(date)}
                  >
                     <div className="text-center">
                        <div className="text-[.5rem] sm:text-sm font-medium mb-1">{dayNames[date.getDay()]}</div>
                        <div className="text-xs sm:text-2xl font-bold mb-1 sm:mb-2">{date.getDate()}</div>
                        {dayNutrition.calories > 0 && viewMode === "week" && (
                           <div className={`text-xs ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                              {dayNutrition.calories} cal
                           </div>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};