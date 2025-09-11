import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { useLanguage } from "../../contexts/LanguageContext";

interface MultilingualInputProps {
   name: string;
   label: string;
   placeholder?: string;
   required?: boolean;
}

export const MultilingualInput: React.FC<MultilingualInputProps> = ({
   name,
   label,
   placeholder,
   required = false,
}) => {
   const { register } = useFormContext();
   const { language } = useLanguage();
   console.log("Current language:", language);

   return (
      <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
         </label>
         <div className="space-y-4">
            <div>
               <Input
                  placeholder={placeholder}
                  {...register(`${name}.${language}`)}
                  className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] h-12"
               />
            </div>
         </div>
      </div>
   );
};
