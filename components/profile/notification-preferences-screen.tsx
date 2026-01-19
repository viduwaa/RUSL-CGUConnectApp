import {
    mockNotificationPreferences,
    type NotificationPreference,
} from "@/data/mock-profile-data";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, Switch, Text, View } from "react-native";

interface NotificationPreferencesScreenProps {
  onBack: () => void;
}

const getCategoryIcon = (category: NotificationPreference["category"]) => {
  switch (category) {
    case "push":
      return Smartphone;
    case "email":
      return Mail;
    case "sms":
      return MessageSquare;
    default:
      return Bell;
  }
};

export const NotificationPreferencesScreen = ({
  onBack,
}: NotificationPreferencesScreenProps) => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(
    mockNotificationPreferences,
  );

  const handleToggle = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      ),
    );
  };

  const pushNotifications = preferences.filter((p) => p.category === "push");
  const emailNotifications = preferences.filter((p) => p.category === "email");

  const handleSave = () => {
    Alert.alert("Success", "Notification preferences saved successfully!");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Push Notifications Section */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Push Notifications
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          {pushNotifications.map((pref, index) => {
            const Icon = getCategoryIcon(pref.category);
            return (
              <View
                key={pref.id}
                className={`flex-row items-center p-4 ${
                  index < pushNotifications.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
                >
                  <Icon size={20} color="#8B2635" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-900">
                    {pref.title}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    {pref.description}
                  </Text>
                </View>
                <Switch
                  value={pref.enabled}
                  onValueChange={() => handleToggle(pref.id)}
                  trackColor={{
                    false: "#d1d5db",
                    true: "rgba(139, 38, 53, 0.4)",
                  }}
                  thumbColor={pref.enabled ? "#8B2635" : "#f4f3f4"}
                />
              </View>
            );
          })}
        </View>

        {/* Email Notifications Section */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Email Notifications
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          {emailNotifications.map((pref, index) => {
            const Icon = getCategoryIcon(pref.category);
            return (
              <View
                key={pref.id}
                className={`flex-row items-center p-4 ${
                  index < emailNotifications.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
                >
                  <Icon size={20} color="#8B2635" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-900">
                    {pref.title}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    {pref.description}
                  </Text>
                </View>
                <Switch
                  value={pref.enabled}
                  onValueChange={() => handleToggle(pref.id)}
                  trackColor={{
                    false: "#d1d5db",
                    true: "rgba(139, 38, 53, 0.4)",
                  }}
                  thumbColor={pref.enabled ? "#8B2635" : "#f4f3f4"}
                />
              </View>
            );
          })}
        </View>

        {/* Info */}
        <View className="bg-blue-50 rounded-xl p-4">
          <Text className="text-sm text-blue-700 leading-5">
            💡 Keep notifications enabled to stay updated on job opportunities,
            application status, and messages from employers.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationPreferencesScreen;
