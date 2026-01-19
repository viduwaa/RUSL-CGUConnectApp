import CompanyProfile from "@/components/jobSeeker/company-profile";
import { useNavigationVisibility } from "@/hooks/use-navigation-visibility";
import { useRouter } from "expo-router";
import {
  Bug,
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
import React, { useCallback, useEffect, useState } from "react";
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

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2;
const CATEGORY_CARD_WIDTH = 100;

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
      className="rounded-2xl overflow-hidden shadow-sm mr-3"
      style={{ width: CATEGORY_CARD_WIDTH, backgroundColor: "#FFE8EC" }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="h-16 justify-center items-center bg-white/60">
        <IconComponent size={28} color={category.color} />
      </View>
      <View className="py-2 px-2" style={{ backgroundColor: category.color }}>
        <Text
          className="text-[11px] font-semibold text-white text-center"
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { setNavigationVisible } = useNavigationVisibility();

  // Hide navigation when viewing company profile
  useEffect(() => {
    setNavigationVisible(selectedCompany === null);
  }, [selectedCompany, setNavigationVisible]);

  // Navigate to category jobs page
  const handleCategoryPress = useCallback(
    (categoryId: string, categoryName: string) => {
      router.push(
        `/category-jobs?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`,
      );
    },
    [router],
  );

  const handleCompanyPress = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleBackFromCompany = () => {
    setSelectedCompany(null);
  };

  // Navigate to all categories page
  const handleSeeAllCategories = useCallback(() => {
    router.push("/all-categories");
  }, [router]);

  // Navigate to all companies page
  const handleSeeAllCompanies = useCallback(() => {
    router.push("/all-companies");
  }, [router]);

  // Show company profile if a company is selected
  if (selectedCompany) {
    return (
      <CompanyProfile
        companyId={selectedCompany}
        onBack={handleBackFromCompany}
      />
    );
  }

  const visibleCompanies = trendingCompanies.slice(0, 6);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Welcome Card */}
      <View className="bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center">
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
      </View>

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
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Job Categories
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={handleSeeAllCategories}
            >
              <Text className="text-sm text-gray-500 font-medium">
                See more
              </Text>
              <ChevronRight size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {jobCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id, category.name)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Trending Companies Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Trending Companies
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={handleSeeAllCompanies}
            >
              <Text className="text-sm text-gray-500 font-medium">
                See more
              </Text>
              <ChevronRight size={16} color="#666" />
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
