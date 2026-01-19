import { ContractChip } from "@/components/ui/chip";
import type { Job } from "@/types/job";
import { Bookmark, Clock, DollarSign, MapPin } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { CompanyLogo } from "./company-logo";

interface JobCardProps {
  job: Job;
  onPress?: (job: Job) => void;
  onBookmark?: (jobId: string) => void;
}

export const JobCard = ({ job, onPress, onBookmark }: JobCardProps) => {
  return (
    <Pressable
      onPress={() => onPress?.(job)}
      className="bg-white rounded-2xl mb-3 shadow-sm border border-gray-100 overflow-hidden"
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
        opacity: pressed ? 0.95 : 1,
      })}
    >
      <View className="p-4">
        {/* Top Row: Logo, Title, Bookmark */}
        <View className="flex-row">
          {/* Company Logo */}
          <View className="mr-3">
            <CompanyLogo uri={job.companyLogo} size="md" />
          </View>

          {/* Job Info */}
          <View className="flex-1 mr-2">
            <Text
              className="text-base font-bold text-gray-900 mb-1"
              numberOfLines={2}
            >
              {job.title}
            </Text>
            <Text className="text-sm text-gray-600 mb-2">{job.company}</Text>

            {/* Location & Contract Type */}
            <View className="flex-row items-center flex-wrap gap-2">
              <View className="flex-row items-center">
                <MapPin size={14} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">
                  {job.location}
                </Text>
              </View>
              <ContractChip type={job.contractType} size="sm" />
            </View>
          </View>

          {/* Bookmark Button */}
          <Pressable
            onPress={() => onBookmark?.(job.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="p-1"
          >
            <Bookmark
              size={22}
              color={job.isBookmarked ? "#8B2635" : "#9ca3af"}
              fill={job.isBookmarked ? "#8B2635" : "transparent"}
            />
          </Pressable>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-100 my-3" />

        {/* Bottom Row: Salary, Posted Time, Description Preview */}
        <View>
          {/* Salary & Posted Time */}
          <View className="flex-row items-center justify-between mb-2">
            {job.salary && (
              <View className="flex-row items-center">
                <DollarSign size={14} color="#059669" />
                <Text className="text-sm font-semibold text-emerald-600 ml-1">
                  {job.salary}
                </Text>
              </View>
            )}
            <View className="flex-row items-center">
              <Clock size={12} color="#9ca3af" />
              <Text className="text-xs text-gray-400 ml-1">
                {job.postedDate}
              </Text>
            </View>
          </View>

          {/* Description Preview */}
          <Text className="text-sm text-gray-500 leading-5" numberOfLines={2}>
            {job.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default JobCard;
