import { JobCard } from "@/components/jobSeeker/job-card";
import { mockJobs } from "@/data/mock-jobs";
import type { Job } from "@/types/job";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    Briefcase,
    Bug,
    Code,
    Database,
    Figma,
    Network,
    Palette,
    Server,
    TrendingUp,
} from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function CategoryJobsScreen() {
  const router = useRouter();
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
  }>();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  // Get category data
  const category = useMemo(
    () => jobCategories.find((c) => c.id === categoryId),
    [categoryId],
  );

  // Filter jobs based on category
  const filteredJobs = useMemo(() => {
    if (!category) return [];

    return jobs.filter((job) => {
      const searchText =
        `${job.title} ${job.description} ${job.company}`.toLowerCase();
      return category.keywords.some((keyword) =>
        searchText.includes(keyword.toLowerCase()),
      );
    });
  }, [category, jobs]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }, [router]);

  // Handle job card press - navigate to details
  const handleJobPress = useCallback(
    (job: Job) => {
      router.push(`/job-details?id=${job.id}`);
    },
    [router],
  );

  // Handle bookmark toggle
  const handleBookmark = useCallback((jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job,
      ),
    );
  }, []);

  // Render job card
  const renderJobCard = useCallback(
    ({ item }: { item: Job }) => (
      <JobCard
        job={item}
        onPress={handleJobPress}
        onBookmark={handleBookmark}
      />
    ),
    [handleJobPress, handleBookmark],
  );

  const IconComponent = category?.icon || Briefcase;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center">
          <Pressable
            onPress={handleBack}
            className="p-2 -ml-2 rounded-full"
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <ArrowLeft size={24} color="#1f2937" />
          </Pressable>
          <View
            className="w-10 h-10 rounded-xl items-center justify-center ml-2"
            style={{ backgroundColor: `${category?.color}20` }}
          >
            <IconComponent size={22} color={category?.color || "#666"} />
          </View>
          <View className="ml-3">
            <Text className="text-xl font-bold text-gray-900">
              {categoryName || category?.name || "Jobs"}
            </Text>
            <Text className="text-sm text-gray-500">
              {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
              available
            </Text>
          </View>
        </View>
      </View>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Briefcase size={64} color="#d1d5db" />
            <Text className="text-lg font-semibold text-gray-400 mt-4">
              No jobs found
            </Text>
            <Text className="text-sm text-gray-400 mt-1 text-center px-10">
              There are no jobs in this category at the moment. Check back
              later!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
