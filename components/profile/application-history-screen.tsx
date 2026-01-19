import {
    mockApplications,
    type JobApplication,
} from "@/data/mock-profile-data";
import { useRouter } from "expo-router";
import {
    Briefcase,
    Calendar,
    CheckCircle,
    ChevronRight,
    Clock,
    Eye,
    FileText,
    XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

interface ApplicationHistoryScreenProps {
  onBack: () => void;
}

const getStatusConfig = (status: JobApplication["status"]) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)",
        icon: Clock,
      };
    case "reviewing":
      return {
        label: "Under Review",
        color: "#3b82f6",
        bgColor: "rgba(59, 130, 246, 0.1)",
        icon: Eye,
      };
    case "interview":
      return {
        label: "Interview",
        color: "#8B2635",
        bgColor: "rgba(139, 38, 53, 0.1)",
        icon: Calendar,
      };
    case "offered":
      return {
        label: "Offered",
        color: "#10b981",
        bgColor: "rgba(16, 185, 129, 0.1)",
        icon: CheckCircle,
      };
    case "rejected":
      return {
        label: "Not Selected",
        color: "#ef4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        icon: XCircle,
      };
    default:
      return {
        label: "Unknown",
        color: "#6b7280",
        bgColor: "rgba(107, 114, 128, 0.1)",
        icon: FileText,
      };
  }
};

const ApplicationCard = ({
  application,
  onPress,
}: {
  application: JobApplication;
  onPress: () => void;
}) => {
  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      <View className="flex-row items-start">
        <Image
          source={{ uri: application.companyLogo }}
          className="w-14 h-14 rounded-xl"
        />
        <View className="flex-1 ml-3">
          <Text
            className="text-base font-semibold text-gray-900"
            numberOfLines={1}
          >
            {application.jobTitle}
          </Text>
          <Text className="text-sm text-gray-600 mt-0.5">
            {application.company}
          </Text>
          <View className="flex-row items-center mt-2">
            <View
              className="flex-row items-center px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: statusConfig.bgColor }}
            >
              <StatusIcon size={14} color={statusConfig.color} />
              <Text
                className="text-xs font-semibold ml-1"
                style={{ color: statusConfig.color }}
              >
                {statusConfig.label}
              </Text>
            </View>
          </View>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </View>

      <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <Calendar size={14} color="#9ca3af" />
          <Text className="text-sm text-gray-500 ml-1">
            Applied: {application.appliedDate}
          </Text>
        </View>
        <Text className="text-xs text-gray-400">
          Updated: {application.statusDate}
        </Text>
      </View>
    </Pressable>
  );
};

export const ApplicationHistoryScreen = ({
  onBack,
}: ApplicationHistoryScreenProps) => {
  const router = useRouter();
  const [applications] = useState<JobApplication[]>(mockApplications);
  const [filter, setFilter] = useState<"all" | JobApplication["status"]>("all");

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  const handleApplicationPress = (application: JobApplication) => {
    onBack();
    setTimeout(() => {
      router.push(`/job-details?id=${application.jobId}`);
    }, 100);
  };

  const filterOptions: {
    label: string;
    value: "all" | JobApplication["status"];
  }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Reviewing", value: "reviewing" },
    { label: "Interview", value: "interview" },
    { label: "Offered", value: "offered" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Stats */}
      <View className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-gray-100 flex-row justify-around">
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-900">
            {applications.length}
          </Text>
          <Text className="text-xs text-gray-500">Total</Text>
        </View>
        <View className="w-px bg-gray-200" />
        <View className="items-center">
          <Text className="text-2xl font-bold" style={{ color: "#8B2635" }}>
            {applications.filter((a) => a.status === "interview").length}
          </Text>
          <Text className="text-xs text-gray-500">Interview</Text>
        </View>
        <View className="w-px bg-gray-200" />
        <View className="items-center">
          <Text className="text-2xl font-bold text-green-600">
            {applications.filter((a) => a.status === "offered").length}
          </Text>
          <Text className="text-xs text-gray-500">Offered</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-4 pt-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterOptions}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setFilter(item.value)}
              className="px-4 py-2 rounded-full mr-2"
              style={{
                backgroundColor:
                  filter === item.value ? "#8B2635" : "rgba(139, 38, 53, 0.1)",
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: filter === item.value ? "#fff" : "#8B2635" }}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Application List */}
      <FlatList
        data={filteredApplications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ApplicationCard
            application={item}
            onPress={() => handleApplicationPress(item)}
          />
        )}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 8,
          paddingBottom: 40,
        }}
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
              No applications
            </Text>
            <Text className="text-sm text-gray-500 text-center mt-1 px-8">
              {filter === "all"
                ? "Start applying to jobs to track your applications here"
                : `No applications with "${filter}" status`}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ApplicationHistoryScreen;
