import { editProject } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {

  const params = useParams()
  const projectId = params.projectId!

  const { data, isError, isLoading } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => editProject(projectId),
    retry: false
  })

  if (isLoading) return 'cargando...'
  if (isError) return <Navigate to='/404' />

  return <EditProjectForm />
}

