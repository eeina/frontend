import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";

interface EmptyMealCardProps {
   onAdd: () => void;
   language: string;
}

export const EmptyMealCard: React.FC<EmptyMealCardProps> = ({ onAdd, language }) => {
   return (
      <Card
         className="border-2 border-dashed border-gray-300 hover:border-[#22ae4b] transition-colors cursor-pointer min-h-[120px] sm:min-h-[140px]"
         onClick={onAdd}
      >
         <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center gap-3">
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" />
               </div>
               <div>
                  <h4 className="font-semibold text-gray-600">
                     {language === "ar" ? "إضافة وجبة مخصصة" : "Add Custom Meal"}
                  </h4>
                  <p className="text-sm text-gray-400">
                     {language === "ar" ? "أضف وقت الوجبة" : "Add meal time"}
                  </p>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};