import {
    ChevronRight,
    Code,
    ExternalLink,
    FileText,
    Globe,
    Heart,
    Shield,
    Users,
} from "lucide-react-native";
import React from "react";
import {
    Alert,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen = ({ onBack }: AboutScreenProps) => {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo & Info */}
        <View className="bg-white rounded-2xl border border-gray-100 p-6 items-center mb-6">
          <View
            className="w-24 h-24 rounded-3xl items-center justify-center mb-4"
            style={{ backgroundColor: "#8B2635" }}
          >
            <Text className="text-4xl font-bold text-white">CG</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900">CGUConnect</Text>
          <Text className="text-base text-gray-500 mt-1">
            Career Gateway for University Students
          </Text>
          <View className="flex-row items-center mt-3 gap-2">
            <Text className="text-sm text-gray-400">Version 1.0.0</Text>
            <View className="w-1 h-1 rounded-full bg-gray-300" />
            <Text className="text-sm text-gray-400">Build 2026.01.19</Text>
          </View>
        </View>

        {/* Mission */}
        <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <View className="flex-row items-center mb-3">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Heart size={20} color="#8B2635" />
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              Our Mission
            </Text>
          </View>
          <Text className="text-base text-gray-600 leading-6">
            CGUConnect bridges the gap between talented university students and
            leading employers in Sri Lanka. We're committed to helping graduates
            find meaningful career opportunities and enabling companies to
            discover exceptional talent.
          </Text>
        </View>

        {/* Stats */}
        <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Platform Statistics
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: "#8B2635" }}>
                50K+
              </Text>
              <Text className="text-sm text-gray-500">Students</Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: "#8B2635" }}>
                500+
              </Text>
              <Text className="text-sm text-gray-500">Companies</Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: "#8B2635" }}>
                10K+
              </Text>
              <Text className="text-sm text-gray-500">Jobs Posted</Text>
            </View>
          </View>
        </View>

        {/* Links */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Legal & Information
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          <Pressable
            onPress={() =>
              Alert.alert(
                "Terms of Service",
                "Full terms of service content would be displayed here.",
              )
            }
            className="flex-row items-center p-4 border-b border-gray-100"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <FileText size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Terms of Service
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Privacy Policy",
                "Full privacy policy content would be displayed here.",
              )
            }
            className="flex-row items-center p-4 border-b border-gray-100"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Shield size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Privacy Policy
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>

          <Pressable
            onPress={() => handleOpenLink("https://cguconnect.com")}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Globe size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Website
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                www.cguconnect.com
              </Text>
            </View>
            <ExternalLink size={20} color="#9ca3af" />
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Open Source Licenses",
                "List of open source libraries and their licenses.",
              )
            }
            className="flex-row items-center p-4"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Code size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Open Source Licenses
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
        </View>

        {/* Team */}
        <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <View className="flex-row items-center mb-3">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Users size={20} color="#8B2635" />
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              Our Team
            </Text>
          </View>
          <Text className="text-base text-gray-600 leading-6">
            CGUConnect is developed by a passionate team of engineers and
            designers at Rajarata University of Sri Lanka, dedicated to
            empowering the next generation of professionals.
          </Text>
        </View>

        {/* Footer */}
        <View className="items-center py-4">
          <Text className="text-sm text-gray-400">
            © 2026 CGUConnect. All rights reserved.
          </Text>
          <Text className="text-sm text-gray-400 mt-1">
            Made with ❤️ in Sri Lanka
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
