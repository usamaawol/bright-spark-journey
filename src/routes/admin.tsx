import { createFileRoute, redirect } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
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
  MapPin
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

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const studentList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoadingStudents(false);
      }
    };

    if (user && profile?.role === "admin") {
      fetchStudents();
    }
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

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-canvas)]">
      <Header />
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-[family-name:var(--font-display)] font-extrabold text-[color:var(--color-navy)] mb-2">
              Admin Control Center
            </h1>
            <p className="text-[color:var(--color-navy)]/60">
              Manage students, content, and academy performance.
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[color:var(--color-navy)] text-white hover:brightness-110">
              <Plus className="size-4 mr-2" /> NEW ANNOUNCEMENT
            </Button>
            <Button variant="outline" className="border-[color:var(--color-navy)]/10">
              <Settings className="size-4" />
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
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <item.icon className={`size-5 ${item.color}`} />
                    <span className="text-xs font-bold text-green-500">+4%</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-[color:var(--color-navy)]/40 font-medium">{item.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="bg-white/50 p-1 border border-[color:var(--color-navy)]/5">
            <TabsTrigger value="students" className="data-[state=active]:bg-white">Students</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-white">Resources</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-white">Messages</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Directory</CardTitle>
                  <CardDescription>Manage and monitor student progress</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[color:var(--color-navy)]/30" />
                  <Input placeholder="Search students..." className="pl-10 bg-[color:var(--color-canvas)]/50 border-none" />
                </div>
              </CardHeader>
              <CardContent>
                {loadingStudents ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="size-8 border-4 border-[color:var(--color-spark)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b-[color:var(--color-navy)]/5">
                        <TableHead>Student</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-[color:var(--color-navy)]/[0.02] border-b-[color:var(--color-navy)]/5">
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
                                <div className="font-bold text-sm">{student.fullName || "Unknown Student"}</div>
                                <div className="text-xs text-[color:var(--color-navy)]/40">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] uppercase font-bold border-[color:var(--color-navy)]/10 ${student.role === "admin" ? "text-red-600 border-red-200" : ""}`}
                            >
                              {student.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold border-[color:var(--color-navy)]/10">
                              {student.currentLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 bg-[color:var(--color-navy)]/5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[color:var(--color-spark)]" 
                                  style={{ width: `${student.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{student.progress || 0}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="size-8">
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

          <TabsContent value="messages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-none shadow-sm hover:ring-1 hover:ring-[color:var(--color-spark)]/20 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-[color:var(--color-spark)]/10 text-[color:var(--color-spark)] border-none text-[10px]">INQUIRY</Badge>
                      <span className="text-[10px] text-[color:var(--color-navy)]/40 font-bold uppercase">2h ago</span>
                    </div>
                    <CardTitle className="text-base">Course Curriculum Inquiry</CardTitle>
                    <CardDescription className="text-xs">From: Sarah Johnson</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[color:var(--color-navy)]/60 line-clamp-3 mb-4">
                      "Hello, I'm interested in the 90-day program but I work full-time. Do you have evening sessions available for complete beginners?"
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs font-bold border-[color:var(--color-navy)]/10">
                        <Mail className="size-3 mr-2" /> REPLY
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs font-bold border-[color:var(--color-navy)]/10">
                        <Phone className="size-3 mr-2" /> CALL
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
