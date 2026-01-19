import type { JobFilters } from "@/types/filter";
import { CONTRACT_TYPE_OPTIONS, defaultJobFilters } from "@/types/filter";
import type { ContractType } from "@/types/job";
import { X } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface JobFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: JobFilters) => void;
  initialFilters?: JobFilters;
}

export const JobFilterModal = ({
  visible,
  onClose,
  onApply,
  initialFilters = defaultJobFilters,
}: JobFilterModalProps) => {
  const insets = useSafeAreaInsets();
  const [selectedContractTypes, setSelectedContractTypes] = useState<
    ContractType[]
  >(initialFilters.contractTypes);
  const [locationFilter, setLocationFilter] = useState(initialFilters.location);

  // Toggle contract type selection
  const toggleContractType = useCallback((type: ContractType) => {
    setSelectedContractTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  // Clear all filters
  const handleClearAll = useCallback(() => {
    setSelectedContractTypes([]);
    setLocationFilter("");
  }, []);

  // Apply filters and close
  const handleApply = useCallback(() => {
    onApply({
      contractTypes: selectedContractTypes,
      location: locationFilter,
    });
    onClose();
  }, [selectedContractTypes, locationFilter, onApply, onClose]);

  // Reset state when modal opens with new initial filters
  React.useEffect(() => {
    if (visible) {
      setSelectedContractTypes(initialFilters.contractTypes);
      setLocationFilter(initialFilters.location);
    }
  }, [visible, initialFilters]);

  const activeFilterCount =
    selectedContractTypes.length + (locationFilter.trim() ? 1 : 0);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View
          className="bg-white rounded-t-3xl"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-900">Filter Jobs</Text>
            <Pressable
              onPress={onClose}
              className="p-2 -mr-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color="#6b7280" />
            </Pressable>
          </View>

          <ScrollView
            className="px-5 py-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Contract Type Section */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-3">
                Contract Type
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {CONTRACT_TYPE_OPTIONS.map((type) => {
                  const isSelected = selectedContractTypes.includes(type);
                  return (
                    <Pressable
                      key={type}
                      onPress={() => toggleContractType(type)}
                      className={`px-4 py-2.5 rounded-full border-2 ${
                        isSelected
                          ? "bg-[#8B2635] border-[#8B2635]"
                          : "bg-white border-gray-200"
                      }`}
                      style={({ pressed }) => ({
                        opacity: pressed ? 0.8 : 1,
                      })}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          isSelected ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {type}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Location Section */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-3">
                Location
              </Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3.5 text-base text-gray-800"
                placeholder="Enter city or region..."
                placeholderTextColor="#9ca3af"
                value={locationFilter}
                onChangeText={setLocationFilter}
              />
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View className="flex-row px-5 gap-3">
            {/* Clear All Button */}
            <Pressable
              onPress={handleClearAll}
              className="flex-1 py-4 rounded-xl border-2 border-gray-200"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-center text-gray-700 font-semibold text-base">
                Clear All
              </Text>
            </Pressable>

            {/* Apply Button */}
            <Pressable
              onPress={handleApply}
              className="flex-[2] py-4 rounded-xl bg-[#8B2635]"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-center text-white font-semibold text-base">
                Apply{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JobFilterModal;
