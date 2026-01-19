import CompanyProfile from "@/components/jobSeeker/company-profile";
import { useNavigationVisibility } from "@/hooks/use-navigation-visibility";
import { useRouter } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2;

// All Trending Companies Data
const allCompanies = [
  {
    id: "1",
    name: "WSO2",
    industry: "Software",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=WSO2&backgroundColor=FF6B35",
    jobs: 12,
    description: "Leading open-source software company",
  },
  {
    id: "2",
    name: "Epic Lanka",
    industry: "Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=EPIC&backgroundColor=4ECDC4",
    jobs: 8,
    description: "Technology solutions provider",
  },
  {
    id: "3",
    name: "Dialog",
    industry: "Telecom",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=DLG&backgroundColor=FF6384",
    jobs: 15,
    description: "Sri Lanka's leading telecom provider",
  },
  {
    id: "4",
    name: "Virtusa",
    industry: "IT Services",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=VRT&backgroundColor=36A2EB",
    jobs: 20,
    description: "Global IT consulting and outsourcing",
  },
  {
    id: "5",
    name: "IFS",
    industry: "Enterprise",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=IFS&backgroundColor=9966FF",
    jobs: 10,
    description: "Enterprise software solutions",
  },
  {
    id: "6",
    name: "Sysco Labs",
    industry: "E-Commerce",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=SYS&backgroundColor=FF9F40",
    jobs: 7,
    description: "Technology arm of Sysco Corporation",
  },
  {
    id: "7",
    name: "Creative Soft",
    industry: "Design",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=CRS&backgroundColor=4BC0C0",
    jobs: 5,
    description: "Creative digital agency",
  },
  {
    id: "8",
    name: "Millennium IT",
    industry: "Finance Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=MIT&backgroundColor=C9CBCF",
    jobs: 9,
    description: "Financial technology solutions",
  },
  {
    id: "9",
    name: "Calcey",
    industry: "Software",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=CAL&backgroundColor=6366F1",
    jobs: 11,
    description: "Custom software development",
  },
  {
    id: "10",
    name: "Zone24x7",
    industry: "Retail Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=Z24&backgroundColor=EC4899",
    jobs: 6,
    description: "Retail technology innovators",
  },
  {
    id: "11",
    name: "Pearson Lanka",
    industry: "Education",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=PRS&backgroundColor=14B8A6",
    jobs: 4,
    description: "Global education company",
  },
  {
    id: "12",
    name: "hSenid",
    industry: "HR Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=HSN&backgroundColor=F97316",
    jobs: 8,
    description: "HR technology solutions",
  },
];

// Company Card Component
interface CompanyCardProps {
  company: (typeof allCompanies)[0];
  onPress: () => void;
}

const CompanyCard = ({ company, onPress }: CompanyCardProps) => (
  <TouchableOpacity
    className="rounded-2xl p-4 items-center shadow-sm bg-white border border-gray-100"
    style={{ width: CARD_WIDTH }}
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
    <View className="flex-row items-center gap-2 mb-2">
      <Text
        className="text-xs font-medium px-2 py-1 rounded-lg"
        style={{ color: "#8B2635", backgroundColor: "rgba(139, 38, 53, 0.1)" }}
      >
        {company.industry}
      </Text>
    </View>
    <Text className="text-xs text-gray-500">{company.jobs} open positions</Text>
  </TouchableOpacity>
);

export default function AllCompaniesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { setNavigationVisible } = useNavigationVisibility();

  // Hide navigation when viewing company profile
  useEffect(() => {
    setNavigationVisible(selectedCompany === null);
  }, [selectedCompany, setNavigationVisible]);

  // Filter companies based on search query
  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return allCompanies;

    const query = searchQuery.toLowerCase();
    return allCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // Handle company selection
  const handleCompanyPress = useCallback((companyId: string) => {
    setSelectedCompany(companyId);
  }, []);

  // Handle back from company profile
  const handleBackFromCompany = useCallback(() => {
    setSelectedCompany(null);
  }, []);

  // Show company profile if a company is selected
  if (selectedCompany) {
    return (
      <CompanyProfile
        companyId={selectedCompany}
        onBack={handleBackFromCompany}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
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
          Trending Companies
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 text-base text-gray-800 ml-3"
            placeholder="Search companies..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Companies Grid */}
      <FlatList
        data={filteredCompanies}
        renderItem={({ item }) => (
          <CompanyCard
            company={item}
            onPress={() => handleCompanyPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-3">
            <Text className="text-sm text-gray-500">
              {filteredCompanies.length}{" "}
              {filteredCompanies.length === 1 ? "company" : "companies"} found
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <Text className="text-gray-400 text-base">No companies found</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Try adjusting your search
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
