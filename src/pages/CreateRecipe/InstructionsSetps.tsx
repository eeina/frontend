import React from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { MultilingualInput } from "./MultilingualInput";
import { ImageUploader } from "../../components/ImageUploader";
import { useLanguage } from "../../contexts/LanguageContext";

export const InstructionStepField: React.FC = () => {
   const { control } = useFormContext();
   const { language } = useLanguage();

   const {
      fields: stepFields,
      append: appendStep,
      remove: removeStep,
   } = useFieldArray({
      control,
      name: "instructions",
   });

   return (
      <div>
         <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
         <div className="space-y-6">
            {stepFields.map((field, index) => (
               <Card key={field.id} className="border-2 border-gray-200">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-[#22ae4b] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">{index + 1}</span>
                           </div>
                           <span className="text-lg font-semibold text-gray-900">
                              Step {index + 1}
                           </span>
                        </div>
                        {stepFields.length > 1 && (
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStep(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        )}
                     </div>

                     <div className="space-y-6">
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Step Image
                           </label>
                           <Controller
                              name={`instructions.${index}.image`}
                              control={control}
                              render={({ field }) => (
                                 <ImageUploader
                                    initialImage={field.value}
                                    onImageUpload={field.onChange}
                                    onDelete={() => field.onChange(null)}
                                    height="h-40"
                                    uploadText="Add Step Image"
                                 />
                              )}
                           />
                        </div>

                        <div>
                           <MultilingualInput
                              name={`instructions.${index}.step`}
                              label="Instructions"
                              placeholder="Describe the cooking steps in detail..."
                              required
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}

            <Button
               variant="outline"
               onClick={() =>
                  appendStep({
                     step: { [language]: "" },
                     image: null,
                  })
               }
               className="w-full border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white h-12"
            >
               <Plus className="w-4 h-4 mr-2" />
               Add Step
            </Button>
         </div>
      </div>
   );
};
