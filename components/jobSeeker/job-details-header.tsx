import { ContractChip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import type { Job } from "@/types/job";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { CompanyLogo } from "./company-logo";

interface JobDetailsHeaderProps {
  job: Job;
  onBack: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

export const JobDetailsHeader = ({
  job,
  onBack,
  onShare,
  onBookmark,
}: JobDetailsHeaderProps) => {
  return (
    <View className="bg-white">
      {/* Action Buttons Row */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <IconButton
          icon={ArrowLeft}
          onPress={onBack}
          variant="ghost"
          size={44}
          iconSize={24}
          color="#374151"
        />
        <View className="flex-row gap-2">
          <IconButton
            icon={Share2}
            onPress={onShare}
            variant="outlined"
            size={44}
            iconSize={20}
            color="#374151"
          />
          <IconButton
            icon={Bookmark}
            onPress={onBookmark}
            variant={job.isBookmarked ? "filled" : "outlined"}
            isActive={job.isBookmarked}
            size={44}
            iconSize={20}
            color="#374151"
            activeColor="#8B2635"
          />
        </View>
      </View>

      {/* Company & Job Info */}
      <View className="px-4 pb-5">
        {/* Company Logo - Centered */}
        <View className="items-center mb-4">
          <CompanyLogo uri={job.companyLogo} size="xl" />
        </View>

        {/* Job Title */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          {job.title}
        </Text>

        {/* Company Name */}
        <Text className="text-base text-gray-600 text-center mb-4">
          {job.company}
        </Text>

        {/* Meta Info Pills */}
        <View className="flex-row flex-wrap justify-center gap-2">
          <View className="bg-gray-100 px-3 py-2 rounded-lg flex-row items-center">
            <Text className="text-sm text-gray-600">{job.location}</Text>
          </View>
          <ContractChip type={job.contractType} size="md" />
          {job.salary && (
            <View className="bg-emerald-50 px-3 py-2 rounded-lg">
              <Text className="text-sm text-emerald-700 font-medium">
                {job.salary}
              </Text>
            </View>
          )}
        </View>

        {/* Posted Date */}
        <Text className="text-sm text-gray-400 text-center mt-3">
          Posted {job.postedDate}
        </Text>
      </View>
    </View>
  );
};

export default JobDetailsHeader;
