import {
    ChevronDown,
    ChevronRight,
    Eye,
    EyeOff,
    Globe,
    Lock,
    Shield,
    UserX,
    Users,
} from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";

interface PrivacySettingsScreenProps {
  onBack: () => void;
}

export const PrivacySettingsScreen = ({
  onBack,
}: PrivacySettingsScreenProps) => {
  const [profileVisibility, setProfileVisibility] = useState<
    "public" | "connections" | "private"
  >("public");
  const [showProfileVisibilityOptions, setShowProfileVisibilityOptions] =
    useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showActivityStatus, setShowActivityStatus] = useState(true);

  const visibilityOptions = [
    {
      value: "public",
      label: "Public",
      description: "Anyone can view your profile",
    },
    {
      value: "connections",
      label: "Connections Only",
      description: "Only your connections can view",
    },
    {
      value: "private",
      label: "Private",
      description: "Only you can view your profile",
    },
  ] as const;

  const handleSave = () => {
    Alert.alert("Success", "Privacy settings saved successfully!");
  };

  const getVisibilityIcon = () => {
    switch (profileVisibility) {
      case "public":
        return <Globe size={20} color="#8B2635" />;
      case "connections":
        return <Users size={20} color="#8B2635" />;
      case "private":
        return <Lock size={20} color="#8B2635" />;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Visibility */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Profile Visibility
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          <Pressable
            onPress={() =>
              setShowProfileVisibilityOptions(!showProfileVisibilityOptions)
            }
            className="flex-row items-center p-4"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              {getVisibilityIcon()}
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Who can see your profile
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                {
                  visibilityOptions.find((o) => o.value === profileVisibility)
                    ?.label
                }
              </Text>
            </View>
            <ChevronDown
              size={20}
              color="#9ca3af"
              style={{
                transform: [
                  { rotate: showProfileVisibilityOptions ? "180deg" : "0deg" },
                ],
              }}
            />
          </Pressable>

          {showProfileVisibilityOptions && (
            <View className="border-t border-gray-100">
              {visibilityOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setProfileVisibility(option.value);
                    setShowProfileVisibilityOptions(false);
                  }}
                  className="flex-row items-center p-4 border-b border-gray-100"
                  style={{
                    backgroundColor:
                      profileVisibility === option.value
                        ? "rgba(139, 38, 53, 0.05)"
                        : "transparent",
                  }}
                >
                  <View className="flex-1">
                    <Text
                      className="text-base font-medium"
                      style={{
                        color:
                          profileVisibility === option.value
                            ? "#8B2635"
                            : "#111827",
                      }}
                    >
                      {option.label}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-0.5">
                      {option.description}
                    </Text>
                  </View>
                  {profileVisibility === option.value && (
                    <View
                      className="w-6 h-6 rounded-full items-center justify-center"
                      style={{ backgroundColor: "#8B2635" }}
                    >
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Contact Information */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Contact Information
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              {showEmail ? (
                <Eye size={20} color="#8B2635" />
              ) : (
                <EyeOff size={20} color="#8B2635" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Show Email Address
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Allow others to see your email
              </Text>
            </View>
            <Switch
              value={showEmail}
              onValueChange={setShowEmail}
              trackColor={{ false: "#d1d5db", true: "rgba(139, 38, 53, 0.4)" }}
              thumbColor={showEmail ? "#8B2635" : "#f4f3f4"}
            />
          </View>

          <View className="flex-row items-center p-4">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              {showPhone ? (
                <Eye size={20} color="#8B2635" />
              ) : (
                <EyeOff size={20} color="#8B2635" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Show Phone Number
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Allow others to see your phone
              </Text>
            </View>
            <Switch
              value={showPhone}
              onValueChange={setShowPhone}
              trackColor={{ false: "#d1d5db", true: "rgba(139, 38, 53, 0.4)" }}
              thumbColor={showPhone ? "#8B2635" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Activity & Status */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Activity & Status
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Shield size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Show Online Status
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Show when you're active
              </Text>
            </View>
            <Switch
              value={showOnlineStatus}
              onValueChange={setShowOnlineStatus}
              trackColor={{ false: "#d1d5db", true: "rgba(139, 38, 53, 0.4)" }}
              thumbColor={showOnlineStatus ? "#8B2635" : "#f4f3f4"}
            />
          </View>

          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Users size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Allow Messages
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Let employers message you
              </Text>
            </View>
            <Switch
              value={allowMessages}
              onValueChange={setAllowMessages}
              trackColor={{ false: "#d1d5db", true: "rgba(139, 38, 53, 0.4)" }}
              thumbColor={allowMessages ? "#8B2635" : "#f4f3f4"}
            />
          </View>

          <Pressable
            onPress={() =>
              Alert.alert("Blocked Users", "You haven't blocked any users")
            }
            className="flex-row items-center p-4"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            >
              <UserX size={20} color="#ef4444" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Blocked Users
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Manage blocked accounts
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
        </View>

        {/* Info */}
        <View className="bg-blue-50 rounded-xl p-4">
          <Text className="text-sm text-blue-700 leading-5">
            🔒 Your privacy is important. These settings control what
            information is visible to employers and other users on CGUConnect.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacySettingsScreen;
