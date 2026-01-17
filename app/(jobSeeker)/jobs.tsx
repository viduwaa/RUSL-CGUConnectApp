import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowLeft,
    Briefcase,
    FileText,
    MapPin,
    SlidersHorizontal,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Job data type
interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
}

// Sample job data
const initialJobs: Job[] = [
  {
    id: "1",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "2",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "3",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "4",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "5",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "6",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "7",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
];

const moreJobs: Job[] = [
  {
    id: "8",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
  {
    id: "9",
    title: "Management Accountant",
    company: "Swis Group",
    type: "Contract",
    location: "Sri Lanka",
  },
];

// Company Logo Component
const CompanyLogo = () => (
  <View className="w-[50px] h-[50px] rounded-xl overflow-hidden mr-3.5">
    <LinearGradient
      colors={["#FF6B4A", "#FF4757", "#C0392B"]}
      className="w-full h-full justify-center items-center"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="w-7 h-7 justify-center items-center">
        <View
          className="w-4 h-6 rounded-lg"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            transform: [{ rotate: "-10deg" }],
          }}
        />
      </View>
    </LinearGradient>
  </View>
);

// Job Card Component
interface JobCardProps {
  job: Job;
  isAlternate: boolean;
}

const JobCard = ({ job, isAlternate }: JobCardProps) => (
  <View
    className={`rounded-2xl mb-3 shadow-sm ${isAlternate ? "bg-pink-50" : "bg-white"}`}
    style={isAlternate ? { backgroundColor: "#FFE8EC" } : {}}
  >
    <View className="flex-row p-4 items-center">
      <CompanyLogo />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 mb-2">
          {job.title}
        </Text>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <FileText size={14} color="#666" />
            <Text className="text-[13px] text-gray-500">{job.type}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MapPin size={14} color="#666" />
            <Text className="text-[13px] text-gray-500">{job.location}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default function JobsScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"my-jobs" | "post-job">("my-jobs");

  const displayedJobs = isExpanded
    ? [...initialJobs, ...moreJobs]
    : initialJobs;
  const headerTitle = isExpanded ? "More jobs" : "Jobs for you";

  const handleSearchMore = () => {
    setIsExpanded(true);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#8B2635", "#7D1F2E", "#6B1A27"]}
        className="pb-5"
      >
        <SafeAreaView edges={["top"]} className="px-4">
          {/* Top Row: Back Arrow & Avatar */}
          <View className="flex-row justify-between items-center pt-2 pb-4">
            <TouchableOpacity className="p-2 -ml-2">
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <View
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{ backgroundColor: "#64B5F6" }}
            >
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/png?seed=user123&backgroundColor=b6e3f4",
                }}
                className="w-full h-full"
              />
            </View>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center gap-3 mb-4">
            <View className="flex-1 flex-row items-center bg-white rounded-xl px-3.5 py-3 gap-2.5">
              <Briefcase size={20} color="#999" />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Search jobs..."
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity className="bg-white p-3.5 rounded-xl">
              <SlidersHorizontal size={20} color="#8B2635" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-white mt-1">
            {headerTitle}
          </Text>
        </SafeAreaView>
      </LinearGradient>

      {/* Navigation Tabs */}
      <View className="flex-row bg-white px-4 py-1 border-b border-gray-200">
        <TouchableOpacity
          className={`py-3.5 px-4 mr-2 ${activeTab === "my-jobs" ? "border-b-[3px]" : ""}`}
          style={
            activeTab === "my-jobs" ? { borderBottomColor: "#8B2635" } : {}
          }
          onPress={() => setActiveTab("my-jobs")}
        >
          <Text
            className={`text-[15px] font-medium ${activeTab === "my-jobs" ? "font-semibold" : "text-gray-500"}`}
            style={activeTab === "my-jobs" ? { color: "#8B2635" } : {}}
          >
            My jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-3.5 px-4 mr-2 ${activeTab === "post-job" ? "border-b-[3px]" : ""}`}
          style={
            activeTab === "post-job" ? { borderBottomColor: "#8B2635" } : {}
          }
          onPress={() => setActiveTab("post-job")}
        >
          <Text
            className={`text-[15px] font-medium ${activeTab === "post-job" ? "font-semibold" : "text-gray-500"}`}
            style={activeTab === "post-job" ? { color: "#8B2635" } : {}}
          >
            Post a job
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job Cards List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {displayedJobs.map((job, index) => (
          <JobCard key={job.id} job={job} isAlternate={index % 2 === 1} />
        ))}

        {/* Search for More Jobs Button - Only visible when not expanded */}
        {!isExpanded && (
          <TouchableOpacity
            className="rounded-xl py-4 items-center mt-2 mb-4 shadow-lg"
            style={{ backgroundColor: "#8B2635" }}
            onPress={handleSearchMore}
          >
            <Text className="text-white text-base font-semibold">
              Search for more jobs
            </Text>
          </TouchableOpacity>
        )}

        {/* Bottom padding */}
        <View className="h-5" />
      </ScrollView>
    </View>
  );
}
