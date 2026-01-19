import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowLeft,
    Briefcase,
    Clock,
    Edit2,
    Eye,
    MapPin,
    MoreVertical,
    Plus,
    Search,
    Trash2,
    Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Job data type for employers
interface EmployerJob {
  id: string;
  title: string;
  location: string;
  type: string;
  applicants: number;
  views: number;
  status: "active" | "paused" | "closed";
  postedDate: string;
}

// Sample job data
const myJobs: EmployerJob[] = [
  {
    id: "1",
    title: "Software Engineer",
    location: "Colombo, Sri Lanka",
    type: "Full-time",
    applicants: 24,
    views: 156,
    status: "active",
    postedDate: "2 days ago",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    location: "Remote",
    type: "Full-time",
    applicants: 18,
    views: 98,
    status: "active",
    postedDate: "5 days ago",
  },
  {
    id: "3",
    title: "Project Manager",
    location: "Kandy, Sri Lanka",
    type: "Contract",
    applicants: 12,
    views: 67,
    status: "closed",
    postedDate: "1 week ago",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    location: "Colombo, Sri Lanka",
    type: "Full-time",
    applicants: 8,
    views: 45,
    status: "paused",
    postedDate: "2 weeks ago",
  },
  {
    id: "5",
    title: "Data Analyst",
    location: "Remote",
    type: "Part-time",
    applicants: 15,
    views: 89,
    status: "active",
    postedDate: "3 days ago",
  },
];

// Job Card Component
interface JobCardProps {
  job: EmployerJob;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const JobCard = ({ job, onPress, onEdit, onDelete }: JobCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = () => {
    switch (job.status) {
      case "active":
        return { bg: "bg-green-100", text: "text-green-600" };
      case "paused":
        return { bg: "bg-yellow-100", text: "text-yellow-600" };
      case "closed":
        return { bg: "bg-gray-100", text: "text-gray-500" };
    }
  };

  const statusColors = getStatusColor();

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-2">
          <Text className="text-base font-semibold text-gray-900 mb-1">
            {job.title}
          </Text>
          <View className="flex-row items-center gap-2 flex-wrap">
            <View className="flex-row items-center gap-1">
              <MapPin size={12} color="#999" />
              <Text className="text-xs text-gray-400">{job.location}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Briefcase size={12} color="#999" />
              <Text className="text-xs text-gray-400">{job.type}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <View className={`px-2 py-1 rounded-full ${statusColors.bg}`}>
            <Text
              className={`text-xs font-medium capitalize ${statusColors.text}`}
            >
              {job.status}
            </Text>
          </View>
          <TouchableOpacity
            className="p-1"
            onPress={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center gap-4 mb-3">
        <View className="flex-row items-center gap-1.5">
          <Users size={14} color="#8B2635" />
          <Text className="text-sm text-gray-600">
            {job.applicants} applicants
          </Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Eye size={14} color="#2196F3" />
          <Text className="text-sm text-gray-600">{job.views} views</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Clock size={14} color="#999" />
          <Text className="text-sm text-gray-400">{job.postedDate}</Text>
        </View>
      </View>

      {showMenu && (
        <View className="flex-row gap-2 pt-2 border-t border-gray-100">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-2 rounded-lg bg-blue-50"
            onPress={onEdit}
          >
            <Edit2 size={14} color="#2196F3" />
            <Text className="text-sm font-medium text-blue-500">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-2 rounded-lg bg-red-50"
            onPress={onDelete}
          >
            <Trash2 size={14} color="#E53935" />
            <Text className="text-sm font-medium text-red-500">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function EmployerJobsScreen() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "closed">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = myJobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || job.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#8B2635", "#7D1F2E", "#6B1A27"]}
        className="pb-5"
      >
        <SafeAreaView edges={["top"]} className="px-4">
          {/* Top Row */}
          <View className="flex-row justify-between items-center pt-2 pb-4">
            <TouchableOpacity className="p-2 -ml-2">
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">My Job Posts</Text>
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Plus size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-xl px-3.5 py-3 gap-2.5">
            <Search size={20} color="#999" />
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Search your jobs..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Tabs */}
      <View className="flex-row bg-white px-4 py-1 border-b border-gray-200">
        {(["all", "active", "closed"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`py-3.5 px-4 mr-2 ${activeTab === tab ? "border-b-[3px]" : ""}`}
            style={activeTab === tab ? { borderBottomColor: "#8B2635" } : {}}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-[15px] font-medium capitalize ${activeTab === tab ? "font-semibold" : "text-gray-500"}`}
              style={activeTab === tab ? { color: "#8B2635" } : {}}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Jobs List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onPress={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}

        {filteredJobs.length === 0 && (
          <View className="flex-1 justify-center items-center py-16">
            <Briefcase size={48} color="#ccc" />
            <Text className="text-base text-gray-400 mt-3">No jobs found</Text>
          </View>
        )}

        {/* Post New Job Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 py-4 rounded-xl mt-2"
          style={{ backgroundColor: "#8B2635" }}
        >
          <Plus size={20} color="#fff" />
          <Text className="text-white text-base font-semibold">
            Post a New Job
          </Text>
        </TouchableOpacity>

        <View className="h-5" />
      </ScrollView>
    </View>
  );
}
