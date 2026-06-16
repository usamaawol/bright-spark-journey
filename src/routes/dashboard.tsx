import { createFileRoute, redirect } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  MessageCircle, 
  Trophy, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  Brain,
  Sparkles,
  BarChart3,
  Settings as SettingsIcon,
  User as UserInfoIcon,
  Mail,
  Phone,
  LayoutDashboard,
  GraduationCap,
  FileText,
  Bookmark,
  History,
  Award,
  Bot,
  Save,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AITutor } from "@/components/AITutor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { user, profile, loading, updateUserProfile, uploadProfilePicture } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    passportNumber: ""
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        gender: profile.gender || "",
        passportNumber: profile.passportNumber || ""
      });
    }
  }, [profile]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await uploadProfilePicture(file);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-canvas)] dark:bg-slate-900">
        <div className="size-12 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    throw redirect({ to: "/login" });
  }

  const stats = [
    { label: "Overall Progress", value: profile?.progress || 30, icon: BarChart3, color: "text-blue-500" },
    { label: "Attendance", value: profile?.attendance || 90, icon: CheckCircle2, color: "text-green-500" },
    { label: "Current Level", value: profile?.currentLevel || "Beginner", icon: Trophy, color: "text-yellow-500", isText: true },
  ];

  const skillProgress = [
    { label: "Grammar", value: profile?.grammarProgress || 25 },
    { label: "Vocabulary", value: profile?.vocabularyProgress || 40 },
    { label: "Speaking", value: profile?.speakingProgress || 35 },
    { label: "Expressions", value: profile?.dailyExpressionsProgress || 30 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-canvas)] dark:bg-slate-900">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-extrabold text-[color:var(--color-navy)] dark:text-white mb-2"
              >
                {activeTab === "overview" ? `Welcome back, ${profile?.fullName?.split(" ")[0] || "Student"}!` : "Account Settings"}
              </motion.h1>
              <p className="text-[color:var(--color-navy)]/60 dark:text-slate-400">
                {activeTab === "overview" 
                  ? "Welcome to your personal learning dashboard." 
                  : "Manage your personal information and academy profile."}
              </p>
            </div>
            
            <TabsList className="bg-white/50 dark:bg-slate-800/50 p-1 rounded-xl self-start md:self-end flex flex-wrap h-auto">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white flex items-center gap-2 px-4 py-2">
                <LayoutDashboard size={16} />
                Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white flex items-center gap-2 px-4 py-2">
                <BookOpen size={16} />
                My Courses
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-lg data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white flex items-center gap-2 px-4 py-2">
                <FileText size={16} />
                Resources
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white flex items-center gap-2 px-4 py-2">
                <SettingsIcon size={16} />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                ...stats,
                { label: "AI Interactions", value: 124, icon: Bot, color: "text-purple-500", isText: true }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-none shadow-sm hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[color:var(--color-navy)]/70 dark:text-slate-300">
                        {stat.label}
                      </CardTitle>
                      <stat.icon className={`size-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent className="pb-6">
                      <div className="text-3xl font-bold text-[color:var(--color-navy)] dark:text-white">
                        {stat.isText ? stat.value : `${stat.value}%`}
                      </div>
                      {!stat.isText && (
                        <Progress value={stat.value as number} className="h-2 mt-4 bg-[color:var(--color-navy)]/10 dark:bg-slate-700" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Student Progress</CardTitle>
                        <CardDescription className="dark:text-slate-400">Track your mastery across key areas</CardDescription>
                      </div>
                      <Brain className="size-5 text-[color:var(--color-spark)]" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skillProgress.map((skill) => (
                      <div key={skill.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-[color:var(--color-navy)] dark:text-slate-200">{skill.label}</span>
                          <span className="text-[color:var(--color-navy)]/60 dark:text-slate-400">{skill.value}%</span>
                        </div>
                        <Progress value={skill.value} className="h-3 bg-[color:var(--color-navy)]/10 dark:bg-slate-700" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Assignments & Tasks</CardTitle>
                    <CardDescription className="dark:text-slate-400">Complete these tasks to advance your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Daily Expression Quiz", type: "Quiz", time: "10 mins", completed: false },
                        { title: "Pronunciation Practice: 'TH' Sound", type: "Audio", time: "15 mins", completed: true },
                        { title: "Speaking Partner Session", type: "Call", time: "30 mins", completed: false },
                      ].map((task, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: 0.2 + i * 0.1 }} 
                          className="flex items-center justify-between p-4 rounded-xl border border-[color:var(--color-navy)]/5 dark:border-slate-700 hover:bg-[color:var(--color-navy)]/[0.02] dark:hover:bg-slate-700/50 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`size-10 rounded-xl flex items-center justify-center ${
                              task.completed 
                                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            }`}>
                              {task.completed ? <CheckCircle2 size={18} /> : <BookOpen size={18} />}
                            </div>
                            <div>
                              <h4 className={`font-bold text-sm ${
                                task.completed 
                                  ? "line-through text-[color:var(--color-navy)]/40 dark:text-slate-500" 
                                  : "text-[color:var(--color-navy)] dark:text-white"
                              }`}>
                                {task.title}
                              </h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">{task.type}</span>
                                <span className="flex items-center gap-1 text-[10px] text-[color:var(--color-navy)]/40 dark:text-slate-500">
                                  <Clock size={10} /> {task.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            task.completed 
                              ? "text-green-600 dark:text-green-400" 
                              : "bg-[color:var(--color-navy)] dark:bg-slate-700 text-white hover:bg-[color:var(--color-spark)] dark:hover:bg-[color:var(--color-spark)]"
                          }`}>
                            {task.completed ? "REVIEW" : "START"}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="border-none shadow-sm bg-gradient-to-br from-[color:var(--color-navy)] to-[color:var(--color-navy)]/90 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Sparkles size={80} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white font-[family-name:var(--font-display)]">Spark Achievements</CardTitle>
                    <CardDescription className="text-white/60">Your earned badges and certificates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center py-4">
                      <div className="size-24 rounded-full bg-white/10 flex items-center justify-center mb-4 ring-4 ring-white/5">
                        <Trophy className="size-10 text-[color:var(--color-gold)]" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Academy Champion</h3>
                      <p className="text-sm text-white/60 mb-6 max-w-xs">You've earned 4 badges this month. Keep it up!</p>
                      <button className="w-full py-3 bg-white text-[color:var(--color-navy)] font-bold text-xs tracking-widest rounded-lg hover:bg-[color:var(--color-gold)] transition-colors">
                        VIEW CERTIFICATES
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { title: "Saved Vocabulary", icon: Bookmark },
                      { title: "Learning History", icon: History },
                      { title: "Quiz Results", icon: Award },
                    ].map((link, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[color:var(--color-navy)]/[0.02] dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                        <div className="size-10 rounded-lg bg-[color:var(--color-canvas)] dark:bg-slate-700 flex items-center justify-center border border-[color:var(--color-navy)]/5 dark:border-slate-600 group-hover:bg-[color:var(--color-spark)]/10">
                          <link.icon size={18} className="text-[color:var(--color-spark)]" />
                        </div>
                        <span className="font-bold text-sm text-[color:var(--color-navy)] dark:text-white">{link.title}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Foundation English", progress: 85, lessons: 12 },
                { title: "Conversational Phrases", progress: 40, lessons: 24 },
                { title: "Mastering Pronunciation", progress: 15, lessons: 18 },
              ].map((course, i) => (
                <Card key={i} className="border-none shadow-sm dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{course.title}</CardTitle>
                    <CardDescription>{course.lessons} Lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <button className="w-full py-2 bg-[color:var(--color-navy)] dark:bg-slate-700 text-white rounded-lg text-xs font-bold hover:bg-[color:var(--color-spark)] transition-colors">
                        CONTINUE LEARNING
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="resources">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Grammar Guide", type: "PDF" },
                { title: "Common Idioms", type: "Flashcards" },
                { title: "IPA Chart", type: "Image" },
                { title: "Daily Phrases", type: "Audio" },
              ].map((resource, i) => (
                <Card key={i} className="border-none shadow-sm dark:bg-slate-800 text-center p-6 hover:shadow-md transition-all cursor-pointer group">
                  <div className="size-12 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center group-hover:bg-[color:var(--color-spark)]/10">
                    <FileText className="size-6 text-[color:var(--color-spark)]" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{resource.title}</h4>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">{resource.type}</p>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <Card className="md:col-span-1 border-none shadow-sm dark:bg-slate-800 h-fit">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative group mb-5">
                    <div className="size-32 rounded-full bg-gradient-to-tr from-[color:var(--color-navy)] to-[color:var(--color-spark)] p-1">
                      {profile?.photoURL ? (
                        <img 
                          src={profile.photoURL} 
                          alt="Profile" 
                          className="size-full rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-inner"
                        />
                      ) : (
                        <div className="size-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-4xl font-black text-[color:var(--color-navy)] dark:text-white border-4 border-white dark:border-slate-700 shadow-inner">
                          {profile?.fullName?.charAt(0) || "S"}
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="profile-picture-upload" 
                      className="absolute bottom-0 right-0 bg-[color:var(--color-spark)] text-white p-2 rounded-full cursor-pointer hover:bg-[color:var(--color-navy)] transition-colors shadow-lg"
                    >
                      {isUploading ? (
                        <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Edit3 className="size-4" />
                      )}
                    </label>
                    <input 
                      type="file" 
                      id="profile-picture-upload" 
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-[color:var(--color-navy)] dark:text-white mb-1">{profile?.fullName || "Student Name"}</h3>
                  <Badge className="bg-[color:var(--color-spark)]/10 dark:bg-[color:var(--color-spark)]/20 text-[color:var(--color-spark)] border-none mb-5 px-3 py-1 text-sm">
                    {profile?.currentLevel || "Beginner"}
                  </Badge>
                  
                  <div className="w-full space-y-3 border-t border-[color:var(--color-navy)]/10 dark:border-slate-700 pt-5">
                    <div className="flex items-center gap-3 text-[color:var(--color-navy)] dark:text-slate-200">
                      <Mail className="size-4 text-[color:var(--color-spark)]" />
                      <span className="truncate text-sm font-medium">{profile?.email || "email@example.com"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[color:var(--color-navy)] dark:text-slate-200">
                      <Phone className="size-4 text-[color:var(--color-spark)]" />
                      <span className="text-sm font-medium">{profile?.phoneNumber || "+1234567890"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-8">
                <Card className="border-none shadow-sm dark:bg-slate-800">
                  <CardHeader className="border-b border-[color:var(--color-navy)]/5 dark:border-slate-700 flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 font-black text-[color:var(--color-navy)] dark:text-white">
                      <UserInfoIcon className="size-5 text-[color:var(--color-spark)]" />
                      Personal Information
                    </CardTitle>
                    {!isEditing && (
                      <Button 
                        onClick={handleEditToggle} 
                        className="bg-[color:var(--color-navy)] hover:bg-[color:var(--color-spark)] text-white"
                      >
                        <Edit3 className="size-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="p-8">
                    {isEditing ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Full Name</Label>
                            <Input 
                              id="fullName" 
                              name="fullName" 
                              value={formData.fullName} 
                              onChange={handleInputChange} 
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Gender</Label>
                            <Input 
                              id="gender" 
                              name="gender" 
                              value={formData.gender} 
                              onChange={handleInputChange} 
                              className="w-full"
                              placeholder="e.g. Male, Female, Other"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Email Address</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange} 
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Phone Number</Label>
                            <Input 
                              id="phoneNumber" 
                              name="phoneNumber" 
                              value={formData.phoneNumber} 
                              onChange={handleInputChange} 
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="passportNumber" className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Passport Number</Label>
                            <Input 
                              id="passportNumber" 
                              name="passportNumber" 
                              value={formData.passportNumber} 
                              onChange={handleInputChange} 
                              className="w-full"
                              placeholder="e.g. A1234567"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <Button 
                            onClick={handleSave} 
                            disabled={isSaving} 
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="size-4 mr-2" />
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button 
                            onClick={handleEditToggle} 
                            variant="secondary"
                            disabled={isSaving}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Full Name</p>
                          <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white">{profile?.fullName || "John Doe"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Gender</p>
                          <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white capitalize">{profile?.gender || "Not specified"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Email Address</p>
                          <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white">{profile?.email || "john@example.com"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Phone Number</p>
                          <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white">{profile?.phoneNumber || "+123 456 7890"}</p>
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Passport Number</p>
                          <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white">{profile?.passportNumber || "Not provided"}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm dark:bg-slate-800">
                  <CardHeader className="border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                    <CardTitle className="flex items-center gap-2 font-black text-[color:var(--color-navy)] dark:text-white">
                      <GraduationCap className="size-5 text-[color:var(--color-spark)]" />
                      Academy Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Current English Level</p>
                        <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white">{profile?.currentLevel || "Beginner"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Academy Role</p>
                        <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white capitalize">{profile?.role || "Student"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Academy Journey</p>
                        <p className="font-bold text-lg text-[color:var(--color-navy)] dark:text-white">Continuous Growth</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest font-bold text-[color:var(--color-navy)]/70 dark:text-slate-400">Status</p>
                        <Badge className="bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-none px-3 py-1 text-sm">Active Student</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <AITutor userLevel={profile?.currentLevel} studentName={profile?.fullName} />
    </div>
  );
}
