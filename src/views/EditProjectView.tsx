import { editProject } from "@/api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export default function EditProjectView() {

  const params = useParams()
  const projectId = params.projectId!

  const { data, isError, isLoading } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => editProject(projectId),
    retry: false
  })

  console.log(data);


  return (
    <div>EditProjectView</div>
  )
}

