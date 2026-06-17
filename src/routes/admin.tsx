import { createFileRoute, redirect } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Award, 
  BarChart, 
  Settings,
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  Save,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin")({
  component: AdminDashboardComponent,
});

function AdminDashboardComponent() {
  const { user, profile, loading } = useAuth();
  const [students, setStudents] = React.useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = React.useState(true);
  
  const [announcements, setAnnouncements] = React.useState<any[]>([]);
  const [resources, setResources] = React.useState<any[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [achievements, setAchievements] = React.useState<any[]>([]);
  const [dailyTests, setDailyTests] = React.useState<any[]>([]);
  
  const [loadingAnnouncements, setLoadingAnnouncements] = React.useState(true);
  const [loadingResources, setLoadingResources] = React.useState(true);
  const [loadingMessages, setLoadingMessages] = React.useState(true);
  const [loadingAchievements, setLoadingAchievements] = React.useState(true);
  const [loadingDailyTests, setLoadingDailyTests] = React.useState(true);

  // Form states
  const [showAnnouncementForm, setShowAnnouncementForm] = React.useState(false);
  const [showResourceForm, setShowResourceForm] = React.useState(false);
  const [showAchievementForm, setShowAchievementForm] = React.useState(false);
  const [showDailyTestForm, setShowDailyTestForm] = React.useState(false);
  
  const [announcementForm, setAnnouncementForm] = React.useState({ title: "", content: "" });
  const [resourceForm, setResourceForm] = React.useState({ title: "", description: "", link: "" });
  const [achievementForm, setAchievementForm] = React.useState({ title: "", description: "", date: "" });
  const [dailyTestForm, setDailyTestForm] = React.useState({ question: "", answer: "", date: "" });

  React.useEffect(() => {
    const fetchAllData = async () => {
      if (!user || profile?.role !== "admin") return;
      
      try {
        const [
          usersSnapshot,
          announcementsSnapshot,
          resourcesSnapshot,
          messagesSnapshot,
          achievementsSnapshot,
          dailyTestsSnapshot
        ] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "announcements")),
          getDocs(collection(db, "resources")),
          getDocs(collection(db, "messages")),
          getDocs(collection(db, "achievements")),
          getDocs(collection(db, "dailyTests"))
        ]);
        
        setStudents(usersSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setAnnouncements(announcementsSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setResources(resourcesSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setMessages(messagesSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setAchievements(achievementsSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setDailyTests(dailyTestsSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        
        setLoadingStudents(false);
        setLoadingAnnouncements(false);
        setLoadingResources(false);
        setLoadingMessages(false);
        setLoadingAchievements(false);
        setLoadingDailyTests(false);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingStudents(false);
        setLoadingAnnouncements(false);
        setLoadingResources(false);
        setLoadingMessages(false);
        setLoadingAchievements(false);
        setLoadingDailyTests(false);
      }
    };

    fetchAllData();
  }, [user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-canvas)]">
        <div className="size-12 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || profile?.role !== "admin") {
    // In a real app, you'd redirect to a "Not Authorized" page or back home
    throw redirect({ to: "/" });
  }

  const analytics = [
    { label: "Total Students", value: students.length.toString(), icon: Users, color: "text-blue-500" },
    { label: "Active Students", value: students.filter(s => s.role === "student").length.toString(), icon: BarChart, color: "text-green-500" },
    { label: "Academy Location", value: "Bale Robe, ET", icon: MapPin, color: "text-orange-500" },
    { label: "Admin", value: profile?.fullName || "BSAcademy", icon: Mail, color: "text-purple-500" },
  ];

  // ------------------- HANDLER FUNCTIONS -------------------
  const handleAddAnnouncement = async () => {
    if (!announcementForm.title || !announcementForm.content) return;
    try {
      const docRef = await addDoc(collection(db, "announcements"), {
        ...announcementForm,
        visible: true,
        createdAt: serverTimestamp()
      });
      setAnnouncements(prev => [...prev, { id: docRef.id, ...announcementForm, visible: true, createdAt: new Date() }]);
      setAnnouncementForm({ title: "", content: "" });
      setShowAnnouncementForm(false);
    } catch (e) { console.error("Error adding announcement:", e); }
  };

  const handleToggleAnnouncementVisibility = async (id: string, currentVisible: boolean) => {
    try {
      await updateDoc(doc(db, "announcements", id), { visible: !currentVisible });
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, visible: !currentVisible } : a));
    } catch (e) { console.error("Error updating announcement:", e); }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (e) { console.error("Error deleting announcement:", e); }
  };

  const handleAddResource = async () => {
    if (!resourceForm.title) return;
    try {
      const docRef = await addDoc(collection(db, "resources"), {
        ...resourceForm,
        createdAt: serverTimestamp()
      });
      setResources(prev => [...prev, { id: docRef.id, ...resourceForm, createdAt: new Date() }]);
      setResourceForm({ title: "", description: "", link: "" });
      setShowResourceForm(false);
    } catch (e) { console.error("Error adding resource:", e); }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      await deleteDoc(doc(db, "resources", id));
      setResources(prev => prev.filter(r => r.id !== id));
    } catch (e) { console.error("Error deleting resource:", e); }
  };

  const handleAddAchievement = async () => {
    if (!achievementForm.title) return;
    try {
      const docRef = await addDoc(collection(db, "achievements"), {
        ...achievementForm,
        createdAt: serverTimestamp()
      });
      setAchievements(prev => [...prev, { id: docRef.id, ...achievementForm, createdAt: new Date() }]);
      setAchievementForm({ title: "", description: "", date: "" });
      setShowAchievementForm(false);
    } catch (e) { console.error("Error adding achievement:", e); }
  };

  const handleDeleteAchievement = async (id: string) => {
    try {
      await deleteDoc(doc(db, "achievements", id));
      setAchievements(prev => prev.filter(a => a.id !== id));
    } catch (e) { console.error("Error deleting achievement:", e); }
  };

  const handleAddDailyTest = async () => {
    if (!dailyTestForm.question) return;
    try {
      const docRef = await addDoc(collection(db, "dailyTests"), {
        ...dailyTestForm,
        createdAt: serverTimestamp()
      });
      setDailyTests(prev => [...prev, { id: docRef.id, ...dailyTestForm, createdAt: new Date() }]);
      setDailyTestForm({ question: "", answer: "", date: "" });
      setShowDailyTestForm(false);
    } catch (e) { console.error("Error adding daily test:", e); }
  };

  const handleDeleteDailyTest = async (id: string) => {
    try {
      await deleteDoc(doc(db, "dailyTests", id));
      setDailyTests(prev => prev.filter(t => t.id !== id));
    } catch (e) { console.error("Error deleting daily test:", e); }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (e) { console.error("Error deleting message:", e); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-canvas)] dark:bg-slate-900">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-extrabold text-[color:var(--color-navy)] dark:text-white mb-2">
              Admin Control Center
            </h1>
            <p className="text-[color:var(--color-navy)]/60 dark:text-slate-400">
              Manage students, content, and academy performance.
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowAnnouncementForm(true)}
              className="bg-[color:var(--color-navy)] text-white hover:brightness-110"
            >
              <Plus className="size-4 mr-2" /> NEW ANNOUNCEMENT
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {analytics.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <item.icon className={`size-5 ${item.color}`} />
                    <span className="text-xs font-bold text-green-500">+4%</span>
                  </div>
                  <div className="text-3xl font-bold mb-1 text-[color:var(--color-navy)] dark:text-white">{item.value}</div>
                  <div className="text-sm text-[color:var(--color-navy)]/40 dark:text-slate-400 font-medium">{item.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="bg-white/50 dark:bg-slate-800/50 p-1 border border-[color:var(--color-navy)]/5 dark:border-slate-700 rounded-xl">
            <TabsTrigger value="students" className="data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white dark:data-[state=active]:bg-[color:var(--color-navy)] rounded-lg">Students</TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white dark:data-[state=active]:bg-[color:var(--color-navy)] rounded-lg">Announcements</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white dark:data-[state=active]:bg-[color:var(--color-navy)] rounded-lg">Resources</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white dark:data-[state=active]:bg-[color:var(--color-navy)] rounded-lg">Messages</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white dark:data-[state=active]:bg-[color:var(--color-navy)] rounded-lg">Achievements</TabsTrigger>
            <TabsTrigger value="dailyTests" className="data-[state=active]:bg-[color:var(--color-navy)] data-[state=active]:text-white dark:data-[state=active]:bg-[color:var(--color-navy)] rounded-lg">Daily Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                <div>
                  <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Student Directory</CardTitle>
                  <CardDescription className="dark:text-slate-400">Manage and monitor student progress</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[color:var(--color-navy)]/30 dark:text-slate-400" />
                  <Input placeholder="Search students..." className="pl-10 bg-[color:var(--color-canvas)]/50 dark:bg-slate-700 dark:text-white border-none dark:border-slate-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {loadingStudents ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b-[color:var(--color-navy)]/5 dark:border-slate-700">
                        <TableHead className="text-[color:var(--color-navy)]/60 dark:text-slate-400">Student</TableHead>
                        <TableHead className="text-[color:var(--color-navy)]/60 dark:text-slate-400">Role</TableHead>
                        <TableHead className="text-[color:var(--color-navy)]/60 dark:text-slate-400">Level</TableHead>
                        <TableHead className="text-[color:var(--color-navy)]/60 dark:text-slate-400">Progress</TableHead>
                        <TableHead className="text-right text-[color:var(--color-navy)]/60 dark:text-slate-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-[color:var(--color-navy)]/[0.02] dark:hover:bg-slate-700 border-b-[color:var(--color-navy)]/5 dark:border-slate-700">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {student.photoURL ? (
                                <img 
                                  src={student.photoURL} 
                                  alt={student.fullName}
                                  className="size-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="size-8 rounded-full bg-[color:var(--color-spark)]/10 text-[color:var(--color-spark)] grid place-items-center text-xs font-bold">
                                  {student.fullName?.charAt(0) || "S"}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-sm text-[color:var(--color-navy)] dark:text-white">{student.fullName || "Unknown Student"}</div>
                                <div className="text-xs text-[color:var(--color-navy)]/40 dark:text-slate-400">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] uppercase font-bold border-[color:var(--color-navy)]/10 dark:border-slate-600 ${student.role === "admin" ? "text-red-600 border-red-200" : "text-[color:var(--color-navy)] dark:text-slate-200"}`}
                            >
                              {student.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold border-[color:var(--color-navy)]/10 dark:border-slate-600 text-[color:var(--color-navy)] dark:text-slate-200">
                              {student.currentLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 bg-[color:var(--color-navy)]/5 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[color:var(--color-spark)]" 
                                  style={{ width: `${student.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-[color:var(--color-navy)] dark:text-slate-200">{student.progress || 0}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="size-8 text-[color:var(--color-navy)] dark:text-white dark:hover:bg-slate-700">
                              <MoreVertical className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- ANNOUNCEMENTS ------------------- */}
          <TabsContent value="announcements" className="space-y-4">
            <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Announcements</CardTitle>
                <CardDescription className="dark:text-slate-400">Manage announcements visible on the home page</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {showAnnouncementForm && (
                  <div className="p-6 bg-[color:var(--color-spark)]/5 rounded-xl border border-[color:var(--color-spark)]/20 dark:bg-slate-700/50 dark:border-slate-600">
                    <h3 className="font-bold text-[color:var(--color-navy)] dark:text-white mb-4">Create New Announcement</h3>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Title" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      />
                      <textarea 
                        placeholder="Content" 
                        className="w-full min-h-[100px] p-3 rounded-lg bg-white dark:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-600"
                        value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      />
                      <div className="flex gap-3">
                        <Button onClick={handleAddAnnouncement} className="bg-[color:var(--color-navy)] text-white">
                          <Save className="size-4 mr-2" /> Save Announcement
                        </Button>
                        <Button variant="outline" onClick={() => setShowAnnouncementForm(false)} className="dark:text-white dark:border-slate-600">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {loadingAnnouncements ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcements.length === 0 ? (
                      <p className="text-center text-[color:var(--color-navy)]/40 dark:text-slate-500 py-8">No announcements yet</p>
                    ) : (
                      announcements.map(announcement => (
                        <div key={announcement.id} className="p-6 border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-[color:var(--color-navy)] dark:text-white text-lg">{announcement.title}</h4>
                              <p className="text-sm text-[color:var(--color-navy)]/50 dark:text-slate-400 mt-1">{announcement.content}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleToggleAnnouncementVisibility(announcement.id, announcement.visible)}
                                className="dark:text-white dark:border-slate-600"
                              >
                                {announcement.visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteAnnouncement(announcement.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={announcement.visible ? "bg-green-500/10 text-green-600 border-green-200" : "bg-red-500/10 text-red-600 border-red-200"}>
                              {announcement.visible ? "Visible" : "Hidden"}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- RESOURCES ------------------- */}
          <TabsContent value="resources" className="space-y-4">
            <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                <div>
                  <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">English Learning Resources</CardTitle>
                  <CardDescription className="dark:text-slate-400">Curate the best learning materials for your students</CardDescription>
                </div>
                <Button onClick={() => setShowResourceForm(true)} className="bg-[color:var(--color-navy)] text-white">
                  <Plus className="size-4 mr-2" /> New Resource
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {showResourceForm && (
                  <div className="p-6 bg-[color:var(--color-spark)]/5 rounded-xl border border-[color:var(--color-spark)]/20 dark:bg-slate-700/50 dark:border-slate-600">
                    <h3 className="font-bold text-[color:var(--color-navy)] dark:text-white mb-4">Add New Resource</h3>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Resource Title" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={resourceForm.title}
                        onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                      />
                      <textarea 
                        placeholder="Description" 
                        className="w-full min-h-[80px] p-3 rounded-lg bg-white dark:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-600"
                        value={resourceForm.description}
                        onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                      />
                      <Input 
                        placeholder="Link" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={resourceForm.link}
                        onChange={(e) => setResourceForm({ ...resourceForm, link: e.target.value })}
                      />
                      <div className="flex gap-3">
                        <Button onClick={handleAddResource} className="bg-[color:var(--color-navy)] text-white">
                          <Save className="size-4 mr-2" /> Add Resource
                        </Button>
                        <Button variant="outline" onClick={() => setShowResourceForm(false)} className="dark:text-white dark:border-slate-600">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {loadingResources ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resources.length === 0 ? (
                      <p className="text-center text-[color:var(--color-navy)]/40 dark:text-slate-500 py-8">No resources added yet</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.map(resource => (
                          <div key={resource.id} className="p-6 border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-[color:var(--color-navy)] dark:text-white text-lg">{resource.title}</h4>
                                <p className="text-sm text-[color:var(--color-navy)]/50 dark:text-slate-400 mt-1">{resource.description}</p>
                                {resource.link && (
                                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-spark)] text-sm font-medium mt-2 inline-block hover:underline">
                                    Visit Link →
                                  </a>
                                )}
                              </div>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteResource(resource.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- MESSAGES ------------------- */}
          <TabsContent value="messages" className="space-y-4">
            <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Messages from Contact Form</CardTitle>
                <CardDescription className="dark:text-slate-400">View and manage messages from the website</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {loadingMessages ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <p className="text-center text-[color:var(--color-navy)]/40 dark:text-slate-500 py-8">No messages yet</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {messages.map(msg => (
                          <div key={msg.id} className="p-6 border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-[color:var(--color-navy)] dark:text-white text-lg">{msg.name}</h4>
                                <p className="text-sm text-[color:var(--color-spark)] dark:text-yellow-400 font-medium">{msg.email}</p>
                                <p className="text-sm text-[color:var(--color-navy)]/50 dark:text-slate-400 mt-2">{msg.message}</p>
                              </div>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteMessage(msg.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- ACHIEVEMENTS ------------------- */}
          <TabsContent value="achievements" className="space-y-4">
            <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                <div>
                  <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Student Achievements</CardTitle>
                  <CardDescription className="dark:text-slate-400">Celebrate student milestones and success stories</CardDescription>
                </div>
                <Button onClick={() => setShowAchievementForm(true)} className="bg-[color:var(--color-navy)] text-white">
                  <Plus className="size-4 mr-2" /> New Achievement
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {showAchievementForm && (
                  <div className="p-6 bg-[color:var(--color-spark)]/5 rounded-xl border border-[color:var(--color-spark)]/20 dark:bg-slate-700/50 dark:border-slate-600">
                    <h3 className="font-bold text-[color:var(--color-navy)] dark:text-white mb-4">Add New Achievement</h3>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Achievement Title" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={achievementForm.title}
                        onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                      />
                      <textarea 
                        placeholder="Description" 
                        className="w-full min-h-[80px] p-3 rounded-lg bg-white dark:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-600"
                        value={achievementForm.description}
                        onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                      />
                      <Input 
                        placeholder="Date (e.g. June 15, 2025)" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={achievementForm.date}
                        onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
                      />
                      <div className="flex gap-3">
                        <Button onClick={handleAddAchievement} className="bg-[color:var(--color-navy)] text-white">
                          <Save className="size-4 mr-2" /> Add Achievement
                        </Button>
                        <Button variant="outline" onClick={() => setShowAchievementForm(false)} className="dark:text-white dark:border-slate-600">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {loadingAchievements ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {achievements.length === 0 ? (
                      <p className="text-center text-[color:var(--color-navy)]/40 dark:text-slate-500 py-8">No achievements added yet</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map(achievement => (
                          <div key={achievement.id} className="p-6 border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-[color:var(--color-navy)] dark:text-white text-lg">{achievement.title}</h4>
                                {achievement.date && (
                                  <p className="text-xs text-[color:var(--color-navy)]/40 dark:text-slate-500 uppercase tracking-wide mt-1">{achievement.date}</p>
                                )}
                                <p className="text-sm text-[color:var(--color-navy)]/50 dark:text-slate-400 mt-2">{achievement.description}</p>
                              </div>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteAchievement(achievement.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- DAILY TESTS ------------------- */}
          <TabsContent value="dailyTests" className="space-y-4">
            <Card className="border-none shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
                <div>
                  <CardTitle className="font-[family-name:var(--font-display)] font-bold text-[color:var(--color-navy)] dark:text-white">Daily Practice Questions</CardTitle>
                  <CardDescription className="dark:text-slate-400">Assign daily questions for students to practice</CardDescription>
                </div>
                <Button onClick={() => setShowDailyTestForm(true)} className="bg-[color:var(--color-navy)] text-white">
                  <Plus className="size-4 mr-2" /> New Question
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {showDailyTestForm && (
                  <div className="p-6 bg-[color:var(--color-spark)]/5 rounded-xl border border-[color:var(--color-spark)]/20 dark:bg-slate-700/50 dark:border-slate-600">
                    <h3 className="font-bold text-[color:var(--color-navy)] dark:text-white mb-4">Add Daily Question</h3>
                    <div className="space-y-4">
                      <textarea 
                        placeholder="Question" 
                        className="w-full min-h-[80px] p-3 rounded-lg bg-white dark:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-600"
                        value={dailyTestForm.question}
                        onChange={(e) => setDailyTestForm({ ...dailyTestForm, question: e.target.value })}
                      />
                      <Input 
                        placeholder="Answer" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={dailyTestForm.answer}
                        onChange={(e) => setDailyTestForm({ ...dailyTestForm, answer: e.target.value })}
                      />
                      <Input 
                        placeholder="Date (e.g. June 15, 2025)" 
                        className="bg-white dark:bg-slate-700 dark:text-white"
                        value={dailyTestForm.date}
                        onChange={(e) => setDailyTestForm({ ...dailyTestForm, date: e.target.value })}
                      />
                      <div className="flex gap-3">
                        <Button onClick={handleAddDailyTest} className="bg-[color:var(--color-navy)] text-white">
                          <Save className="size-4 mr-2" /> Add Question
                        </Button>
                        <Button variant="outline" onClick={() => setShowDailyTestForm(false)} className="dark:text-white dark:border-slate-600">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {loadingDailyTests ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dailyTests.length === 0 ? (
                      <p className="text-center text-[color:var(--color-navy)]/40 dark:text-slate-500 py-8">No daily questions yet</p>
                    ) : (
                      <div className="space-y-4">
                        {dailyTests.map(test => (
                          <div key={test.id} className="p-6 border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                {test.date && (
                                  <p className="text-xs text-[color:var(--color-navy)]/40 dark:text-slate-500 uppercase tracking-wide mb-2">{test.date}</p>
                                )}
                                <h4 className="font-bold text-[color:var(--color-navy)] dark:text-white text-lg">{test.question}</h4>
                                {test.answer && (
                                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm text-green-800 dark:text-green-300 font-medium">Answer: {test.answer}</p>
                                  </div>
                                )}
                              </div>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteDailyTest(test.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
