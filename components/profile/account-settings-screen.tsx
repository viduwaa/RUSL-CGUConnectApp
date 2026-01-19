import { mockUser } from "@/data/mock-user";
import {
    ChevronRight,
    Eye,
    EyeOff,
    Key,
    Shield,
    Smartphone,
    Trash2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

interface AccountSettingsScreenProps {
  onBack: () => void;
}

export const AccountSettingsScreen = ({
  onBack,
}: AccountSettingsScreenProps) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }
    Alert.alert("Success", "Password changed successfully!", [
      {
        text: "OK",
        onPress: () => {
          setShowChangePassword(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirm Deletion",
              "Type 'DELETE' to confirm account deletion",
            );
          },
        },
      ],
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Info */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Account Information
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-sm text-gray-500">Email</Text>
            <Text className="text-base font-medium text-gray-900 mt-1">
              {mockUser.email}
            </Text>
          </View>
          <View className="p-4">
            <Text className="text-sm text-gray-500">Account Created</Text>
            <Text className="text-base font-medium text-gray-900 mt-1">
              December 15, 2025
            </Text>
          </View>
        </View>

        {/* Security Section */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Security
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          {/* Change Password */}
          <Pressable
            onPress={() => setShowChangePassword(!showChangePassword)}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Key size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Change Password
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Update your account password
              </Text>
            </View>
            <ChevronRight
              size={20}
              color="#9ca3af"
              style={{
                transform: [{ rotate: showChangePassword ? "90deg" : "0deg" }],
              }}
            />
          </Pressable>

          {/* Password Change Form */}
          {showChangePassword && (
            <View className="p-4 bg-gray-50 border-b border-gray-100">
              {/* Current Password */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600 mb-2">
                  Current Password
                </Text>
                <View className="flex-row items-center bg-white rounded-xl border border-gray-200">
                  <TextInput
                    className="flex-1 px-4 py-3 text-base"
                    placeholder="Enter current password"
                    secureTextEntry={!showCurrentPassword}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                  />
                  <Pressable
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="px-3"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} color="#9ca3af" />
                    ) : (
                      <Eye size={20} color="#9ca3af" />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* New Password */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600 mb-2">New Password</Text>
                <View className="flex-row items-center bg-white rounded-xl border border-gray-200">
                  <TextInput
                    className="flex-1 px-4 py-3 text-base"
                    placeholder="Enter new password"
                    secureTextEntry={!showNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <Pressable
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    className="px-3"
                  >
                    {showNewPassword ? (
                      <EyeOff size={20} color="#9ca3af" />
                    ) : (
                      <Eye size={20} color="#9ca3af" />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Confirm Password */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600 mb-2">
                  Confirm New Password
                </Text>
                <View className="flex-row items-center bg-white rounded-xl border border-gray-200">
                  <TextInput
                    className="flex-1 px-4 py-3 text-base"
                    placeholder="Confirm new password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </View>

              {/* Save Button */}
              <Pressable
                onPress={handleChangePassword}
                className="py-3 rounded-xl items-center"
                style={{ backgroundColor: "#8B2635" }}
              >
                <Text className="text-white font-semibold">
                  Update Password
                </Text>
              </Pressable>
            </View>
          )}

          {/* Two-Factor Authentication */}
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Smartphone size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Two-Factor Authentication
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Add extra security to your account
              </Text>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: "#d1d5db", true: "rgba(139, 38, 53, 0.4)" }}
              thumbColor={twoFactorEnabled ? "#8B2635" : "#f4f3f4"}
            />
          </View>

          {/* Active Sessions */}
          <Pressable
            onPress={() =>
              Alert.alert("Active Sessions", "You are logged in on 2 devices")
            }
            className="flex-row items-center p-4"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Shield size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Active Sessions
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Manage your logged in devices
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
        </View>

        {/* Danger Zone */}
        <Text className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-3">
          Danger Zone
        </Text>
        <View className="bg-white rounded-2xl border border-red-200 mb-6">
          <Pressable
            onPress={handleDeleteAccount}
            className="flex-row items-center p-4"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            >
              <Trash2 size={20} color="#ef4444" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-red-600">
                Delete Account
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Permanently delete your account and data
              </Text>
            </View>
            <ChevronRight size={20} color="#ef4444" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountSettingsScreen;
