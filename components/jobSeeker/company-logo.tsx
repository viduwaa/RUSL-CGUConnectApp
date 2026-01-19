import { LinearGradient } from "expo-linear-gradient";
import { Building2 } from "lucide-react-native";
import React from "react";
import { Image, View } from "react-native";

interface CompanyLogoProps {
  uri?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallbackIcon?: boolean;
}

const sizeConfig = {
  sm: {
    container: 48,
    icon: 20,
    radius: 12,
  },
  md: {
    container: 56,
    icon: 24,
    radius: 14,
  },
  lg: {
    container: 72,
    icon: 32,
    radius: 18,
  },
  xl: {
    container: 96,
    icon: 40,
    radius: 24,
  },
};

// Generate a consistent color based on company name or random
const getGradientColors = (seed?: string): [string, string, string] => {
  const gradients: [string, string, string][] = [
    ["#FF6B4A", "#FF4757", "#C0392B"], // Red-orange
    ["#667eea", "#764ba2", "#6B3FA0"], // Purple
    ["#11998e", "#38ef7d", "#2ECC71"], // Green
    ["#F2994A", "#F2C94C", "#E67E22"], // Orange-yellow
    ["#4FACFE", "#00F2FE", "#3498DB"], // Blue
    ["#FA709A", "#FEE140", "#E91E63"], // Pink-yellow
    ["#a8edea", "#fed6e3", "#74b9ff"], // Pastel
    ["#667eea", "#f093fb", "#9b59b6"], // Purple-pink
  ];

  if (seed) {
    const index = seed.charCodeAt(0) % gradients.length;
    return gradients[index];
  }

  return gradients[Math.floor(Math.random() * gradients.length)];
};

export const CompanyLogo = ({
  uri,
  size = "md",
  fallbackIcon = true,
}: CompanyLogoProps) => {
  const config = sizeConfig[size];
  const gradientColors = getGradientColors(uri);

  // If URI is provided, try to show image
  if (uri && uri.startsWith("http")) {
    return (
      <View
        style={{
          width: config.container,
          height: config.container,
          borderRadius: config.radius,
          overflow: "hidden",
          backgroundColor: "#f3f4f6",
        }}
      >
        <Image
          source={{ uri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Fallback gradient with icon
  return (
    <View
      style={{
        width: config.container,
        height: config.container,
        borderRadius: config.radius,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {fallbackIcon && (
          <Building2 size={config.icon} color="rgba(255,255,255,0.9)" />
        )}
      </LinearGradient>
    </View>
  );
};

export default CompanyLogo;
