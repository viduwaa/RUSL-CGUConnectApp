import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Bug,
    Code,
    Database,
    Figma,
    Network,
    Palette,
    Search,
    Server,
    TrendingUp,
} from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
    Dimensions,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2;

// Job Categories Data with keywords for filtering
const jobCategories = [
  {
    id: "1",
    name: "Graphic Design",
    icon: Palette,
    color: "#E91E63",
    keywords: ["design", "graphic", "visual", "creative"],
  },
  {
    id: "2",
    name: "Networking",
    icon: Network,
    color: "#2196F3",
    keywords: ["network", "infrastructure", "cisco", "telecom"],
  },
  {
    id: "3",
    name: "UI/UX Designing",
    icon: Figma,
    color: "#9C27B0",
    keywords: ["ui", "ux", "user experience", "user interface", "figma"],
  },
  {
    id: "4",
    name: "QA Testing",
    icon: Bug,
    color: "#4CAF50",
    keywords: ["qa", "test", "quality", "automation"],
  },
  {
    id: "5",
    name: "DevOps",
    icon: Server,
    color: "#FF9800",
    keywords: ["devops", "cloud", "aws", "docker", "kubernetes"],
  },
  {
    id: "6",
    name: "Software Dev",
    icon: Code,
    color: "#00BCD4",
    keywords: [
      "software",
      "developer",
      "engineer",
      "programming",
      "full stack",
    ],
  },
  {
    id: "7",
    name: "Data Science",
    icon: Database,
    color: "#673AB7",
    keywords: ["data", "analytics", "machine learning", "ai", "analyst"],
  },
  {
    id: "8",
    name: "Marketing",
    icon: TrendingUp,
    color: "#F44336",
    keywords: ["marketing", "digital", "seo", "social media", "brand"],
  },
];

// Category Card Component
interface CategoryCardProps {
  category: (typeof jobCategories)[0];
  onPress: () => void;
}

const CategoryCard = ({ category, onPress }: CategoryCardProps) => {
  const IconComponent = category.icon;
  return (
    <TouchableOpacity
      className="rounded-2xl overflow-hidden shadow-sm mb-3"
      style={{
        width: CARD_WIDTH,
        backgroundColor: "#FFE8EC",
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="h-20 justify-center items-center bg-white/60">
        <IconComponent size={32} color={category.color} />
      </View>
      <View className="py-2.5 px-3" style={{ backgroundColor: category.color }}>
        <Text
          className="text-[13px] font-semibold text-white text-center"
          numberOfLines={1}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function AllCategoriesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return jobCategories;

    const query = searchQuery.toLowerCase();
    return jobCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query),
        ),
    );
  }, [searchQuery]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // Handle category selection - navigate to category jobs page
  const handleCategoryPress = useCallback(
    (categoryId: string, categoryName: string) => {
      router.push(
        `/category-jobs?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`,
      );
    },
    [router],
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      {/* Header */}
      <View className="bg-white px-4 py-3 flex-row items-center border-b border-gray-100">
        <Pressable
          onPress={handleBack}
          className="p-2 -ml-2 rounded-full"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900 ml-2">
          Job Categories
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 text-base text-gray-800 ml-3"
            placeholder="Search categories..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Categories Grid */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm text-gray-500 mb-4">
          {filteredCategories.length}{" "}
          {filteredCategories.length === 1 ? "category" : "categories"} found
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category.id, category.name)}
            />
          ))}
        </View>
        {filteredCategories.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-400 text-base">No categories found</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Try a different search term
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
