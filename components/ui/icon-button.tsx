import type { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface IconButtonProps {
  icon: LucideIcon;
  size?: number;
  iconSize?: number;
  color?: string;
  activeColor?: string;
  isActive?: boolean;
  variant?: "default" | "filled" | "outlined" | "ghost";
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

export const IconButton = ({
  icon: Icon,
  size = 40,
  iconSize = 20,
  color = "#666",
  activeColor = "#8B2635",
  isActive = false,
  variant = "default",
  onPress,
  disabled = false,
  className = "",
}: IconButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return isActive
          ? "bg-[#8B2635] border border-[#8B2635]"
          : "bg-gray-100 border border-gray-200";
      case "outlined":
        return isActive
          ? "bg-[#8B2635]/10 border border-[#8B2635]"
          : "bg-transparent border border-gray-300";
      case "ghost":
        return "bg-transparent";
      default:
        return "bg-white shadow-sm border border-gray-100";
    }
  };

  const getIconColor = () => {
    if (variant === "filled" && isActive) return "#fff";
    return isActive ? activeColor : color;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center rounded-xl ${getVariantStyles()} ${className}`}
      style={{
        width: size,
        height: size,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {({ pressed }) => (
        <View style={{ opacity: pressed ? 0.7 : 1 }}>
          <Icon size={iconSize} color={getIconColor()} />
        </View>
      )}
    </Pressable>
  );
};

export default IconButton;
