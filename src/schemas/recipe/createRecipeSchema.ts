import { z } from "zod";

// Ingredient schema
const ingredientSchema = z.object({
    raw: z
        .object({
            en: z.string().trim().nullable().optional(),
            ar: z.string().trim().nullable().optional(),
        })
        .refine((val) => val.en || val.ar, {
            message: "At least one of 'en' or 'ar' is required",
        }),
});

// Instruction step schema
const instructionStepSchema = z.object({
    step: z
        .object({
            en: z.string().trim().nullable().optional(),
            ar: z.string().trim().nullable().optional(),
        })
        .refine((val) => val.en || val.ar, {
            message: "At least one of 'en' or 'ar' is required",
        }),

    image: z
        .object({
            url: z.string().url(),
            key: z.string(),
        })
        .nullable()
        .optional(),
});

// Main recipe schema
export const createRecipeSchema = z.object({
    title: z
        .object({
            en: z.string().trim().nullable().optional(),
            ar: z.string().trim().nullable().optional(),
        })
        .refine((val) => val.en || val.ar, {
            message: "At least one of 'en' or 'ar' is required for title",
        }),

    description: z
        .object({
            en: z.string().trim().nullable().optional(),
            ar: z.string().trim().nullable().optional(),
        })
        .refine((val) => val.en || val.ar, {
            message: "At least one of 'en' or 'ar' is required for description",
        })
        .optional(),

    ingredients: z.array(ingredientSchema).min(1, {
        message: "At least one ingredient is required",
    }),

    instructions: z.array(instructionStepSchema).optional(),

    servings: z.number().min(1, "Servings must be at least 1"),
    time: z.number().min(0, "Time cannot be negative"),

    category: z.array(z.string().min(1, "Category cannot be empty")),

    thumbnail: z.object({
        url: z.string().url(),
        key: z.string(),
    }),

    otherImages: z
        .array(
            z.object({
                url: z.string().url(),
                key: z.string(),
            })
        )
        .optional(),

    videoUrl: z.string().url().nullable().optional(),
});
