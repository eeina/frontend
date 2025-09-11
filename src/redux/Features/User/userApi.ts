/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getMe: builder.query({
         query: () => ({
            url: "/user/profile",
            method: "GET",
         }),
         providesTags: ["User"],
      }),
      verifyEmail: builder.mutation({
         query: ({ email, otp }) => ({
            url: "/user/email-verification",
            method: "POST",
            body: { email, otp },
            credentials: "include",
         }),
         invalidatesTags: ["User"],
      }),
      resendEmailOtp: builder.mutation({
         query: ({ email }) => ({
            url: "/user/resend-email-otp",
            method: "POST",
            body: { email },
            credentials: "include",
         }),
         invalidatesTags: ["User"],
      }),
      getPublicRecipe: builder.query({
         query: ({ page = 1, limit = 4 }) => ({
            url: `/recipe?page=${page}&limit=${limit}`,
            method: "GET",
         }),
         providesTags: ["Recipe"],
      }),
      getSinglePublicRecipe: builder.query({
         query: (slug: string) => ({
            url: `/recipe/${slug}`,
            method: "GET",
         }),
         providesTags: ["RecipeDetails"],
      }),
      uploadImage: builder.mutation({
         query: (formData) => ({
            url: `/image/upload`,
            method: "POST",
            body: formData,
            credentials: "include",
         }),
      }),
      createRecipe: builder.mutation({
         query: (recipeData) => ({
            url: `/recipe/create`,
            method: "POST",
            body: recipeData,
            credentials: "include",
         }),
         invalidatesTags: ["Recipe"],
      }),
   }),
});

export const {
   useVerifyEmailMutation,
   useResendEmailOtpMutation,
   useGetMeQuery,
   useGetPublicRecipeQuery,
   useGetSinglePublicRecipeQuery,
   useUploadImageMutation,
   useCreateRecipeMutation,
} = userApi;
