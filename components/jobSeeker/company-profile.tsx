import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowLeft,
    Briefcase,
    Building2,
    ChevronRight,
    Clock,
    Globe,
    Heart,
    MapPin,
    Share2,
    Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Company data mapping
const companiesData: Record<
  string,
  {
    name: string;
    industry: string;
    logo: string;
    cover: string;
    description: string;
    employees: string;
    location: string;
    website: string;
    founded: string;
  }
> = {
  "1": {
    name: "WSO2",
    industry: "Software",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=WSO2&backgroundColor=FF6B35",
    cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description:
      "WSO2 is an open-source technology provider, offering an enterprise platform for integrations, APIs, and identity management.",
    employees: "1000+",
    location: "Colombo, Sri Lanka",
    website: "wso2.com",
    founded: "2005",
  },
  "2": {
    name: "Epic Lanka",
    industry: "Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=EPIC&backgroundColor=4ECDC4",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    description:
      "Epic Lanka is a leading technology solutions provider specializing in digital transformation and enterprise solutions.",
    employees: "200+",
    location: "Colombo, Sri Lanka",
    website: "epiclanka.net",
    founded: "2010",
  },
  "3": {
    name: "Dialog",
    industry: "Telecom",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=DLG&backgroundColor=FF6384",
    cover: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
    description:
      "Dialog Axiata PLC is Sri Lanka's largest mobile telecommunications service provider, offering voice, data, and digital services.",
    employees: "5000+",
    location: "Colombo, Sri Lanka",
    website: "dialog.lk",
    founded: "1995",
  },
  "4": {
    name: "Virtusa",
    industry: "IT Services",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=VRT&backgroundColor=36A2EB",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    description:
      "Virtusa is a global provider of digital strategy, digital engineering, and IT services that help clients transform their businesses.",
    employees: "2000+",
    location: "Colombo, Sri Lanka",
    website: "virtusa.com",
    founded: "1996",
  },
  "5": {
    name: "IFS",
    industry: "Enterprise",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=IFS&backgroundColor=9966FF",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    description:
      "IFS develops and delivers enterprise software for customers around the world who manufacture and distribute goods, build and maintain assets.",
    employees: "800+",
    location: "Colombo, Sri Lanka",
    website: "ifs.com",
    founded: "1983",
  },
  "6": {
    name: "Sysco Labs",
    industry: "E-Commerce",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=SYS&backgroundColor=FF9F40",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    description:
      "Sysco LABS is the technology arm of Sysco Corporation, building next-generation technology solutions for the foodservice industry.",
    employees: "500+",
    location: "Colombo, Sri Lanka",
    website: "syscolabs.com",
    founded: "2015",
  },
  "7": {
    name: "Creative Soft",
    industry: "Design",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=CRS&backgroundColor=4BC0C0",
    cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    description:
      "Creative Software is a leading software development company providing innovative solutions for businesses across various industries.",
    employees: "300+",
    location: "Colombo, Sri Lanka",
    website: "creativesoftware.com",
    founded: "2000",
  },
  "8": {
    name: "Millennium IT",
    industry: "Finance Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=MIT&backgroundColor=C9CBCF",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    description:
      "Millennium IT is a global technology company specializing in trading systems and financial market infrastructure solutions.",
    employees: "400+",
    location: "Colombo, Sri Lanka",
    website: "millenniumit.com",
    founded: "1996",
  },
};

// Sample jobs for company
const companyJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "DevOps Engineer",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    type: "Contract",
    posted: "3 days ago",
  },
  {
    id: "4",
    title: "Product Manager",
    type: "Full-time",
    posted: "5 days ago",
  },
];

// Props for CompanyProfile
interface CompanyProfileProps {
  companyId: string;
  onBack: () => void;
}

export default function CompanyProfile({
  companyId,
  onBack,
}: CompanyProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const company = companiesData[companyId] || companiesData["1"];

  return (
    <View className="flex-1 bg-neutral-100 absolute inset-0 z-50">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header */}
      <LinearGradient colors={["#8B2635", "#7D1F2E"]} className="pb-3">
        <SafeAreaView edges={["top"]} className="px-4">
          <View className="flex-row items-center justify-between pt-2">
            <TouchableOpacity className="p-2 -ml-2" onPress={onBack}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-white">
              Company Profile
            </Text>
            <TouchableOpacity className="p-2">
              <Share2 size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image
          source={{ uri: company.cover }}
          className="w-full h-40 bg-neutral-300"
        />

        {/* Company Info Card */}
        <View className="bg-white mx-4 -mt-10 rounded-2xl p-5 items-center shadow-lg">
          <View className="-mt-12 mb-3 rounded-2xl p-1 bg-white shadow-md">
            <Image
              source={{ uri: company.logo }}
              className="w-20 h-20 rounded-2xl"
            />
          </View>

          <Text className="text-2xl font-bold text-neutral-900 mb-1">
            {company.name}
          </Text>
          <Text className="text-[15px] text-[#8B2635] font-medium mb-4">
            {company.industry}
          </Text>

          <View className="flex-row items-center mb-5">
            <View className="flex-row items-center gap-1.5">
              <Users size={18} color="#8B2635" />
              <Text className="text-sm text-neutral-500">
                {company.employees}
              </Text>
            </View>
            <View className="w-px h-5 bg-neutral-200 mx-4" />
            <View className="flex-row items-center gap-1.5">
              <MapPin size={18} color="#8B2635" />
              <Text className="text-sm text-neutral-500">
                {company.location}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 w-full">
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#8B2635] ${isFollowing ? "bg-[#8B2635]" : ""}`}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Heart
                size={18}
                color={isFollowing ? "#fff" : "#8B2635"}
                fill={isFollowing ? "#fff" : "transparent"}
              />
              <Text
                className={`text-[15px] font-semibold ${isFollowing ? "text-white" : "text-[#8B2635]"}`}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl bg-[#8B2635]/10">
              <Globe size={18} color="#8B2635" />
              <Text className="text-sm font-medium text-[#8B2635]">
                {company.website}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View className="mt-5 px-4">
          <Text className="text-lg font-bold text-neutral-900 mb-3">About</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-[15px] leading-6 text-neutral-600 mb-4">
              {company.description}
            </Text>

            <View className="flex-row gap-5">
              <View className="flex-row items-center gap-2">
                <Building2 size={16} color="#666" />
                <Text className="text-[13px] text-neutral-400">Industry</Text>
                <Text className="text-sm font-medium text-neutral-700">
                  {company.industry}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Clock size={16} color="#666" />
                <Text className="text-[13px] text-neutral-400">Founded</Text>
                <Text className="text-sm font-medium text-neutral-700">
                  {company.founded}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Current Openings Section */}
        <View className="mt-5 px-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-lg font-bold text-neutral-900">
              Current Openings
            </Text>
            <View className="bg-[#8B2635] rounded-lg px-2.5 py-1">
              <Text className="text-xs font-semibold text-white">
                {companyJobs.length}
              </Text>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 shadow-sm">
            {companyJobs.map((job, index) => (
              <TouchableOpacity
                key={job.id}
                className={`flex-row items-center justify-between py-3.5 ${index < companyJobs.length - 1 ? "border-b border-neutral-100" : ""}`}
              >
                <View className="flex-row items-center flex-1 gap-3">
                  <Briefcase size={18} color="#8B2635" />
                  <View className="flex-1">
                    <Text className="text-[15px] font-semibold text-neutral-900 mb-1">
                      {job.title}
                    </Text>
                    <Text className="text-[13px] text-neutral-500">
                      {job.type} • {job.posted}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
