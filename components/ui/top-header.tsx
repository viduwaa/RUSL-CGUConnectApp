import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationBadge } from "./notification-badge";
import { ProfileAvatar } from "./profile-avatar";

interface TopHeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

export const TopHeader = ({
  userName = "User",
  userAvatar,
  notificationCount = 0,
}: TopHeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNotificationPress = () => {
    router.push("/(jobSeeker)/notifications");
  };

  const handleProfilePress = () => {
    router.push("/(jobSeeker)/profile");
  };

  return (
    <View className="bg-[#8B2635]" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-4 h-[56px]">
        {/* Left Side - Notification Button */}
        <Pressable
          onPress={handleNotificationPress}
          className="relative p-2"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Bell size={24} color="#fff" />
          <NotificationBadge count={notificationCount} size="sm" />
        </Pressable>

        {/* Right Side - Profile Avatar */}
        <ProfileAvatar
          uri={userAvatar}
          name={userName}
          size="xl"
          onPress={handleProfilePress}
          showBorder
        />
      </View>
    </View>
  );
};

export default TopHeader;
