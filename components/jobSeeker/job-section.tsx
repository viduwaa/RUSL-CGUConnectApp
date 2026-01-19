import type { LucideIcon } from "lucide-react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface JobSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const JobSection = ({
  title,
  icon: Icon,
  children,
  collapsible = false,
  defaultExpanded = true,
}: JobSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const HeaderContent = () => (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        {Icon && (
          <View className="w-8 h-8 bg-[#8B2635]/10 rounded-lg items-center justify-center mr-3">
            <Icon size={18} color="#8B2635" />
          </View>
        )}
        <Text className="text-lg font-bold text-gray-900">{title}</Text>
      </View>
      {collapsible && (
        <View className="p-1">
          {isExpanded ? (
            <ChevronUp size={20} color="#6b7280" />
          ) : (
            <ChevronDown size={20} color="#6b7280" />
          )}
        </View>
      )}
    </View>
  );

  return (
    <View className="bg-white rounded-2xl mb-3 overflow-hidden shadow-sm border border-gray-50">
      {collapsible ? (
        <Pressable onPress={() => setIsExpanded(!isExpanded)} className="p-4">
          <HeaderContent />
        </Pressable>
      ) : (
        <View className="p-4">
          <HeaderContent />
        </View>
      )}

      {(!collapsible || isExpanded) && (
        <View className="px-4 pb-4">{children}</View>
      )}
    </View>
  );
};

// Bullet list component for requirements/responsibilities
interface BulletListProps {
  items: string[];
}

export const BulletList = ({ items }: BulletListProps) => {
  return (
    <View className="gap-3 mt-2">
      {items.map((item, index) => (
        <View key={index} className="flex-row">
          <View className="w-2 h-2 rounded-full bg-[#8B2635] mt-2 mr-3" />
          <Text className="flex-1 text-sm text-gray-600 leading-6">{item}</Text>
        </View>
      ))}
    </View>
  );
};

// Paragraph component for descriptions
interface ParagraphProps {
  text: string;
}

export const Paragraph = ({ text }: ParagraphProps) => {
  return <Text className="text-sm text-gray-600 leading-6 mt-2">{text}</Text>;
};

export default JobSection;
