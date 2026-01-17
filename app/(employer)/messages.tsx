import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowLeft,
    Check,
    CheckCheck,
    PenSquare,
    Search,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Conversation data type
interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
    role: string;
  };
  lastMessage: string;
  time: string;
  unread: number;
  isRead: boolean;
}

// Sample conversations for employers (with job seekers/candidates)
const conversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Kamal Perera",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=kamal&backgroundColor=b6e3f4",
      isOnline: true,
      role: "Software Engineer Applicant",
    },
    lastMessage:
      "Thank you for considering my application. I am available for an interview.",
    time: "5m",
    unread: 2,
    isRead: false,
  },
  {
    id: "2",
    user: {
      name: "Nimal Silva",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=nimal&backgroundColor=ffd5dc",
      isOnline: true,
      role: "UI/UX Designer Applicant",
    },
    lastMessage: "I have attached my updated portfolio as requested.",
    time: "30m",
    unread: 1,
    isRead: false,
  },
  {
    id: "3",
    user: {
      name: "Sithara Fernando",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=sithara&backgroundColor=c0aede",
      isOnline: false,
      role: "Project Manager Applicant",
    },
    lastMessage:
      "Looking forward to hearing from you regarding the next steps.",
    time: "2h",
    unread: 0,
    isRead: true,
  },
  {
    id: "4",
    user: {
      name: "Amali Wickramasinghe",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/png?seed=amali&backgroundColor=d1d4f9",
      isOnline: false,
      role: "Data Analyst Applicant",
    },
    lastMessage: "Yes, I can start from next month.",
    time: "1d",
    unread: 0,
    isRead: true,
  },
  {
    id: "5",
    user: {
      name: "CGUConnect Support",
      avatar:
        "https://api.dicebear.com/7.x/initials/png?seed=CGU&backgroundColor=8B2635",
      isOnline: true,
      role: "Support Team",
    },
    lastMessage: "Your job post has been approved and is now live!",
    time: "2d",
    unread: 0,
    isRead: true,
  },
];

// Conversation Item Component
interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

const ConversationItem = ({ conversation, onPress }: ConversationItemProps) => (
  <TouchableOpacity
    className={`flex-row px-4 py-3.5 border-b border-gray-100 ${conversation.unread > 0 ? "bg-pink-50" : ""}`}
    style={conversation.unread > 0 ? { backgroundColor: "#FFF5F6" } : {}}
    onPress={onPress}
  >
    <View className="relative">
      <Image
        source={{ uri: conversation.user.avatar }}
        className="w-14 h-14 rounded-full"
      />
      {conversation.user.isOnline && (
        <View className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      )}
    </View>
    <View className="flex-1 ml-3.5 justify-center">
      <View className="flex-row justify-between items-center mb-0.5">
        <Text
          className={`text-base ${conversation.unread > 0 ? "font-semibold text-black" : "font-medium text-gray-900"}`}
        >
          {conversation.user.name}
        </Text>
        <Text className="text-xs text-gray-400">{conversation.time}</Text>
      </View>
      <Text className="text-xs text-gray-400 mb-1">
        {conversation.user.role}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text
          className={`flex-1 text-sm mr-2 ${conversation.unread > 0 ? "font-semibold text-black" : "text-gray-500"}`}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
        {conversation.unread > 0 ? (
          <View
            className="rounded-full min-w-[24px] h-6 justify-center items-center px-2"
            style={{ backgroundColor: "#8B2635" }}
          >
            <Text className="text-white text-xs font-semibold">
              {conversation.unread}
            </Text>
          </View>
        ) : conversation.isRead ? (
          <CheckCheck size={16} color="#8B2635" />
        ) : (
          <Check size={16} color="#999" />
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default function EmployerMessagesScreen() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || conv.unread > 0;
    return matchesSearch && matchesTab;
  });

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
          <View className="flex-row justify-between items-center pt-2 pb-3">
            <TouchableOpacity className="p-2 -ml-2">
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">Messages</Text>
            <TouchableOpacity className="p-2">
              <PenSquare size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mt-1">
            <View className="flex-row items-center bg-white rounded-xl px-3.5 py-3 gap-2.5">
              <Search size={20} color="#999" />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Search candidates..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
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
            All Messages
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
          <View
            className="rounded-full px-2 py-0.5"
            style={{ backgroundColor: "#8B2635" }}
          >
            <Text className="text-white text-xs font-semibold">
              {conversations.filter((c) => c.unread > 0).length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Conversations List */}
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onPress={() => {}}
          />
        ))}

        {filteredConversations.length === 0 && (
          <View className="flex-1 justify-center items-center py-16">
            <Text className="text-base text-gray-400">No messages found</Text>
          </View>
        )}

        <View className="h-5" />
      </ScrollView>
    </View>
  );
}
