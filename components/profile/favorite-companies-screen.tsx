import {
    mockFavoriteCompanies,
    type FavoriteCompany,
} from "@/data/mock-profile-data";
import {
    Briefcase,
    Building2,
    Heart,
    HeartOff,
    MapPin,
    Users,
} from "lucide-react-native";
import React, { useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";

interface FavoriteCompaniesScreenProps {
  onBack: () => void;
}

const CompanyCard = ({
  company,
  onUnfollow,
  onPress,
}: {
  company: FavoriteCompany;
  onUnfollow: () => void;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
    style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
  >
    <View className="flex-row items-center">
      <Image source={{ uri: company.logo }} className="w-16 h-16 rounded-xl" />
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-gray-900">
          {company.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text
            className="text-xs font-medium px-2 py-0.5 rounded"
            style={{
              backgroundColor: "rgba(139, 38, 53, 0.1)",
              color: "#8B2635",
            }}
          >
            {company.industry}
          </Text>
        </View>
        <View className="flex-row items-center mt-1.5">
          <MapPin size={14} color="#9ca3af" />
          <Text className="text-sm text-gray-500 ml-1">{company.location}</Text>
        </View>
      </View>
    </View>

    <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-gray-100">
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center">
          <Briefcase size={16} color="#8B2635" />
          <Text className="text-sm text-gray-700 ml-1 font-medium">
            {company.openJobs} jobs
          </Text>
        </View>
        <View className="flex-row items-center">
          <Users size={16} color="#9ca3af" />
          <Text className="text-sm text-gray-500 ml-1">
            {company.followers} followers
          </Text>
        </View>
      </View>
      <Pressable
        onPress={onUnfollow}
        className="flex-row items-center px-3 py-1.5 rounded-lg"
        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
      >
        <HeartOff size={16} color="#ef4444" />
        <Text className="text-sm font-medium text-red-500 ml-1">Unfollow</Text>
      </Pressable>
    </View>
  </Pressable>
);

export const FavoriteCompaniesScreen = ({
  onBack,
}: FavoriteCompaniesScreenProps) => {
  const [companies, setCompanies] = useState<FavoriteCompany[]>(
    mockFavoriteCompanies,
  );

  const handleUnfollow = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    Alert.alert(
      "Unfollow Company",
      `Are you sure you want to unfollow ${company?.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unfollow",
          style: "destructive",
          onPress: () => {
            setCompanies((prev) => prev.filter((c) => c.id !== companyId));
          },
        },
      ],
    );
  };

  const handleCompanyPress = (company: FavoriteCompany) => {
    Alert.alert(
      company.name,
      `${company.industry} company with ${company.openJobs} open positions.\n\n${company.followers} followers`,
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Summary Card */}
      <View className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-gray-100 flex-row items-center">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
        >
          <Heart size={24} color="#8B2635" />
        </View>
        <View>
          <Text className="text-2xl font-bold text-gray-900">
            {companies.length}
          </Text>
          <Text className="text-sm text-gray-500">Companies Following</Text>
        </View>
      </View>

      {/* Company List */}
      <FlatList
        data={companies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CompanyCard
            company={item}
            onUnfollow={() => handleUnfollow(item.id)}
            onPress={() => handleCompanyPress(item)}
          />
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Building2 size={40} color="#8B2635" />
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              No favorite companies
            </Text>
            <Text className="text-sm text-gray-500 text-center mt-1 px-8">
              Follow companies to get updates on new job postings
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default FavoriteCompaniesScreen;
