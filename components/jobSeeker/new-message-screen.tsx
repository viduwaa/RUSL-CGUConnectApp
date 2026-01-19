import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Search, UserPlus } from "lucide-react-native";
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

// Contact type for new message
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isOnline: boolean;
}

// Sample contacts data (users that can be messaged)
const availableContacts: Contact[] = [
  {
    id: "101",
    name: "Prof. Kumara Silva",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=kumara&backgroundColor=b6e3f4",
    role: "Career Counselor",
    isOnline: true,
  },
  {
    id: "102",
    name: "Malini Herath",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=malini&backgroundColor=ffd5dc",
    role: "HR Manager at TechCorp",
    isOnline: true,
  },
  {
    id: "103",
    name: "Thisara Mendis",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=thisara&backgroundColor=c0aede",
    role: "Alumni - Software Engineer",
    isOnline: false,
  },
  {
    id: "104",
    name: "Sampath Gunawardena",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=sampath&backgroundColor=d1d4f9",
    role: "Recruiter at GlobalTech",
    isOnline: true,
  },
  {
    id: "105",
    name: "Lakshmi Jayawardena",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=lakshmi&backgroundColor=ffeaa7",
    role: "Alumni - Project Manager",
    isOnline: false,
  },
  {
    id: "106",
    name: "Nuwan Perera",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=nuwan&backgroundColor=fab1a0",
    role: "Department Head - Computing",
    isOnline: true,
  },
  {
    id: "107",
    name: "Sanduni Fernando",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=sanduni&backgroundColor=a29bfe",
    role: "Alumni - Data Analyst",
    isOnline: false,
  },
  {
    id: "108",
    name: "Chamath Rajapaksa",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=chamath&backgroundColor=74b9ff",
    role: "Startup Founder",
    isOnline: true,
  },
];

// Contact Item Component
interface ContactItemProps {
  contact: Contact;
  onPress: () => void;
}

const ContactItem = ({ contact, onPress }: ContactItemProps) => (
  <TouchableOpacity
    className="flex-row items-center px-4 py-3.5 border-b border-gray-100 bg-white"
    onPress={onPress}
  >
    <View className="relative">
      <Image
        source={{ uri: contact.avatar }}
        className="w-14 h-14 rounded-full"
      />
      {contact.isOnline && (
        <View className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      )}
    </View>
    <View className="flex-1 ml-3.5 justify-center">
      <Text className="text-base font-semibold text-gray-900">
        {contact.name}
      </Text>
      <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={1}>
        {contact.role}
      </Text>
    </View>
    <View
      className="w-9 h-9 rounded-full items-center justify-center"
      style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
    >
      <UserPlus size={18} color="#8B2635" />
    </View>
  </TouchableOpacity>
);

// Props for NewMessageScreen
interface NewMessageScreenProps {
  onBack: () => void;
  onSelectContact: (contact: Contact) => void;
}

export default function NewMessageScreen({
  onBack,
  onSelectContact,
}: NewMessageScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = availableContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View className="flex-1 bg-gray-50 absolute inset-0 z-50">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header */}
      <LinearGradient colors={["#8B2635", "#7D1F2E"]} className="pb-4">
        <SafeAreaView edges={["top"]} className="px-4">
          <View className="flex-row items-center pt-2 mb-4">
            <TouchableOpacity className="p-2 -ml-2" onPress={onBack}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white ml-2">
              New Message
            </Text>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white/20 rounded-xl px-3.5 py-3 gap-2.5">
            <Search size={20} color="#fff" />
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="Search contacts..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Section Header */}
      <View className="px-4 py-3 bg-gray-100">
        <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Suggested Contacts
        </Text>
      </View>

      {/* Contacts List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredContacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onPress={() => onSelectContact(contact)}
          />
        ))}

        {filteredContacts.length === 0 && (
          <View className="flex-1 justify-center items-center py-16">
            <Text className="text-base text-gray-400">No contacts found</Text>
            <Text className="text-sm text-gray-300 mt-1">
              Try a different search term
            </Text>
          </View>
        )}

        <View className="h-5" />
      </ScrollView>
    </View>
  );
}
