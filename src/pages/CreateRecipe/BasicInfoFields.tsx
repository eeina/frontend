import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../components/ui/input";

export const BasicInfoFields: React.FC = () => {
   const { register } = useFormContext();

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
               Preparation Time (minutes)
            </label>
            <Input
               type="number"
               placeholder="e.g 45"
               {...register("time", { valueAsNumber: true })}
               className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] h-12"
            />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
            <Input
               type="number"
               placeholder="e.g 4"
               {...register("servings", { valueAsNumber: true })}
               className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] h-12"
            />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
            <Input
               placeholder="www.youtube.com"
               {...register("videoUrl")}
               className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] h-12"
            />
         </div>
      </div>
   );
};
