import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Bell,
    Building2,
    Camera,
    Check,
    ChevronRight,
    Edit3,
    Globe,
    HelpCircle,
    Info,
    Lock,
    LogOut,
    Mail,
    MapPin,
    Phone,
    Users,
    X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Profile Field Component
interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
  editable?: boolean;
}

const ProfileField = ({
  icon,
  label,
  value,
  onEdit,
  editable = true,
}: ProfileFieldProps) => (
  <View className="flex-row items-center py-3">
    <View
      className="w-9 h-9 rounded-xl justify-center items-center mr-3"
      style={{ backgroundColor: "rgba(139, 38, 53, 0.08)" }}
    >
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-400 mb-0.5">{label}</Text>
      <Text className="text-[15px] text-gray-900 font-medium">{value}</Text>
    </View>
    {editable && onEdit && (
      <TouchableOpacity
        className="p-2 rounded-lg"
        style={{ backgroundColor: "rgba(139, 38, 53, 0.08)" }}
        onPress={onEdit}
      >
        <Edit3 size={16} color="#8B2635" />
      </TouchableOpacity>
    )}
  </View>
);

// Settings Item Component
interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

const SettingsItem = ({
  icon,
  label,
  hasToggle,
  toggleValue,
  onToggle,
  onPress,
}: SettingsItemProps) => (
  <TouchableOpacity
    className="flex-row items-center justify-between bg-white py-3.5 px-4 rounded-xl mb-2"
    onPress={onPress}
    disabled={hasToggle}
  >
    <View className="flex-row items-center gap-3">
      <View
        className="w-9 h-9 rounded-xl justify-center items-center"
        style={{ backgroundColor: "rgba(139, 38, 53, 0.08)" }}
      >
        {icon}
      </View>
      <Text className="text-[15px] text-gray-900 font-medium">{label}</Text>
    </View>
    {hasToggle ? (
      <Switch
        value={toggleValue}
        onValueChange={onToggle}
        trackColor={{ false: "#E0E0E0", true: "#FFCDD2" }}
        thumbColor={toggleValue ? "#8B2635" : "#fff"}
      />
    ) : (
      <ChevronRight size={20} color="#999" />
    )}
  </TouchableOpacity>
);

// Edit Modal Component
interface EditModalProps {
  visible: boolean;
  title: string;
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "url";
}

