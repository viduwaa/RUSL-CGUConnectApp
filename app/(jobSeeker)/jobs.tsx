import { JobCard } from "@/components/jobSeeker/job-card";
import { JobFilterModal } from "@/components/jobSeeker/job-filter-modal";
import { mockJobs } from "@/data/mock-jobs";
import type { JobFilters } from "@/types/filter";
import { defaultJobFilters } from "@/types/filter";
import type { Job } from "@/types/job";
import { useRouter } from "expo-router";
import { Briefcase, Search, SlidersHorizontal, X } from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function JobsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] =
    useState<JobFilters>(defaultJobFilters);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return (
      activeFilters.contractTypes.length +
      (activeFilters.location.trim() ? 1 : 0)
    );
  }, [activeFilters]);

  // Filter jobs based on search query and active filters
  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.contractType.toLowerCase().includes(query),
      );
    }

    // Apply contract type filter
    if (activeFilters.contractTypes.length > 0) {
      result = result.filter((job) =>
        activeFilters.contractTypes.includes(job.contractType),
      );
    }

    // Apply location filter
    if (activeFilters.location.trim()) {
      const locationQuery = activeFilters.location.toLowerCase();
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationQuery),
      );
    }

    return result;
  }, [jobs, searchQuery, activeFilters]);

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

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Handle filter button press
  const handleFilterPress = useCallback(() => {
    setShowFilterModal(true);
  }, []);

  // Handle filter apply
  const handleApplyFilters = useCallback((filters: JobFilters) => {
    setActiveFilters(filters);
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

  // Key extractor for FlatList
  const keyExtractor = useCallback((item: Job) => item.id, []);

  // Empty list component
  const ListEmptyComponent = useMemo(
    () => (
      <View className="flex-1 items-center justify-center py-20">
        <Briefcase size={64} color="#d1d5db" />
        <Text className="text-lg font-semibold text-gray-400 mt-4">
          No jobs found
        </Text>
        <Text className="text-sm text-gray-400 mt-1">
          Try adjusting your search or filters
        </Text>
      </View>
    ),
    [],
  );

  // Header component
  const ListHeaderComponent = useMemo(
    () => (
      <View className="mb-2">
        <Text className="text-sm text-gray-500">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
          found
        </Text>
      </View>
    ),
    [filteredJobs.length],
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        {/* Title */}
        <Text className="text-xl font-bold text-gray-900 mb-3">
          Find Your Dream Job
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Search size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-base text-gray-800 ml-3"
              placeholder="Search jobs, companies..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={handleClearSearch} className="p-1">
                <X size={18} color="#9ca3af" />
              </Pressable>
            )}
          </View>

          {/* Filter Button with Badge */}
          <Pressable
            onPress={handleFilterPress}
            className="bg-[#8B2635] p-3.5 rounded-xl relative"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <SlidersHorizontal size={20} color="#fff" />
            {activeFilterCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-white rounded-full min-w-[18px] h-[18px] items-center justify-center border-2 border-[#8B2635]">
                <Text className="text-[10px] font-bold text-[#8B2635]">
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Job Cards List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={6}
      />

      {/* Filter Modal */}
      <JobFilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </View>
  );
}
