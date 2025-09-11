import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Plus, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { MultilingualInput } from "./MultilingualInput";

export const IngredientField: React.FC = () => {
   const { control, register } = useFormContext();
   const { isRTL, language } = useLanguage();

   const {
      fields: ingredientFields,
      append: appendIngredient,
      remove: removeIngredient,
   } = useFieldArray({
      control,
      name: "ingredients",
   });

   return (
      <div>
         <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
         <div className="space-y-4">
            {ingredientFields.map((field, index) => (
               <div
                  key={field.id}
                  className="grid grid-cols-12 gap-4 items-end p-0 sm:p-4 bg-gray-50 rounded-lg"
               >
                  <div className="col-span-12 md:col-span-5">
                     <MultilingualInput
                        name={`ingredients.${index}.raw`}
                        label="Ingredient Name"
                        placeholder="Name"
                        required
                     />
                  </div>
                  <div className="col-span-12 md:col-span-1">
                     {ingredientFields.length > 1 && (
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => removeIngredient(index)}
                           className="text-red-500 hover:text-red-700 hover:bg-red-50 h-12 w-12"
                        >
                           <X className="w-5 h-5" />
                        </Button>
                     )}
                  </div>
               </div>
            ))}
         </div>
         <Button
            variant="outline"
            onClick={() =>
               appendIngredient({
                  raw: { [language]: "" },
               })
            }
            className="mt-4 border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white h-12 px-6"
         >
            <Plus className="w-4 h-4 mr-2" />
            Add Ingredient
         </Button>
      </div>
   );
};
