import CompanyProfile from "@/components/jobSeeker/company-profile";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bug,
  ChevronDown,
  ChevronRight,
  Code,
  Database,
  Figma,
  Network,
  Palette,
  Search,
  Server,
  TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2;

// Job Categories Data
const jobCategories = [
  { id: "1", name: "Graphic Design", icon: Palette, color: "#E91E63" },
  { id: "2", name: "Networking", icon: Network, color: "#2196F3" },
  { id: "3", name: "UI/UX Designing", icon: Figma, color: "#9C27B0" },
  { id: "4", name: "QA Testing", icon: Bug, color: "#4CAF50" },
  { id: "5", name: "DevOps", icon: Server, color: "#FF9800" },
  { id: "6", name: "Software Dev", icon: Code, color: "#00BCD4" },
  { id: "7", name: "Data Science", icon: Database, color: "#673AB7" },
  { id: "8", name: "Marketing", icon: TrendingUp, color: "#F44336" },
];

// Trending Companies Data
const trendingCompanies = [
  {
    id: "1",
    name: "WSO2",
    industry: "Software",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=WSO2&backgroundColor=FF6B35",
    jobs: 12,
  },
  {
    id: "2",
    name: "Epic Lanka",
    industry: "Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=EPIC&backgroundColor=4ECDC4",
    jobs: 8,
  },
  {
    id: "3",
    name: "Dialog",
    industry: "Telecom",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=DLG&backgroundColor=FF6384",
    jobs: 15,
  },
  {
    id: "4",
    name: "Virtusa",
    industry: "IT Services",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=VRT&backgroundColor=36A2EB",
    jobs: 20,
  },
  {
    id: "5",
    name: "IFS",
    industry: "Enterprise",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=IFS&backgroundColor=9966FF",
    jobs: 10,
  },
  {
    id: "6",
    name: "Sysco Labs",
    industry: "E-Commerce",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=SYS&backgroundColor=FF9F40",
    jobs: 7,
  },
  {
    id: "7",
    name: "Creative Soft",
    industry: "Design",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=CRS&backgroundColor=4BC0C0",
    jobs: 5,
  },
  {
    id: "8",
    name: "Millennium IT",
    industry: "Finance Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=MIT&backgroundColor=C9CBCF",
    jobs: 9,
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
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ width: CARD_WIDTH, backgroundColor: "#FFE8EC" }}
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

// Company Card Component
interface CompanyCardProps {
  company: (typeof trendingCompanies)[0];
  onPress: () => void;
}

const CompanyCard = ({ company, onPress }: CompanyCardProps) => (
  <TouchableOpacity
    className="rounded-2xl p-4 items-center shadow-sm"
    style={{ width: CARD_WIDTH, backgroundColor: "#FFE8EC" }}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image
      source={{ uri: company.logo }}
      className="w-14 h-14 rounded-xl mb-3"
    />
    <Text
      className="text-[15px] font-semibold text-gray-900 mb-1.5 text-center"
      numberOfLines={1}
    >
      {company.name}
    </Text>
    <View className="flex-row items-center gap-2">
      <Text
        className="text-xs font-medium px-2 py-1 rounded-lg"
        style={{ color: "#8B2635", backgroundColor: "rgba(139, 38, 53, 0.1)" }}
      >
        {company.industry}
      </Text>
      <Text className="text-xs text-gray-500">{company.jobs} jobs</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [expandedSection, setExpandedSection] = useState<
    "none" | "categories" | "companies"
  >("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleCategoryPress = (categoryId: string) => {
    // TODO: Navigate to jobs by category
    console.log("Category pressed:", categoryId);
  };

  const handleCompanyPress = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleBackFromCompany = () => {
    setSelectedCompany(null);
  };

  // Show company profile if a company is selected
  if (selectedCompany) {
    return (
      <CompanyProfile
        companyId={selectedCompany}
        onBack={handleBackFromCompany}
      />
    );
  }

  const toggleSection = (section: "categories" | "companies") => {
    setExpandedSection((prev) => (prev === section ? "none" : section));
  };

  const visibleCategories =
    expandedSection === "categories"
      ? jobCategories
      : jobCategories.slice(0, 4);

  const visibleCompanies =
    expandedSection === "companies"
      ? trendingCompanies
      : trendingCompanies.slice(0, 4);

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#8B2635", "#7D1F2E", "#6B1A27"]}
        className="pb-5"
      >
        <SafeAreaView edges={["top"]} className="px-4">
          {/* Top Row */}
          <View className="flex-row justify-between items-center pt-2 mb-4">
            <Text className="text-sm text-white/70 font-medium">Home Page</Text>
          </View>

          {/* Welcome Card */}
          <View className="flex-row items-center bg-white rounded-2xl p-4 shadow-lg">
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/png?seed=user123&backgroundColor=b6e3f4",
              }}
              className="w-14 h-14 rounded-full mr-3.5"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 mb-1">
                Welcome Abc Defgh,
              </Text>
              <Text className="text-sm text-gray-500">
                Let's build your career path!
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3.5 mb-6 border border-gray-200 gap-3">
          <Search size={20} color="#999" />
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Search jobs, companies..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Job Categories Section */}
        <View
          className={`mb-6 ${expandedSection === "companies" ? "mb-4" : ""}`}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Job Categories
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={() => toggleSection("categories")}
            >
              <Text className="text-sm text-gray-500 font-medium">
                {expandedSection === "categories" ? "See less" : "See more"}
              </Text>
              {expandedSection === "categories" ? (
                <ChevronDown size={16} color="#666" />
              ) : (
                <ChevronRight size={16} color="#666" />
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {visibleCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </View>
        </View>

        {/* Trending Companies Section */}
        <View
          className={`mb-6 ${expandedSection === "categories" ? "mb-4" : ""}`}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Trending Companies
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={() => toggleSection("companies")}
            >
              <Text className="text-sm text-gray-500 font-medium">
                {expandedSection === "companies" ? "See less" : "See more"}
              </Text>
              {expandedSection === "companies" ? (
                <ChevronDown size={16} color="#666" />
              ) : (
                <ChevronRight size={16} color="#666" />
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {visibleCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onPress={() => handleCompanyPress(company.id)}
              />
            ))}
          </View>
        </View>

        <View className="h-5" />
      </ScrollView>
    </View>
  );
}
