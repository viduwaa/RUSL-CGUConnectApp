import { mockSavedJobs } from "@/data/mock-profile-data";
import type { Job } from "@/types/job";
import { useRouter } from "expo-router";
import { Bookmark, BookmarkX, Briefcase, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";

interface SavedJobsScreenProps {
  onBack: () => void;
}

const SavedJobCard = ({
  job,
  onPress,
  onRemove,
}: {
  job: Job;
  onPress: () => void;
  onRemove: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
    style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
  >
    <View className="flex-row">
      <Image
        source={{
          uri: `https://api.dicebear.com/7.x/initials/png?seed=${job.company}&backgroundColor=8B2635`,
        }}
        className="w-14 h-14 rounded-xl"
      />
      <View className="flex-1 ml-3">
        <Text
          className="text-base font-semibold text-gray-900"
          numberOfLines={1}
        >
          {job.title}
        </Text>
        <Text className="text-sm text-gray-600 mt-0.5">{job.company}</Text>
        <View className="flex-row items-center mt-1">
          <MapPin size={14} color="#9ca3af" />
          <Text className="text-sm text-gray-400 ml-1">{job.location}</Text>
        </View>
      </View>
      <Pressable
        onPress={onRemove}
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
      >
        <BookmarkX size={20} color="#ef4444" />
      </Pressable>
    </View>

    <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
      <View className="flex-row items-center gap-2">
        <View
          className="px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
        >
          <Text className="text-xs font-medium" style={{ color: "#8B2635" }}>
            {job.contractType}
          </Text>
        </View>
        {job.salary && (
          <Text className="text-sm text-gray-600">{job.salary}</Text>
        )}
      </View>
      <Text className="text-xs text-gray-400">{job.postedDate}</Text>
    </View>
  </Pressable>
);

export const SavedJobsScreen = ({ onBack }: SavedJobsScreenProps) => {
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<Job[]>(mockSavedJobs);

  const handleRemoveJob = (jobId: string) => {
    Alert.alert(
      "Remove Saved Job",
      "Are you sure you want to remove this job from your saved list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
          },
        },
      ],
    );
  };

  const handleJobPress = (job: Job) => {
    router.push(`/job-details?id=${job.id}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Summary Card */}
      <View className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-gray-100 flex-row items-center">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
        >
          <Bookmark size={24} color="#8B2635" />
        </View>
        <View>
          <Text className="text-2xl font-bold text-gray-900">
            {savedJobs.length}
          </Text>
          <Text className="text-sm text-gray-500">Saved Jobs</Text>
        </View>
      </View>

      {/* Job List */}
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SavedJobCard
            job={item}
            onPress={() => handleJobPress(item)}
            onRemove={() => handleRemoveJob(item.id)}
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
              <Briefcase size={40} color="#8B2635" />
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              No saved jobs
            </Text>
            <Text className="text-sm text-gray-500 text-center mt-1 px-8">
              Jobs you bookmark will appear here for easy access
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default SavedJobsScreen;
