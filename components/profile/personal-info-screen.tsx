import {
    mockEducation,
    mockExperience,
    mockUserSkills,
} from "@/data/mock-profile-data";
import { mockUser } from "@/data/mock-user";
import {
    Briefcase,
    GraduationCap,
    Mail,
    MapPin,
    Pencil,
    Phone,
    Plus,
    User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

interface PersonalInfoScreenProps {
  onBack: () => void;
}

export const PersonalInfoScreen = ({ onBack }: PersonalInfoScreenProps) => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    Alert.alert("Success", "Personal information updated successfully!");
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Action Button Bar */}
      <View className="px-4 py-3 flex-row justify-end bg-gray-50">
        <Pressable
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-5 py-2.5 rounded-xl flex-row items-center"
          style={{
            backgroundColor: isEditing ? "#8B2635" : "rgba(139, 38, 53, 0.1)",
          }}
        >
          <Pencil size={16} color={isEditing ? "#fff" : "#8B2635"} />
          <Text
            className="font-semibold ml-2"
            style={{ color: isEditing ? "#fff" : "#8B2635" }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {/* Profile Picture */}
        <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100 items-center">
          <View className="relative">
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full"
            />
            {isEditing && (
              <Pressable
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: "#8B2635" }}
              >
                <Pencil size={16} color="#fff" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Info Fields */}
        <View className="bg-white rounded-2xl border border-gray-100">
          {/* Name */}
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <User size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Full Name</Text>
              {isEditing ? (
                <TextInput
                  className="text-base text-gray-900 py-1"
                  value={editedUser.name}
                  onChangeText={(text) =>
                    setEditedUser({ ...editedUser, name: text })
                  }
                />
              ) : (
                <Text className="text-base text-gray-900">{user.name}</Text>
              )}
            </View>
          </View>

          {/* Email */}
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Mail size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Email</Text>
              {isEditing ? (
                <TextInput
                  className="text-base text-gray-900 py-1"
                  value={editedUser.email}
                  onChangeText={(text) =>
                    setEditedUser({ ...editedUser, email: text })
                  }
                  keyboardType="email-address"
                />
              ) : (
                <Text className="text-base text-gray-900">{user.email}</Text>
              )}
            </View>
          </View>

          {/* Phone */}
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Phone size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Phone</Text>
              {isEditing ? (
                <TextInput
                  className="text-base text-gray-900 py-1"
                  value={editedUser.phone}
                  onChangeText={(text) =>
                    setEditedUser({ ...editedUser, phone: text })
                  }
                  keyboardType="phone-pad"
                />
              ) : (
                <Text className="text-base text-gray-900">{user.phone}</Text>
              )}
            </View>
          </View>

          {/* Location */}
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <MapPin size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Location</Text>
              {isEditing ? (
                <TextInput
                  className="text-base text-gray-900 py-1"
                  value={editedUser.location}
                  onChangeText={(text) =>
                    setEditedUser({ ...editedUser, location: text })
                  }
                />
              ) : (
                <Text className="text-base text-gray-900">{user.location}</Text>
              )}
            </View>
          </View>

          {/* Role */}
          <View className="flex-row items-center p-4">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Briefcase size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Job Title</Text>
              {isEditing ? (
                <TextInput
                  className="text-base text-gray-900 py-1"
                  value={editedUser.role}
                  onChangeText={(text) =>
                    setEditedUser({ ...editedUser, role: text })
                  }
                />
              ) : (
                <Text className="text-base text-gray-900">{user.role}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Bio */}
        <View className="bg-white rounded-2xl p-4 mt-4 border border-gray-100">
          <Text className="text-sm text-gray-500 mb-2">Bio</Text>
          {isEditing ? (
            <TextInput
              className="text-base text-gray-900"
              value={editedUser.bio}
              onChangeText={(text) =>
                setEditedUser({ ...editedUser, bio: text })
              }
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text className="text-base text-gray-700 leading-6">
              {user.bio}
            </Text>
          )}
        </View>

        {/* Skills */}
        <View className="bg-white rounded-2xl p-4 mt-4 border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-gray-900">
              Skills
            </Text>
            {isEditing && (
              <Pressable className="flex-row items-center">
                <Plus size={16} color="#8B2635" />
                <Text
                  className="text-sm font-medium ml-1"
                  style={{ color: "#8B2635" }}
                >
                  Add
                </Text>
              </Pressable>
            )}
          </View>
          <View className="flex-row flex-wrap gap-2">
            {mockUserSkills.map((skill, index) => (
              <View
                key={index}
                className="px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
              >
                <Text
                  className="text-sm font-medium"
                  style={{ color: "#8B2635" }}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View className="bg-white rounded-2xl p-4 mt-4 border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-gray-900">
              Education
            </Text>
            {isEditing && (
              <Pressable className="flex-row items-center">
                <Plus size={16} color="#8B2635" />
                <Text
                  className="text-sm font-medium ml-1"
                  style={{ color: "#8B2635" }}
                >
                  Add
                </Text>
              </Pressable>
            )}
          </View>
          {mockEducation.map((edu, index) => (
            <View
              key={edu.id}
              className={`flex-row ${index > 0 ? "mt-3 pt-3 border-t border-gray-100" : ""}`}
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
              >
                <GraduationCap size={20} color="#8B2635" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  {edu.degree}
                </Text>
                <Text className="text-sm text-gray-600">{edu.institution}</Text>
                <Text className="text-sm text-gray-400">
                  {edu.year} • {edu.grade}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View className="bg-white rounded-2xl p-4 mt-4 mb-6 border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-gray-900">
              Experience
            </Text>
            {isEditing && (
              <Pressable className="flex-row items-center">
                <Plus size={16} color="#8B2635" />
                <Text
                  className="text-sm font-medium ml-1"
                  style={{ color: "#8B2635" }}
                >
                  Add
                </Text>
              </Pressable>
            )}
          </View>
          {mockExperience.map((exp, index) => (
            <View
              key={exp.id}
              className={`flex-row ${index > 0 ? "mt-3 pt-3 border-t border-gray-100" : ""}`}
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
              >
                <Briefcase size={20} color="#8B2635" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="text-base font-medium text-gray-900">
                    {exp.title}
                  </Text>
                  {exp.isCurrent && (
                    <View className="ml-2 px-2 py-0.5 bg-green-100 rounded">
                      <Text className="text-xs text-green-700 font-medium">
                        Current
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-sm text-gray-600">{exp.company}</Text>
                <Text className="text-sm text-gray-400">{exp.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;
