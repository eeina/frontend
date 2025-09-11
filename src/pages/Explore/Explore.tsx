/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { TopCreatorsSection } from "../Home/sections/TopCreatorsSection";
import { AdSection } from "../Home/sections/AdSection";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar } from "../../components/ui/avatar";
import {
    Heart,
    Clock,
    Users,
    ChefHat,
    Search,
    Filter,
    Grid3X3,
    List,
    Star,
    TrendingUp,
    Globe,
    Award,
    BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { useGetPublicRecipeQuery } from "../../redux/Features/User/userApi";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import Loader from "../../components/ui/Loader";
import { formatTimeLocalized } from "../../lib/formatTimeLocalized";

export const Explore = (): JSX.Element => {
    const { t, isRTL, language } = useLanguage();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCuisine, setSelectedCuisine] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
const { allData:recipes, isLoading, isFetching, lastElementRef, hasMore } =
  useInfiniteScroll(useGetPublicRecipeQuery, 4);
    // console.log("Recipes from API:", recipes?.data?.docs);

    // fallback (hardcoded fields for now)
    const fallbackRecipes = [
        {
            _id: "68b980f51170affe1b6d9d81",
            title: {
                en: "Winter Fattoush Salad",
                ar: "سلطة فتوش شتوية",
            },
            slug: {
                en: "winter-fattoush-salad-1",
                ar: "سلطة-فتوش-شتوية",
            },
            category: [
                "side-dish",
                "lunch",
                "main-course",
                "salad",
                "main-dish",
                "dinner",
                "winter",
            ],
            time: 45, // API has "time" in minutes
            servings: 6,
            difficulty: "Beginner", // custom, not in API
            cuisine: "Middle Eastern", // custom
            rating: 4.8, // custom
            reviews: 1, // custom
            image: "https://eeina-main.s3.eu-north-1.amazonaws.com/uploads/importURL/199149fb98e-ae93b.jpg",
            author: {
                name: "Safayat Khan Rohan",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
            },
            trending: false,
            featured: true,
        },
        {
            _id: "68b94fc235df63060e3a2315",
            title: {
                en: "Cauliflower Chickpea Stew",
                ar: "يخنة الزهرة والحمص",
            },
            slug: {
                en: "cauliflower-chickpea-stew-1",
                ar: "يخنة-الزهرة-والحمص",
            },
            category: ["lunch", "soup", "main-course", "main-dish", "dinner", "fall", "winter"],
            time: 45,
            servings: 4,
            difficulty: "Intermediate",
            cuisine: "Middle Eastern",
            rating: 4.7,
            reviews: 2,
            image: "https://eeina-main.s3.eu-north-1.amazonaws.com/uploads/importURL/19913df89f4-85f2.jpg",
            author: {
                name: "Safayat Khan Rohan",
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
            },
            trending: true,
        },
    ];

    // Merge API data with fallback
 
const mergedRecipes = recipes.length > 0
  ? recipes.map((recipe: any) => {
      const fallback = fallbackRecipes.find((f) => f._id === recipe._id);
      return {
        ...recipe,
        difficulty: fallback?.difficulty ?? "Unknown",
        cuisine: fallback?.cuisine ?? "Unknown",
        rating: fallback?.rating ?? 0,
        reviews: fallback?.reviews ?? 0,
        image: recipe.thumbnail?.url ?? fallback?.image,
        author: fallback?.author ?? { name: recipe.createdBy?.firstName, avatar: null },
        trending: fallback?.trending ?? false,
        featured: fallback?.featured ?? false,
      };
    })
  : fallbackRecipes;

    // Generate localized path
    const getLocalizedPath = (path: string) => {
        return language === "ar" ? `/ar${path === "/" ? "" : path}` : path;
    };

    // Featured categories
    const featuredCategories = [
        {
            name: language === "ar" ? "الأكثر رواجًا" : "Trending Now",
            icon: TrendingUp,
            count: 156,
            color: "bg-red-500",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        },
        {
            name: language === "ar" ? "سريع وسهل" : "Quick & Easy",
            icon: Clock,
            count: 89,
            color: "bg-blue-500",
            image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        },
        {
            name: language === "ar" ? "صحي" : "Healthy",
            icon: Award,
            count: 124,
            color: "bg-green-500",
            image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        },
        {
            name: language === "ar" ? "مأكولات عالمية" : "World Cuisine",
            icon: Globe,
            count: 203,
            color: "bg-purple-500",
            image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        },
    ];

    const categories = ["All", "Salad", "Soup", "Main Course", "Lunch", "Dinner", "Winter", "Fall"];
    const cuisines = ["All", "Middle Eastern"];
    const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

    const filteredRecipes = mergedRecipes.filter((recipe) => {
        const matchesSearch =
            recipe.title[language]?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            recipe.cuisine?.toLowerCase().includes(searchQuery?.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || recipe.category.includes(selectedCategory);
        const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
        const matchesDifficulty =
            selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
        return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
    });

    const GridView = () => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe: any) => (
                <Link key={recipe._id} to={getLocalizedPath(`/recipe/${recipe.slug[language]}`)}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <CardContent className="p-0">
                            <div className="relative">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title[language]}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <Badge className="bg-[#22ae4b] text-white">
                                        {recipe.category[0][0].toUpperCase() +
                                            recipe.category[0].slice(1)}
                                    </Badge>
                                    {recipe.trending && (
                                        <Badge className="bg-red-500 text-white">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            Trending
                                        </Badge>
                                    )}
                                    {recipe.featured && (
                                        <Badge className="bg-purple-500 text-white">
                                            <Star className="w-3 h-3 mr-1" />
                                            Featured
                                        </Badge>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 rounded-full"
                                >
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#22ae4b] transition-colors line-clamp-2">
                                    {recipe.title[language]}
                                </h3>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span> {formatTimeLocalized(recipe.time)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{recipe.servings}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ChefHat className="w-4 h-4" />
                                        <span>{recipe.difficulty}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                            <img
                                                src={recipe.author.avatar}
                                                alt={recipe.author.name}
                                            />
                                        </Avatar>
                                        <span className="text-sm text-gray-600">
                                            {recipe.author.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <div className="flex text-yellow-400">★★★★★</div>
                                        <span className="text-gray-600">({recipe.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
         
        </div>
         
        </>
      
    );

    const ListView = () => (
        <>
           <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
                <Link
                    key={recipe._id}
                    to={getLocalizedPath(`/recipe/${recipe.slug[language]}`)}
                    className="block" 
                >
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-0">
                            <div className="flex">
                                <div className="relative w-48 h-32">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title[language]}
                                        className="w-full h-full object-cover rounded-l-lg"
                                    />
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        <Badge className="bg-[#22ae4b] text-white text-xs">
                                            {recipe.category[0]}
                                        </Badge>
                                        {recipe.trending && (
                                            <Badge className="bg-red-500 text-white text-xs">
                                                Trending
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 p-4 flex justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-[#22ae4b] transition-colors">
                                            {recipe.title[language]}
                                        </h3>

                                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{recipe.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{recipe.servings} servings</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ChefHat className="w-4 h-4" />
                                                <span>{recipe.difficulty}</span>
                                            </div>
                                            <span className="text-[#22ae4b] font-medium">
                                                {recipe.cuisine}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-6 h-6">
                                                <img
                                                    src={recipe.author.avatar}
                                                    alt={recipe.author.name}
                                                />
                                            </Avatar>
                                            <span className="text-sm text-gray-600">
                                                {recipe.author.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end justify-between">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                        <div className="flex items-center gap-1 text-sm">
                                            <div className="flex text-yellow-400">★★★★★</div>
                                            <span className="text-gray-600">
                                                ({recipe.reviews})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
           
        </div>
       
        </>
     
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="w-8 h-8 text-[#22ae4b]" />
                        <h1 className="text-3xl font-bold text-gray-900">{t.explore.title}</h1>
                    </div>
                    <p className="text-gray-600">{t.explore.discover_recipes}</p>
                </div>

                {/* Featured Categories */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t.explore.featured_categories}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCategories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}`}
                            >
                                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <CardContent className="p-0">
                                        <div className="relative h-32">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover rounded-t-lg"
                                            />
                                            <div className="absolute inset-0 bg-black/40 rounded-t-lg" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div
                                                    className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-2`}
                                                >
                                                    <category.icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="font-bold text-lg mb-1">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {category.count} recipes
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                    <div className="flex flex-col gap-6">
                        {/* Search */}
                        <div className="relative max-w-md">
                            <Search
                                className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
                            />
                            <Input
                                placeholder={t.explore.search_recipes}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`${isRTL ? "pr-10 text-right" : "pl-10 text-left"} border-gray-200 focus:border-[#22ae4b] focus:ring-[#22ae4b]`}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Category Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.explore.category}
                                </label>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={
                                                selectedCategory === category
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            onClick={() => setSelectedCategory(category)}
                                            className={
                                                selectedCategory === category
                                                    ? "bg-[#22ae4b] hover:bg-[#1c9a40] text-white"
                                                    : "border-gray-200 hover:border-[#22ae4b] hover:text-[#22ae4b]"
                                            }
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Cuisine Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.explore.cuisine}
                                </label>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {cuisines.map((cuisine) => (
                                        <Button
                                            key={cuisine}
                                            variant={
                                                selectedCuisine === cuisine ? "default" : "outline"
                                            }
                                            size="sm"
                                            onClick={() => setSelectedCuisine(cuisine)}
                                            className={
                                                selectedCuisine === cuisine
                                                    ? "bg-[#22ae4b] hover:bg-[#1c9a40] text-white"
                                                    : "border-gray-200 hover:border-[#22ae4b] hover:text-[#22ae4b]"
                                            }
                                        >
                                            {cuisine}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.explore.difficulty}
                                </label>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {difficulties.map((difficulty) => (
                                        <Button
                                            key={difficulty}
                                            variant={
                                                selectedDifficulty === difficulty
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            onClick={() => setSelectedDifficulty(difficulty)}
                                            className={
                                                selectedDifficulty === difficulty
                                                    ? "bg-[#22ae4b] hover:bg-[#1c9a40] text-white"
                                                    : "border-gray-200 hover:border-[#22ae4b] hover:text-[#22ae4b]"
                                            }
                                        >
                                            {difficulty}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="text-gray-600">
                                {t.explore.showing_results} {filteredRecipes.length}{" "}
                                {language === "ar" ? "من" : "of"} {mergedRecipes.length}{" "}
                                {language === "ar" ? "وصفة" : "recipes"}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className={
                                        viewMode === "grid"
                                            ? "bg-white shadow-sm"
                                            : "hover:bg-white/50"
                                    }
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className={
                                        viewMode === "list"
                                            ? "bg-white shadow-sm"
                                            : "hover:bg-white/50"
                                    }
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipes Grid/List */}
                {filteredRecipes.length > 0 ? (
                    <>
                        <div className="block md:hidden">
                            <GridView />
                        </div>

                        <div className="hidden md:block">
                            {viewMode === "grid" ? <GridView /> : <ListView />}
                        </div>
                         <div ref={lastElementRef} className="p-4 text-center">
                            {isFetching && <Loader/>}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {t.explore.no_recipes_found}
                        </h3>
                        <p className="text-gray-500">{t.explore.adjust_filters}</p>
                    </div>
                )}
            </div>

            <AdSection />
        </div>
    );
};
