import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, TeamMembersSchema } from "../types";

export async function findUserByEmail({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {
  try {
    const url = `/projects/${projectId}/team/find`
    const response = await api.post(url, formData)
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function addUserToProject({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {
  try {
    const url = `/projects/${projectId}/team`
    const response = await api.post(url, { id })
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function getProjectTeam(projectId: Project['_id']) {
  try {
    const url = `/projects/${projectId}/team`
    const { data } = await api(url)
    const response = TeamMembersSchema.safeParse(data)
    if (response) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
