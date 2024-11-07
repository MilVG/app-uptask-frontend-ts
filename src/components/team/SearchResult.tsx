import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProp = {
  user: TeamMember
  reset: () => void
}
export default function SearchResult({ user, reset }: SearchResultProp) {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.msg)
      reset()
      navigate(location.pathname, { replace: true })
    }
  })

  const handleAddUserProject = () => {
    const data = {
      projectId,
      id: user._id
    }
    mutate(data)
  }
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado: </p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserProject}
        >Agregar al Proyecto</button>
      </div>
    </>
  )
}

