import { User } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ProfileAvatarProps {
  uri?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onPress?: () => void;
  showBorder?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 32,
    text: "text-xs",
    icon: 16,
  },
  md: {
    container: 40,
    text: "text-sm",
    icon: 20,
  },
  lg: {
    container: 56,
    text: "text-lg",
    icon: 28,
  },
  xl: {
    container: 96,
    text: "text-3xl",
    icon: 48,
  },
};

// Get initials from name
const getInitials = (name?: string): string => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Generate a background color based on name
const getBackgroundColor = (name?: string): string => {
  const colors = [
    "#EF4444", // red
    "#F97316", // orange
    "#EAB308", // yellow
    "#22C55E", // green
    "#14B8A6", // teal
    "#3B82F6", // blue
    "#8B5CF6", // violet
    "#EC4899", // pink
  ];

  if (!name) return colors[0];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const ProfileAvatar = ({
  uri,
  name,
  size = "md",
  onPress,
  showBorder = false,
  className = "",
}: ProfileAvatarProps) => {
  const config = sizeConfig[size];
  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);

  const AvatarContent = () => {
    // Always show initials or icon as base, image will overlay if available
    const FallbackContent = () => {
      if (name) {
        return (
          <View
            style={{ backgroundColor: bgColor, width: "100%", height: "100%" }}
            className="items-center justify-center"
          >
            <Text className={`text-white font-bold ${config.text}`}>
              {initials}
            </Text>
          </View>
        );
      }
      return (
        <View className="w-full h-full items-center justify-center bg-gray-300">
          <User size={config.icon} color="#6b7280" />
        </View>
      );
    };

    if (uri) {
      return (
        <View style={{ width: "100%", height: "100%" }}>
          <FallbackContent />
          <Image
            source={{ uri }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
        </View>
      );
    }

    return <FallbackContent />;
  };

  const containerStyle = {
    width: config.container,
    height: config.container,
    borderRadius: config.container / 2,
    overflow: "hidden" as const,
    borderWidth: showBorder ? 3 : 0,
    borderColor: "#fff",
    backgroundColor: "#e5e7eb", // Default gray background
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={className}
        style={({ pressed }) => [
          containerStyle,
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: config.container / 2,
            overflow: "hidden",
          }}
        >
          <AvatarContent />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={containerStyle} className={className}>
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: config.container / 2,
          overflow: "hidden",
        }}
      >
        <AvatarContent />
      </View>
    </View>
  );
};

export default ProfileAvatar;
