import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Bell,
    BookOpen,
    Camera,
    Check,
    ChevronRight,
    Download,
    Edit3,
    Eye,
    FileText,
    GraduationCap,
    HelpCircle,
    Info,
    Lock,
    LogOut,
    Mail,
    MapPin,
    Paperclip,
    Phone,
    Upload,
    User,
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

// Document Card Component
interface DocumentCardProps {
  document: {
    id: string;
    name: string;
    type: string;
    size: string;
    date: string;
  };
  onView: () => void;
  onDownload: () => void;
  onUpdate?: () => void;
}

const DocumentCard = ({
  document,
  onView,
  onDownload,
  onUpdate,
}: DocumentCardProps) => (
  <View className="flex-row items-center py-3">
    <View className="w-11 h-11 rounded-xl bg-gray-100 justify-center items-center mr-3">
      {document.name.endsWith(".pdf") ? (
        <FileText size={24} color="#E53935" />
      ) : (
        <Paperclip size={24} color="#2196F3" />
      )}
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-400 mb-0.5">{document.type}</Text>
      <Text className="text-sm text-gray-900 font-medium mb-0.5">
        {document.name}
      </Text>
      <Text className="text-xs text-gray-400">
        {document.size} • {document.date}
      </Text>
    </View>
    <View className="flex-row gap-1">
      <TouchableOpacity
        className="w-8 h-8 rounded-lg border justify-center items-center"
        style={{ borderColor: "#8B2635" }}
        onPress={onView}
      >
        <Eye size={16} color="#8B2635" />
      </TouchableOpacity>
      <TouchableOpacity
        className="w-8 h-8 rounded-lg border justify-center items-center"
        style={{ borderColor: "#8B2635" }}
        onPress={onDownload}
      >
        <Download size={16} color="#8B2635" />
      </TouchableOpacity>
      {onUpdate && (
        <TouchableOpacity
          className="w-8 h-8 rounded-lg border justify-center items-center"
          style={{ borderColor: "#8B2635" }}
          onPress={onUpdate}
        >
          <Upload size={16} color="#8B2635" />
        </TouchableOpacity>
      )}
    </View>
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
  keyboardType?: "default" | "email-address" | "phone-pad";
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

// Gender Selection Modal
interface GenderModalProps {
  visible: boolean;
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const GenderModal = ({ visible, value, onClose, onSave }: GenderModalProps) => {
  const [selected, setSelected] = useState(value);
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

  React.useEffect(() => {
    setSelected(value);
  }, [value, visible]);

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center p-6"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="bg-white rounded-2xl p-6 w-full max-w-[360px]">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-gray-900">
              Select Gender
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View className="gap-2 mb-2">
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                className={`flex-row items-center p-4 rounded-xl border ${selected === option ? "border-[#8B2635]" : "border-gray-200"} bg-white`}
                style={
                  selected === option
                    ? { backgroundColor: "rgba(139, 38, 53, 0.05)" }
                    : {}
                }
                onPress={() => setSelected(option)}
              >
                <View
                  className={`w-[22px] h-[22px] rounded-full border-2 mr-3 justify-center items-center ${selected === option ? "border-[#8B2635]" : "border-gray-200"}`}
                >
                  {selected === option && (
                    <View
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "#8B2635" }}
                    />
                  )}
                </View>
                <Text
                  className={`text-base ${selected === option ? "font-semibold" : ""}`}
                  style={
                    selected === option
                      ? { color: "#8B2635" }
                      : { color: "#1A1A1A" }
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
      </View>
    </Modal>
  );
};

