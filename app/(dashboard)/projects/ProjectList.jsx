import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

async function getProjects() {
  await new Promise(resolve => setTimeout(resolve, 5000))
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('projects')
  .select()
  
  if (error) {
    console.log(error.message)
  }

  return data
}

const ProjectList = async () => {
  const projects = await getProjects();

  return (
    <div>
      <h2 className="subheading font-b text-hint text-center pb-4">My Projects</h2>
      <section className="mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:grid-flow-col md:auto-cols-fr">

          {projects && projects.map((project) => (
            <div className="mt-4 md:mt-0" key={project.id}>
              <div className="flex flex-col items-center mx-auto max-w-max mb-3 transform transition-transform hover:scale-105">
                <Link href={`/projects/${project.id}`}>
                    <img
                      className="bg-white p-1 w-full h-48 object-cover object-left-top"
                      src={project.image_url}
                      alt={project.list_alt_desc}
                    />
                </Link>
              </div>
                  <h4 className="font-os font-r text-secondary text-center text-md flex-1">{project.title}</h4>  
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}

export default ProjectList

