import type { LucideIcon } from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface MenuItemProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  onPress?: () => void;
  showChevron?: boolean;
  destructive?: boolean;
  rightElement?: React.ReactNode;
}

export const MenuItem = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = "#8B2635",
  onPress,
  showChevron = true,
  destructive = false,
  rightElement,
}: MenuItemProps) => {
  const textColor = destructive ? "text-red-600" : "text-gray-900";
  const finalIconColor = destructive ? "#DC2626" : iconColor;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-3.5 bg-white"
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#f9fafb" : "#fff",
      })}
    >
      {/* Icon Container */}
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mr-3"
        style={{ backgroundColor: `${finalIconColor}15` }}
      >
        <Icon size={22} color={finalIconColor} />
      </View>

      {/* Text Content */}
      <View className="flex-1">
        <Text className={`text-base font-medium ${textColor}`}>{title}</Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-0.5">{subtitle}</Text>
        )}
      </View>

      {/* Right Element or Chevron */}
      {rightElement ? (
        rightElement
      ) : showChevron ? (
        <ChevronRight size={20} color="#9ca3af" />
      ) : null}
    </Pressable>
  );
};

// Menu Section Component
interface MenuSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const MenuSection = ({ title, children }: MenuSectionProps) => {
  return (
    <View className="mb-4">
      {title && (
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-4 mb-2">
          {title}
        </Text>
      )}
      <View className="bg-white rounded-2xl overflow-hidden border border-gray-100 mx-4">
        {children}
      </View>
    </View>
  );
};

// Divider between menu items
export const MenuDivider = () => <View className="h-px bg-gray-100 ml-16" />;

export default MenuItem;
