import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { X } from "lucide-react";

interface CustomMealModalProps {
   showCustomMealModal: boolean;
   customMealName: string;
   customMealTime: string;
   language: string;
   onCustomMealNameChange: (name: string) => void;
   onCustomMealTimeChange: (time: string) => void;
   onAddCustomMealType: () => void;
   onClose: () => void;
}

export const CustomMealModal: React.FC<CustomMealModalProps> = ({
   showCustomMealModal,
   customMealName,
   customMealTime,
   language,
   onCustomMealNameChange,
   onCustomMealTimeChange,
   onAddCustomMealType,
   onClose,
}) => {
   if (!showCustomMealModal) return null;

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
         <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardContent className="p-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                     {language === "ar" ? "إضافة وقت وجبة مخصص" : "Add Custom Meal Time"}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                     <X className="w-4 h-4" />
                  </Button>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ar" ? "وقت الوجبة" : "Meal Time"}
                     </label>
                     <Input
                        placeholder="e.g., 11 AM, 3 PM, 9 PM"
                        value={customMealTime}
                        onChange={(e) => onCustomMealTimeChange(e.target.value)}
                        className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ar" ? "اسم الوجبة" : "Meal Name"}
                     </label>
                     <Input
                        placeholder="e.g., Snack, Pre-workout, Post-workout"
                        value={customMealName}
                        onChange={(e) => onCustomMealNameChange(e.target.value)}
                        className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]"
                     />
                  </div>

                  <div className="flex gap-3 pt-4">
                     <Button
                        onClick={onAddCustomMealType}
                        className="flex-1 bg-[#22ae4b] hover:bg-[#1c9a40] text-white"
                        disabled={!customMealName.trim() || !customMealTime.trim()}
                     >
                        Add Meal Time
                     </Button>
                     <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};