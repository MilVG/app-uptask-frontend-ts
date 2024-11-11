import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/CreateProjectView";
import EditProjectView from "@/views/EditProjectView";
import ProjectDetailsView from "@/views/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView.tsx"
import RequestNewCodeView from "./views/auth/RequestNewCodeView.tsx";
import ForgotPasswordView from "./views/auth/ForgotPasswordView.tsx";
import NewPasswordView from "./views/auth/NewPasswordView.tsx";
import ProjectTeamView from "./views/ProjectTeamView.tsx";
import ProfileView from "./views/profile/ProfileView.tsx";
import ChangePasswordView from "./views/profile/ChangePasswordView.tsx";
import ProfileLayout from "./layouts/ProfileLayout.tsx";
import NotFound from "./views/404/NotFound.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} index />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} index />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} index />
          <Route path="/projects/:projectId/team" element={<ProjectTeamView />} index />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} index />
            <Route path="/profile/password" element={<ChangePasswordView />} index />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
