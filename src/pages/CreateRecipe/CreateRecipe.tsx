import { useForm, FormProvider, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createRecipeSchema } from "../../schemas/recipe/createRecipeSchema";
import { useLanguage } from "../../contexts/LanguageContext";
import { AdSection } from "../Home/sections/AdSection";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ChefHat, Plus, X } from "lucide-react";
import { Header } from "../../components/Header";
import { IngredientField } from "./IngredientFeild";
import { InstructionStepField } from "./InstructionsSetps";
import { BasicInfoFields } from "./BasicInfoFields";
import { ImageUploader } from "../../components/ImageUploader";
import { MultilingualInput } from "./MultilingualInput";
import { useCreateRecipeMutation } from "../../redux/Features/User/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";

type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;

export const CreateRecipe = (): JSX.Element => {
   const { t, isRTL, language } = useLanguage();
   const [createRecipe] = useCreateRecipeMutation();
   const navigate = useNavigate();

   const methods = useForm<CreateRecipeFormData>({
      resolver: zodResolver(createRecipeSchema),
      defaultValues: {
         title: { [language]: "" },
         description: { [language]: "" },
         ingredients: [{ raw: { [language]: "" } }],
         instructions: [{ step: { [language]: "" }, image: null }],
         category: [""],
         servings: 1,
         time: 0,
         thumbnail: null as any, // cheating with typescript
         otherImages: [],
         videoUrl: "",
      },
   });

   const { fields, append, remove, update } = useFieldArray({
      control: methods.control,
      name: "otherImages", // matches your schema
   });

   const handleCreateRecipe = async (data: CreateRecipeFormData) => {
      console.log("Creating recipe:", data);
      // Here you would send the data to your backend
      try {
         await createRecipe(data).unwrap();
         toast.success("Recipe created successfully!");
         navigate("/");
         methods.reset();
      } catch (error) {
         toast.error("Failed to create recipe. Please try again.");
         console.error("Error creating recipe:", error);
      }
   };

   return (
      <>
         <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-8">
               {/* Header */}
               <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                     <ChefHat className="w-8 h-8 text-[#22ae4b]" />
                     <div>
                        <div className="text-sm text-[#22ae4b] font-medium">
                           {language === "ar" ? "الوصفات" : "Recipes"}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                           {t.create_recipe.create_new_recipe}
                        </h1>
                     </div>
                  </div>
               </div>

               <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleCreateRecipe)}>
                     <div className="grid grid-cols-12 gap-4 sm:gap-8">
                        {/* Main Form */}
                        <div className="col-span-12 lg:col-span-8">
                           <Card>
                              <div className="p-8">
                                 <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                       {t.create_recipe.create_new_recipe}
                                    </h2>
                                 </div>

                                 <div className="space-y-8">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 gap-6">
                                       <MultilingualInput
                                          name="title"
                                          label="Recipe Title"
                                          placeholder="Recipe Title"
                                          required
                                       />
                                       {/* Basic information such as time servings */}
                                       <BasicInfoFields />

                                       <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                             Thumbnail Image
                                          </label>
                                          <Controller
                                             name="thumbnail"
                                             control={methods.control}
                                             render={({ field }) => (
                                                <ImageUploader
                                                   initialImage={field.value}
                                                   onImageUpload={field.onChange}
                                                   onDelete={() => field.onChange(null)}
                                                   height="h-48"
                                                   uploadText="Click to upload thumbnail"
                                                   subText="PNG, JPG, WEBP"
                                                />
                                             )}
                                          />
                                       </div>

                                       <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                             Additional Images
                                          </label>

                                          <div className="space-y-4">
                                             {fields.map((fieldItem, index) => (
                                                <div
                                                   key={fieldItem.id}
                                                   className="flex items-center gap-4"
                                                >
                                                   <div className="flex-1">
                                                      <ImageUploader
                                                         initialImage={fieldItem}
                                                         onImageUpload={(newImage) =>
                                                            update(index, newImage as any)
                                                         }
                                                         onDelete={() => remove(index)}
                                                         height="h-32"
                                                         uploadText="Click to upload additional image"
                                                      />
                                                   </div>

                                                   {fields.length > 1 && (
                                                      <Button
                                                         variant="ghost"
                                                         size="icon"
                                                         onClick={() => remove(index)}
                                                         className="text-red-500 hover:text-red-700 hover:bg-red-50 h-12 w-12"
                                                      >
                                                         <X className="w-5 h-5" />
                                                      </Button>
                                                   )}
                                                </div>
                                             ))}

                                             <Button
                                                variant="outline"
                                                onClick={() => append({ key: "", url: "" })}
                                                className="w-full border-[#22ae4b] text-[#22ae4b] hover:bg-[#22ae4b] hover:text-white h-12"
                                             >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Image
                                             </Button>
                                          </div>
                                       </div>

                                       <div>
                                          <MultilingualInput
                                             name="description"
                                             label="Description"
                                             placeholder="Describe your recipe in detail..."
                                          />
                                       </div>
                                    </div>

                                    <IngredientField />
                                    <InstructionStepField />

                                    <Controller
                                       control={methods.control}
                                       name="category"
                                       render={({ field }) => (
                                          <Input
                                             placeholder="Category"
                                             {...field}
                                             className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] h-12"
                                             onChange={(e) => field.onChange(e.target.value)} // just keep it as string while typing
                                             onBlur={(e) =>
                                                field.onChange(
                                                   e.target.value
                                                      .split(",")
                                                      .map((item) => item.trim()) // convert to array on blur
                                                )
                                             }
                                             value={
                                                Array.isArray(field.value)
                                                   ? field.value.join(", ")
                                                   : field.value
                                             } // display as comma-separated
                                          />
                                       )}
                                    />

                                    <div className="pt-6">
                                       <Button
                                          type="submit"
                                          className="w-full bg-[#22ae4b] hover:bg-[#1c9a40] text-white py-4 text-lg font-semibold rounded-xl h-14"
                                       >
                                          {t.create_recipe.create_recipe}
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </Card>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-12 lg:col-span-4">
                           {/* ... (keep the existing sidebar content) ... */}
                        </div>
                     </div>
                  </form>
               </FormProvider>
            </div>

            <AdSection />
         </div>
      </>
   );
};
