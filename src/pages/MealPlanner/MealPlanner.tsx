import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { AdSection } from "../Home/sections/AdSection";
import { Header } from "../../components/Header";

// Import components
import { MealPlannerHeader } from "./components/MealPlannerHeader";
import { CalendarNavigation } from "./components/CalendarNavigation";
import { DailyMealsSection } from "./components/DailyMealsSection";
import { TrendingRecipesSection } from "./components/TrendingRecipesSection";
import { NutritionTrackingSection } from "./components/NutritionTrackingSection";
import { AddRecipeModal } from "./components/AddRecipeModal";
import { CustomMealModal } from "./components/CustomMealModal";

export const MealPlanner = (): JSX.Element => {
   const { t, isRTL, language } = useLanguage();
   const [currentDate, setCurrentDate] = useState(new Date());
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [viewMode, setViewMode] = useState<"week" | "day">("week");
   const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
   const [selectedMealType, setSelectedMealType] = useState<string>("");
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState<"trending" | "saved" | "search">("trending");
   const [showCustomMealModal, setShowCustomMealModal] = useState(false);
   const [customMealName, setCustomMealName] = useState("");
   const [customMealTime, setCustomMealTime] = useState("");
   const [mealPlans, setMealPlans] = useState({
      "2024-01-15": {
         breakfast: [
            {
               id: 1,
               name: "Avocado Toast with Eggs",
               image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
               calories: 420,
               protein: 18,
               carbs: 32,
               fat: 24,
               time: "15 min",
            },
         ],
         lunch: [
            {
               id: 2,
               name: "Mediterranean Quinoa Bowl",
               image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
               calories: 520,
               protein: 22,
               carbs: 68,
               fat: 16,
               time: "20 min",
            },
         ],
         dinner: [
            {
               id: 3,
               name: "Grilled Salmon with Vegetables",
               image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
               calories: 680,
               protein: 45,
               carbs: 28,
               fat: 38,
               time: "30 min",
            },
         ],
         "11am-snack": [
            {
               id: 4,
               name: "Greek Yogurt with Berries",
               image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
               calories: 180,
               protein: 12,
               carbs: 24,
               fat: 4,
               time: "5 min",
            },
         ],
      },
      "2024-01-16": {
         breakfast: [
            {
               id: 5,
               name: "Greek Yogurt Parfait",
               image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
               calories: 350,
               protein: 20,
               carbs: 45,
               fat: 8,
               time: "5 min",
            },
         ],
         lunch: [
            {
               id: 6,
               name: "Chicken Caesar Salad",
               image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
               calories: 480,
               protein: 35,
               carbs: 18,
               fat: 28,
               time: "15 min",
            },
         ],
      },
   });

   // Nutrition goals
   const nutritionGoals = {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 67,
   };

   // Trending recipes data
   const trendingRecipes = [
      {
         id: 1,
         title: "Spicy Thai Basil Chicken",
         image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 520,
         protein: 35,
         carbs: 28,
         fat: 24,
         time: "25 min",
         rating: 4.8,
         category: "Asian",
      },
      {
         id: 2,
         title: "Mediterranean Quinoa Bowl",
         image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 420,
         protein: 18,
         carbs: 52,
         fat: 16,
         time: "15 min",
         rating: 4.6,
         category: "Healthy",
      },
      {
         id: 3,
         title: "Classic Margherita Pizza",
         image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 680,
         protein: 28,
         carbs: 72,
         fat: 32,
         time: "45 min",
         rating: 4.7,
         category: "Pizza",
      },
      {
         id: 4,
         title: "Fluffy Pancakes with Berries",
         image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 380,
         protein: 12,
         carbs: 58,
         fat: 14,
         time: "20 min",
         rating: 4.5,
         category: "Breakfast",
      },
   ];

   // Saved recipes data
   const savedRecipes = [
      {
         id: 5,
         title: "Creamy Porcini Mushroom Polenta",
         image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 450,
         protein: 16,
         carbs: 48,
         fat: 22,
         time: "30 min",
         rating: 4.9,
         category: "Pasta",
      },
      {
         id: 6,
         title: "Grilled Salmon with Vegetables",
         image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 580,
         protein: 42,
         carbs: 18,
         fat: 36,
         time: "25 min",
         rating: 4.8,
         category: "Healthy",
      },
      {
         id: 7,
         title: "Chocolate Lava Cake",
         image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
         calories: 520,
         protein: 8,
         carbs: 64,
         fat: 28,
         time: "35 min",
         rating: 4.9,
         category: "Dessert",
      },
   ];

   // Search recipes (filtered from trending + saved)
   const allRecipes = [...trendingRecipes, ...savedRecipes];
   const searchResults = allRecipes.filter(
      (recipe) =>
         recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
   );

   // Get current week dates
   const getWeekDates = (date: Date) => {
      const week = [];
      const startDate = new Date(date);
      const day = startDate.getDay();
      const diff = startDate.getDate() - day;
      startDate.setDate(diff);

      for (let i = 0; i < 7; i++) {
         const currentDate = new Date(startDate);
         currentDate.setDate(startDate.getDate() + i);
         week.push(currentDate);
      }
      return week;
   };

   const weekDates = getWeekDates(currentDate);
   const dayNames =
      language === "ar"
         ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
         : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   const monthNames =
      language === "ar"
         ? [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
           ]
         : [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
           ];

   // Calculate daily nutrition
   const calculateDayNutrition = (dateStr: string) => {
      const meals = mealPlans[dateStr];
      if (!meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

      let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      Object.values(meals).forEach((mealArray) => {
         if (Array.isArray(mealArray)) {
            mealArray.forEach((meal) => {
               totals.calories += meal.calories;
               totals.protein += meal.protein;
               totals.carbs += meal.carbs;
               totals.fat += meal.fat;
            });
         }
      });
      return totals;
   };

   // Format date for key
   const formatDateKey = (date: Date) => {
      return date.toISOString().split("T")[0];
   };

   const selectedDateKey = formatDateKey(selectedDate);
   const selectedDayMeals = mealPlans[selectedDateKey] || {};
   const selectedDayNutrition = calculateDayNutrition(selectedDateKey);

   // Get all meal types for the selected day (including custom ones)
   const getMealTypes = (dateKey: string) => {
      const dayMeals = mealPlans[dateKey] || {};
      const standardMeals =
         language === "ar"
            ? ["فطور", "غداء", "عشاء", "وجبة خفيفة"]
            : ["breakfast", "lunch", "dinner", "snack"];
      const customMeals = Object.keys(dayMeals).filter((key) => !standardMeals.includes(key));
      return [...standardMeals, ...customMeals];
   };

   const formatMealTypeName = (mealType: string) => {
      if (mealType.includes("-")) {
         // Custom meal like "11am-snack" -> "11 AM Snack"
         return mealType
            .split("-")
            .map((part) => {
               if (part.includes("am") || part.includes("pm")) {
                  return part.replace("am", " AM").replace("pm", " PM");
               }
               return part.charAt(0).toUpperCase() + part.slice(1);
            })
            .join(" ");
      }
      return mealType.charAt(0).toUpperCase() + mealType.slice(1);
   };

   const addRecipeToMeal = (recipe: any, mealType: string) => {
      const mealData = {
         id: recipe.id,
         name: recipe.title,
         image: recipe.image,
         calories: recipe.calories,
         protein: recipe.protein,
         carbs: recipe.carbs,
         fat: recipe.fat,
         time: recipe.time,
      };

      setMealPlans((prev) => ({
         ...prev,
         [selectedDateKey]: {
            ...prev[selectedDateKey],
            [mealType]: [...(prev[selectedDateKey]?.[mealType] || []), mealData],
         },
      }));

      setShowAddRecipeModal(false);
      setSelectedMealType("");
   };

   const removeMealFromPlan = (dateKey: string, mealType: string, mealId: number) => {
      setMealPlans((prev) => {
         const updated = { ...prev };
         if (updated[dateKey]) {
            const mealArray = updated[dateKey][mealType];
            if (Array.isArray(mealArray)) {
               updated[dateKey][mealType] = mealArray.filter((meal) => meal.id !== mealId);
               // Remove empty meal type arrays
               if (updated[dateKey][mealType].length === 0) {
                  delete updated[dateKey][mealType];
               }
            }
         }
         return updated;
      });
   };

   const addCustomMealType = () => {
      if (customMealName.trim() && customMealTime.trim()) {
         const customKey = `${customMealTime.toLowerCase().replace(/\s+/g, "")}-${customMealName
            .toLowerCase()
            .replace(/\s+/g, "")}`;
         setSelectedMealType(customKey);
         setShowCustomMealModal(false);
         setShowAddRecipeModal(true);
         setCustomMealName("");
         setCustomMealTime("");
      }
   };

   const handleTrendingRecipeClick = (recipe: any) => {
      // If no meal type is selected, show modal to choose
      if (!selectedMealType) {
         setSelectedMealType("breakfast"); // Default to breakfast
         setShowAddRecipeModal(true);
         setActiveTab("trending");
      } else {
         // Add directly to the selected meal type
         addRecipeToMeal(recipe, selectedMealType);
      }
   };

   // Function to show meal selection for a recipe
   const showMealSelectionModal = (recipe: any) => {
      setSelectedMealType("");
      setShowAddRecipeModal(true);
      setActiveTab("trending");
      // Store the selected recipe for later use
      console.log("Selected recipe for meal planning:", recipe);
   };

   // Event handlers for CalendarNavigation
   const handleDateChange = (date: Date) => {
      setSelectedDate(date);
   };

   const handleViewModeChange = (mode: "week" | "day") => {
      setViewMode(mode);
   };

   const handleWeekChange = (direction: "prev" | "next") => {
      const newDate = new Date(currentDate);
      if (direction === "prev") {
         newDate.setDate(currentDate.getDate() - 7);
      } else {
         newDate.setDate(currentDate.getDate() + 7);
      }
      setCurrentDate(newDate);
   };

   // Event handlers for DailyMealsSection
   const handleAddMealClick = (mealType: string) => {
      setSelectedMealType(mealType);
      setShowAddRecipeModal(true);
   };

   const handleShowCustomMealModal = () => {
      setShowCustomMealModal(true);
   };

   // Event handlers for AddRecipeModal
   const handleMealTypeSelect = (mealType: string) => {
      setSelectedMealType(mealType);
   };

   const handleTabChange = (tab: "trending" | "saved" | "search") => {
      setActiveTab(tab);
   };

   const handleSearchChange = (query: string) => {
      setSearchQuery(query);
   };

   const handleModalClose = () => {
      setShowAddRecipeModal(false);
      setSelectedMealType("");
      setSearchQuery("");
   };

   // Event handlers for CustomMealModal
   const handleCustomMealNameChange = (name: string) => {
      setCustomMealName(name);
   };

   const handleCustomMealTimeChange = (time: string) => {
      setCustomMealTime(time);
   };

   const handleCustomMealModalClose = () => {
      setShowCustomMealModal(false);
   };

   return (
      <div className="bg-gray-50 min-h-screen">
         <Header />

         <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <MealPlannerHeader t={t} />

            {/* Calendar Navigation */}
            <CalendarNavigation
               currentDate={currentDate}
               viewMode={viewMode}
               weekDates={weekDates}
               dayNames={dayNames}
               monthNames={monthNames}
               selectedDate={selectedDate}
               calculateDayNutrition={calculateDayNutrition}
               formatDateKey={formatDateKey}
               onDateChange={handleDateChange}
               onViewModeChange={handleViewModeChange}
               onWeekChange={handleWeekChange}
            />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
               {/* Left - Daily Meals */}
               <DailyMealsSection
                  selectedDate={selectedDate}
                  selectedDateKey={selectedDateKey}
                  selectedDayMeals={selectedDayMeals}
                  getMealTypes={getMealTypes}
                  formatMealTypeName={formatMealTypeName}
                  language={language}
                  onAddMealClick={handleAddMealClick}
                  onRemoveMeal={removeMealFromPlan}
                  onRemoveCustomMeal={() => {}}
                  onShowCustomMealModal={handleShowCustomMealModal}
                  setMealPlans={setMealPlans}
               />

               {/* Right Sidebar - Nutrition Tracking */}
               <NutritionTrackingSection
                  selectedDayNutrition={selectedDayNutrition}
                  nutritionGoals={nutritionGoals}
                  t={t}
                  language={language}
               />
            </div>

            {/* Trending Recipes Section */}
            <TrendingRecipesSection
               trendingRecipes={trendingRecipes}
               t={t}
               language={language}
               onShowMealSelectionModal={showMealSelectionModal}
            />
         </div>

         {/* Add Recipe Modal */}
         <AddRecipeModal
            showAddRecipeModal={showAddRecipeModal}
            selectedMealType={selectedMealType}
            activeTab={activeTab}
            searchQuery={searchQuery}
            trendingRecipes={trendingRecipes}
            savedRecipes={savedRecipes}
            searchResults={searchResults}
            selectedDateKey={selectedDateKey}
            getMealTypes={getMealTypes}
            formatMealTypeName={formatMealTypeName}
            language={language}
            onAddRecipeToMeal={addRecipeToMeal}
            onClose={handleModalClose}
            onMealTypeSelect={handleMealTypeSelect}
            onTabChange={handleTabChange}
            onSearchChange={handleSearchChange}
            onShowCustomMealModal={handleShowCustomMealModal}
         />

         {/* Custom Meal Modal */}
         <CustomMealModal
            showCustomMealModal={showCustomMealModal}
            customMealName={customMealName}
            customMealTime={customMealTime}
            language={language}
            onCustomMealNameChange={handleCustomMealNameChange}
            onCustomMealTimeChange={handleCustomMealTimeChange}
            onAddCustomMealType={addCustomMealType}
            onClose={handleCustomMealModalClose}
         />

         <AdSection />
      </div>
   );
};