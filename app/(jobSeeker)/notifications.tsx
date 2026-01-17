import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowLeft,
    Bell,
    Briefcase,
    Heart,
    MessageCircle,
    Star,
    UserPlus,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Notification data type
interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "job" | "mention" | "system";
  user?: {
    name: string;
    avatar: string;
  };
  message: string;
  time: string;
  isRead: boolean;
}

// Sample notifications data
const notifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Dr. Nimal Perera",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=nimal&backgroundColor=b6e3f4",
    },
    message: "liked your post about the internship experience",
    time: "2m ago",
    isRead: false,
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Sithara Fernando",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=sithara&backgroundColor=c0aede",
    },
    message: 'commented on your post: "Congrats! This is amazing!"',
    time: "15m ago",
    isRead: false,
  },
  {
    id: "3",
    type: "job",
    message: "New job alert! Software Engineer at WSO2 matches your profile",
    time: "1h ago",
    isRead: false,
  },
  {
    id: "4",
    type: "follow",
    user: {
      name: "Kamal Jayasinghe",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=kamal&backgroundColor=ffd5dc",
    },
    message: "started following you",
    time: "2h ago",
    isRead: true,
  },
  {
    id: "5",
    type: "mention",
    user: {
      name: "Amali Wickramasinghe",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=amali&backgroundColor=d1d4f9",
    },
    message: "mentioned you in a comment",
    time: "3h ago",
    isRead: true,
  },
  {
    id: "6",
    type: "system",
    message: "Your profile has reached 100 views this week! 🎉",
    time: "5h ago",
    isRead: true,
  },
  {
    id: "7",
    type: "like",
    user: {
      name: "Prof. Anura Silva",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=anura&backgroundColor=d1d4f9",
    },
    message: "and 12 others liked your post",
    time: "1d ago",
    isRead: true,
  },
  {
    id: "8",
    type: "job",
    message: "3 new jobs in Colombo match your preferences",
    time: "1d ago",
    isRead: true,
  },
  {
    id: "9",
    type: "follow",
    user: {
      name: "Dilini Rajapaksa",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=dilini&backgroundColor=fab1a0",
    },
    message: "started following you",
    time: "2d ago",
    isRead: true,
  },
];

// Get icon for notification type
const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return <Heart size={18} color="#fff" fill="#fff" />;
    case "comment":
      return <MessageCircle size={18} color="#fff" />;
    case "follow":
      return <UserPlus size={18} color="#fff" />;
    case "job":
      return <Briefcase size={18} color="#fff" />;
    case "mention":
      return <Star size={18} color="#fff" />;
    case "system":
      return <Bell size={18} color="#fff" />;
    default:
      return <Bell size={18} color="#fff" />;
  }
};

// Get background color for notification icon
const getIconBackground = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return "#E91E63";
    case "comment":
      return "#2196F3";
    case "follow":
      return "#4CAF50";
    case "job":
      return "#8B2635";
    case "mention":
      return "#FF9800";
    case "system":
      return "#9C27B0";
    default:
      return "#666";
  }
};

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const NotificationItem = ({ notification, onPress }: NotificationItemProps) => (
  <TouchableOpacity
    className={`flex-row items-start px-4 py-3.5 bg-white border-b border-gray-100 ${!notification.isRead ? "bg-pink-50" : ""}`}
    style={!notification.isRead ? { backgroundColor: "#FFF5F6" } : {}}
    onPress={onPress}
  >
    <View className="mr-3.5">
      {notification.user ? (
        <View className="relative">
          <Image
            source={{ uri: notification.user.avatar }}
            className="w-[50px] h-[50px] rounded-full"
          />
          <View
            className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full justify-center items-center border-2 border-white"
            style={{ backgroundColor: getIconBackground(notification.type) }}
          >
            {getNotificationIcon(notification.type)}
          </View>
        </View>
      ) : (
        <View
          className="w-[50px] h-[50px] rounded-full justify-center items-center"
          style={{ backgroundColor: getIconBackground(notification.type) }}
        >
          {getNotificationIcon(notification.type)}
        </View>
      )}
    </View>
    <View className="flex-1">
      <Text
        className={`text-[15px] leading-[21px] text-gray-800 mb-1 ${!notification.isRead ? "font-medium" : ""}`}
      >
        {notification.user && (
          <Text className="font-semibold text-gray-900">
            {notification.user.name}{" "}
          </Text>
        )}
        {notification.message}
      </Text>
      <Text className="text-[13px] text-gray-400">{notification.time}</Text>
    </View>
    {!notification.isRead && (
      <View
        className="w-2.5 h-2.5 rounded-full ml-2 self-center"
        style={{ backgroundColor: "#8B2635" }}
      />
    )}
  </TouchableOpacity>
);

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => !n.isRead);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#8B2635", "#7D1F2E", "#6B1A27"]}
        className="pb-4"
      >
        <SafeAreaView edges={["top"]} className="px-4">
          {/* Top Row */}
          <View className="relative flex-row items-center pt-2 pb-1">
            <TouchableOpacity className="p-2">
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="absolute left-0 right-0 text-center text-xl font-bold text-white">
              Notifications
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Tabs */}
      <View className="flex-row bg-white px-4 py-1 border-b border-gray-200">
        <TouchableOpacity
          className={`flex-row items-center py-3.5 px-4 mr-2 gap-2 ${activeTab === "all" ? "border-b-[3px]" : ""}`}
          style={activeTab === "all" ? { borderBottomColor: "#8B2635" } : {}}
          onPress={() => setActiveTab("all")}
        >
          <Text
            className={`text-[15px] font-medium ${activeTab === "all" ? "font-semibold" : "text-gray-500"}`}
            style={activeTab === "all" ? { color: "#8B2635" } : {}}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-row items-center py-3.5 px-4 mr-2 gap-2 ${activeTab === "unread" ? "border-b-[3px]" : ""}`}
          style={activeTab === "unread" ? { borderBottomColor: "#8B2635" } : {}}
          onPress={() => setActiveTab("unread")}
        >
          <Text
            className={`text-[15px] font-medium ${activeTab === "unread" ? "font-semibold" : "text-gray-500"}`}
            style={activeTab === "unread" ? { color: "#8B2635" } : {}}
          >
            Unread
          </Text>
          {unreadCount > 0 && (
            <View
              className="rounded-full px-2 py-0.5"
              style={{ backgroundColor: "#8B2635" }}
            >
              <Text className="text-white text-xs font-semibold">
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Mark all as read button */}
      {unreadCount > 0 && (
        <TouchableOpacity className="bg-white py-3 px-4 border-b border-gray-200">
          <Text
            className="text-sm font-semibold text-right"
            style={{ color: "#8B2635" }}
          >
            Mark all as read
          </Text>
        </TouchableOpacity>
      )}

      {/* Notifications List */}
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Today Section */}
        <View className="px-4 py-3 bg-gray-100">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Today
          </Text>
        </View>
        {filteredNotifications.slice(0, 3).map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={() => {}}
          />
        ))}

        {/* Earlier Section */}
        <View className="px-4 py-3 bg-gray-100">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Earlier
          </Text>
        </View>
        {filteredNotifications.slice(3).map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={() => {}}
          />
        ))}

        {filteredNotifications.length === 0 && (
          <View className="flex-1 justify-center items-center py-16 gap-3">
            <Bell size={48} color="#ccc" />
            <Text className="text-base text-gray-400">No notifications</Text>
          </View>
        )}

        <View className="h-5" />
      </ScrollView>
    </View>
  );
}
