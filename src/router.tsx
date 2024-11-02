import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/CreateProjectView";
import EditProjectView from "@/views/EditProjectView";
import ProjectDetailsView from "@/views/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} index />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} index />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} index />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
