import type { ContractType } from "@/types/job";
import React from "react";
import { Text, View } from "react-native";

interface ChipProps {
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "info";
  size?: "sm" | "md";
}

// Contract type to variant mapping
const contractTypeVariants: Record<ContractType, ChipProps["variant"]> = {
  "Full-time": "primary",
  "Part-time": "info",
  Contract: "warning",
  Internship: "success",
};

// Variant styles
const variantStyles = {
  default: {
    container: "bg-gray-100",
    text: "text-gray-700",
  },
  primary: {
    container: "bg-[#8B2635]/10",
    text: "text-[#8B2635]",
  },
  success: {
    container: "bg-emerald-100",
    text: "text-emerald-700",
  },
  warning: {
    container: "bg-amber-100",
    text: "text-amber-700",
  },
  info: {
    container: "bg-blue-100",
    text: "text-blue-700",
  },
};

const sizeStyles = {
  sm: {
    container: "px-2 py-0.5 rounded-md",
    text: "text-[10px]",
  },
  md: {
    container: "px-3 py-1 rounded-lg",
    text: "text-xs",
  },
};

export const Chip = ({
  label,
  variant = "default",
  size = "md",
}: ChipProps) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <View className={`${variantStyle.container} ${sizeStyle.container}`}>
      <Text className={`${variantStyle.text} ${sizeStyle.text} font-semibold`}>
        {label}
      </Text>
    </View>
  );
};

// Helper component for contract type chips
interface ContractChipProps {
  type: ContractType;
  size?: "sm" | "md";
}

export const ContractChip = ({ type, size = "md" }: ContractChipProps) => {
  return <Chip label={type} variant={contractTypeVariants[type]} size={size} />;
};

export default Chip;
