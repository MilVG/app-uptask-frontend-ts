import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMenssage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

  const params = useParams()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!
  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.msg)
      reset()
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      projectId,
      taskId,
      formData
    }
    mutate(data)
  }
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className=""
      noValidate
    >
      <div className="flex flex-col gap-2 py-2">
        <label className="font-bold" htmlFor="content">Crear Nota</label>
        <input
          id="content"
          type="text"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value='Crear Nota'
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  )
}

