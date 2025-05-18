import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "./components/layout/AppLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/dashboard/Projects";
import Analytics from "./pages/dashboard/Analytics";
import NewProject from "./pages/dashboard/NewProject";
import ProjectDetail from "./pages/dashboard/ProjectDetail";
import ThemesPage from "./pages/dashboard/ThemesPage";
import NotFound from "./pages/NotFound";
import VisitorProfilePage from "./pages/VisitorProfilePage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import { useAuth } from "@/hooks/useAuth";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Username Route component
const UsernameRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated but not on their username route, redirect
  if (profile?.username && !window.location.pathname.startsWith(`/${profile.username}`)) {
    return <Navigate to={`/${profile.username}/dashboard`} />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes using AppLayout (includes Navbar/Footer) */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
            </Route>

            {/* Public Route WITHOUT AppLayout (no Navbar/Footer) */}
            <Route path="/:username" element={<VisitorProfilePage />} />

            {/* Case Study Detail Route */}
            <Route path="/projects/:projectId" element={<CaseStudyDetailPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            {/* Reserved Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new" element={<NewProject />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="media" element={<Dashboard />} />
              <Route path="profile" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
              <Route path="themes" element={<ThemesPage />} />
            </Route>

            {/* Username-based Routes */}
            <Route path="/:username/dashboard" element={<UsernameRoute><DashboardLayout /></UsernameRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new" element={<NewProject />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="media" element={<Dashboard />} />
              <Route path="profile" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>

            {/* 404 - Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
