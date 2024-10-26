import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectAPI"
import DetailsProject from "@/components/projects/DetailsProject"
export default function DashboardView() {

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading) return 'cargando...'

  if (data) return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y Administra tus proyectos
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
          font-bold cursor-pointer transition-colors"
          to='/projects/create'
        >Nuevo Proyecto</Link>
      </nav>

      {data.length ? (
        data.map(project => (
          <DetailsProject
            key={project._id}
            project={project}
          />
        ))
      ) : (
        <>
          <p className="text-center py-20">No hay proyectos aún {''}</p>
          <Link
            to='/projects/create'
            className="text-fuchsia-500 font-bold"
          >Crear proyectos</Link>
        </>
      )}
    </>
  )
}