export default function SettingsScreen() {
  const router = useRouter();

  // Profile State
  const [profile, setProfile] = useState({
    name: "Abcd Efgh",
    studentId: "ENG/2020/001",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=abcd&backgroundColor=b6e3f4",
    qualifications: "BSc. Engineering (Hons) - Computer Science",
    gender: "Male",
    address: "Rajarata, Mihintale, Anuradhapura",
    phone: "+94 77 123 4567",
    email: "abcdefgh123@gmail.com",
  });

  // Documents State
  const [documents] = useState([
    {
      id: "1",
      name: "PDC_Report_2024.docx",
      type: "Professional Development Credits",
      size: "245 KB",
      date: "Jan 10, 2024",
    },
    {
      id: "2",
      name: "Abcd_Efgh_CV_2024.pdf",
      type: "Uploaded CV",
      size: "512 KB",
      date: "Dec 28, 2023",
    },
  ]);

  // Settings State
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Modal States
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editModal, setEditModal] = useState<{
    visible: boolean;
    field: string;
    value: string;
    type: "text" | "gender" | "email" | "phone";
    multiline?: boolean;
  }>({ visible: false, field: "", value: "", type: "text" });

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.replace("/(auth)");
  };

  const openEditModal = (
    field: string,
    value: string,
    type: "text" | "gender" | "email" | "phone" = "text",
    multiline = false,
  ) => {
    setEditModal({ visible: true, field, value, type, multiline });
  };

  const handleSaveField = (newValue: string) => {
    const fieldMap: Record<string, keyof typeof profile> = {
      "Full Name": "name",
      Qualifications: "qualifications",
      Gender: "gender",
      Address: "address",
      "Contact No": "phone",
      "E-mail": "email",
    };

    const profileKey = fieldMap[editModal.field];
    if (profileKey) {
      setProfile((prev) => ({ ...prev, [profileKey]: newValue }));
    }
  };

  const getKeyboardType = (
    type: string,
  ): "default" | "email-address" | "phone-pad" => {
    switch (type) {
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      default:
        return "default";
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
            <Text className="text-xl font-bold text-white">My Profile</Text>
            <View className="w-10" />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar Section */}
        <View className="items-center py-6 bg-white mb-4">
          <View className="relative mb-3">
            <Image
              source={{ uri: profile.avatar }}
              className="w-[100px] h-[100px] rounded-full border-[3px]"
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
            {profile.name}
          </Text>
          <Text className="text-sm text-gray-500">{profile.studentId}</Text>
        </View>

        {/* Personal Information Card */}
        <View className="bg-white mx-4 mb-4 rounded-2xl p-4 shadow-sm">
          <Text className="text-[17px] font-bold text-gray-900 mb-4">
            Personal Information
          </Text>

          <ProfileField
            icon={<User size={20} color="#8B2635" />}
            label="Full Name"
            value={profile.name}
            onEdit={() => openEditModal("Full Name", profile.name)}
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<GraduationCap size={20} color="#8B2635" />}
            label="Student ID"
            value={profile.studentId}
            editable={false}
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<BookOpen size={20} color="#8B2635" />}
            label="Qualifications"
            value={profile.qualifications}
            onEdit={() =>
              openEditModal(
                "Qualifications",
                profile.qualifications,
                "text",
                true,
              )
            }
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Users size={20} color="#8B2635" />}
            label="Gender"
            value={profile.gender + " ✓"}
            onEdit={() => openEditModal("Gender", profile.gender, "gender")}
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
            onEdit={() =>
              openEditModal("Address", profile.address, "text", true)
            }
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Phone size={20} color="#8B2635" />}
            label="Contact No"
            value={profile.phone}
            onEdit={() => openEditModal("Contact No", profile.phone, "phone")}
          />
          <View className="h-px bg-gray-100 ml-12" />

          <ProfileField
            icon={<Mail size={20} color="#8B2635" />}
            label="E-mail"
            value={profile.email}
            onEdit={() => openEditModal("E-mail", profile.email, "email")}
          />
        </View>

        {/* Documents Card */}
        <View className="bg-white mx-4 mb-4 rounded-2xl p-4 shadow-sm">
          <Text className="text-[17px] font-bold text-gray-900 mb-4">
            Documents
          </Text>

          {documents.map((doc, index) => (
            <React.Fragment key={doc.id}>
              <DocumentCard
                document={doc}
                onView={() => {}}
                onDownload={() => {}}
                onUpdate={doc.type === "Uploaded CV" ? () => {} : undefined}
              />
              {index < documents.length - 1 && (
                <View className="h-px bg-gray-100 ml-12" />
              )}
            </React.Fragment>
          ))}

          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 mt-4 py-3 rounded-xl border"
            style={{ borderColor: "#8B2635", borderStyle: "dashed" }}
          >
            <Upload size={18} color="#8B2635" />
            <Text className="text-sm font-medium" style={{ color: "#8B2635" }}>
              Upload New Document
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View className="mx-4 mb-4">
          <Text className="text-[17px] font-bold text-gray-900 mb-3">
            Account Settings
          </Text>

          <SettingsItem
            icon={<Bell size={20} color="#8B2635" />}
            label="Notifications"
            hasToggle
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
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

      {/* Edit Text Modal */}
      {editModal.type !== "gender" && (
        <EditModal
          visible={editModal.visible}
          title={editModal.field}
          value={editModal.value}
          onClose={() => setEditModal((prev) => ({ ...prev, visible: false }))}
          onSave={handleSaveField}
          multiline={editModal.multiline}
          keyboardType={getKeyboardType(editModal.type)}
        />
      )}

      {/* Gender Selection Modal */}
      <GenderModal
        visible={editModal.visible && editModal.type === "gender"}
        value={editModal.value}
        onClose={() => setEditModal((prev) => ({ ...prev, visible: false }))}
        onSave={handleSaveField}
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
              Are you sure you want to log out of your account?
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
