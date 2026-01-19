import React from "react";
import { Text, View } from "react-native";

interface NotificationBadgeProps {
  count: number;
  size?: "sm" | "md";
  maxCount?: number;
}

export const NotificationBadge = ({
  count,
  size = "sm",
  maxCount = 99,
}: NotificationBadgeProps) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const sizeStyles = {
    sm: {
      container: "min-w-[18px] h-[18px] px-1",
      text: "text-[10px]",
    },
    md: {
      container: "min-w-[22px] h-[22px] px-1.5",
      text: "text-xs",
    },
  };

  const styles = sizeStyles[size];

  return (
    <View
      className={`absolute -top-1 -right-1 bg-red-500 rounded-full items-center justify-center ${styles.container}`}
    >
      <Text className={`text-white font-bold ${styles.text}`}>
        {displayCount}
      </Text>
    </View>
  );
};

export default NotificationBadge;