const EditModal = ({
  visible,
  title,
  value,
  onClose,
  onSave,
  multiline,
  keyboardType = "default",
}: EditModalProps) => {
  const [inputValue, setInputValue] = useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value, visible]);

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center p-6"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="bg-white rounded-2xl p-6 w-full max-w-[360px]">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-gray-900">
              Edit {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-medium text-gray-500 mb-2">
            {title}
          </Text>
          <TextInput
            className={`border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-gray-50 ${multiline ? "h-[100px]" : ""}`}
            style={multiline ? { textAlignVertical: "top" } : {}}
            value={inputValue}
            onChangeText={setInputValue}
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
            keyboardType={keyboardType}
            autoFocus
          />

          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              className="flex-1 py-3.5 rounded-xl bg-gray-100 items-center"
              onPress={onClose}
            >
              <Text className="text-[15px] font-semibold text-gray-500">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row gap-1.5 py-3.5 rounded-xl items-center justify-center"
              style={{ backgroundColor: "#8B2635" }}
              onPress={handleSave}
            >
              <Check size={18} color="#fff" />
              <Text className="text-[15px] font-semibold text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default function EmployerSettingsScreen() {
  const router = useRouter();

  // Company Profile State
  const [profile, setProfile] = useState({
    companyName: "Tech Solutions Lanka",
    registrationNo: "PV00123456",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=TSL&backgroundColor=8B2635",
    industry: "Information Technology & Services",
    companySize: "50-200 employees",
    address: "123 Galle Road, Colombo 03, Sri Lanka",
    phone: "+94 11 234 5678",
    email: "hr@techsolutions.lk",
    website: "www.techsolutions.lk",
  });

  // Settings State
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Modal States
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editModal, setEditModal] = useState<{
    visible: boolean;
    field: string;
    value: string;
    multiline?: boolean;
    keyboardType?: "default" | "email-address" | "phone-pad" | "url";
  }>({ visible: false, field: "", value: "" });

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.replace("/(auth)" as any);
  };

  const openEditModal = (
    field: string,
    value: string,
    multiline = false,
    keyboardType: "default" | "email-address" | "phone-pad" | "url" = "default",
  ) => {
    setEditModal({ visible: true, field, value, multiline, keyboardType });
  };

  const handleSaveField = (newValue: string) => {
    const fieldMap: Record<string, keyof typeof profile> = {
      "Company Name": "companyName",
      Industry: "industry",
      "Company Size": "companySize",
      Address: "address",
      Phone: "phone",
      Email: "email",
      Website: "website",
    };

    const profileKey = fieldMap[editModal.field];
    if (profileKey) {
      setProfile((prev) => ({ ...prev, [profileKey]: newValue }));
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header */}
      <LinearGradient
        colors={["#8B2635", "#7D1F2E", "#6B1A27"]}
        className="pb-4"
      >
        <SafeAreaView edges={["top"]} className="px-4">
          <View className="flex-row items-center justify-between pt-2">
            <TouchableOpacity
              className="p-2 -ml-2"
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">
              Company Profile
            </Text>
            <View className="w-10" />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Logo Section */}
        <View className="items-center py-6 bg-white mb-4">
          <View className="relative mb-3">
            <Image
              source={{ uri: profile.logo }}
              className="w-[100px] h-[100px] rounded-2xl border-[3px]"
              style={{ borderColor: "#FFE8EC" }}
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full justify-center items-center border-2 border-white"
              style={{ backgroundColor: "#8B2635" }}
            >
              <Camera size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="text-[22px] font-bold text-gray-900 mb-1">
            {profile.companyName}
          </Text>
          <Text className="text-sm text-gray-500">
            {profile.registrationNo}
          </Text>
        </View>

        {/* Company Information Card */}
        <View className="bg-white mx-4 mb-4 rounded-2xl p-4 shadow-sm">
          <Text className="text-[17px] font-bold text-gray-900 mb-4">
            Company Information
          </Text>

          <ProfileField
            icon={<Building2 size={20} color="#8B2635" />}
            label="Company Name"
            value={profile.companyName}
            onEdit={() => openEditModal("Company Name", profile.companyName)}
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Users size={20} color="#8B2635" />}
            label="Industry"
            value={profile.industry}
            onEdit={() => openEditModal("Industry", profile.industry)}
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Users size={20} color="#8B2635" />}
            label="Company Size"
            value={profile.companySize}
            onEdit={() => openEditModal("Company Size", profile.companySize)}
          />
        </View>

        {/* Contact Information Card */}
        <View className="bg-white mx-4 mb-4 rounded-2xl p-4 shadow-sm">
          <Text className="text-[17px] font-bold text-gray-900 mb-4">
            Contact Information
          </Text>

          <ProfileField
            icon={<MapPin size={20} color="#8B2635" />}
            label="Address"
            value={profile.address}
            onEdit={() => openEditModal("Address", profile.address, true)}
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Phone size={20} color="#8B2635" />}
            label="Phone"
            value={profile.phone}
            onEdit={() =>
              openEditModal("Phone", profile.phone, false, "phone-pad")
            }
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Mail size={20} color="#8B2635" />}
            label="Email"
            value={profile.email}
            onEdit={() =>
              openEditModal("Email", profile.email, false, "email-address")
            }
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Globe size={20} color="#8B2635" />}
            label="Website"
            value={profile.website}
            onEdit={() =>
              openEditModal("Website", profile.website, false, "url")
            }
          />
        </View>

        {/* Account Settings */}
        <View className="mx-4 mb-4">
          <Text className="text-[17px] font-bold text-gray-900 mb-3">
            Settings
          </Text>

          <SettingsItem
            icon={<Bell size={20} color="#8B2635" />}
            label="Push Notifications"
            hasToggle
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />

          <SettingsItem
            icon={<Mail size={20} color="#8B2635" />}
            label="Email Notifications"
            hasToggle
            toggleValue={emailNotifications}
            onToggle={setEmailNotifications}
          />

          <SettingsItem
            icon={<Lock size={20} color="#8B2635" />}
            label="Privacy Settings"
            onPress={() => {}}
          />

          <SettingsItem
            icon={<Info size={20} color="#8B2635" />}
            label="About"
            onPress={() => {}}
          />

          <SettingsItem
            icon={<HelpCircle size={20} color="#8B2635" />}
            label="Help & Support"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 mx-4 py-4 rounded-xl bg-white border"
          style={{ borderColor: "#E53935" }}
          onPress={() => setShowLogoutModal(true)}
        >
          <LogOut size={20} color="#E53935" />
          <Text
            className="text-base font-semibold"
            style={{ color: "#E53935" }}
          >
            Log Out
          </Text>
        </TouchableOpacity>

        <View className="h-5" />
      </ScrollView>

      {/* Edit Modal */}
      <EditModal
        visible={editModal.visible}
        title={editModal.field}
        value={editModal.value}
        onClose={() => setEditModal((prev) => ({ ...prev, visible: false }))}
        onSave={handleSaveField}
        multiline={editModal.multiline}
        keyboardType={editModal.keyboardType}
      />

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View
          className="flex-1 justify-center items-center p-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="bg-white rounded-2xl p-6 w-full max-w-[320px] items-center">
            <TouchableOpacity
              className="absolute top-4 right-4 p-1"
              onPress={() => setShowLogoutModal(false)}
            >
              <X size={20} color="#666" />
            </TouchableOpacity>

            <View
              className="w-16 h-16 rounded-full justify-center items-center mb-4"
              style={{ backgroundColor: "rgba(229, 57, 53, 0.1)" }}
            >
              <LogOut size={32} color="#E53935" />
            </View>

            <Text className="text-xl font-bold text-gray-900 mb-2">
              Log Out?
            </Text>
            <Text className="text-sm text-gray-500 text-center mb-6 leading-5">
              Are you sure you want to log out of your company account?
            </Text>

            <View className="flex-row gap-3 w-full">
              <TouchableOpacity
                className="flex-1 py-3.5 rounded-xl bg-gray-100 items-center"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-[15px] font-semibold text-gray-500">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3.5 rounded-xl items-center"
                style={{ backgroundColor: "#E53935" }}
                onPress={handleLogout}
              >
                <Text className="text-[15px] font-semibold text-white">
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
