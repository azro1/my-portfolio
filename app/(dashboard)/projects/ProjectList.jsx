import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Card from '../../components/Card'

async function getProjects() {
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
      <h2 className="subheading text-hint text-center mb-5">My Projects</h2>
      <section className="mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:grid-flow-col md:auto-cols-fr">

          {projects && projects.map((project) => (
            <div className="mt-4 md:mt-0" key={project.id}>
              <div className="flex flex-col items-center mx-auto max-w-max mb-3 transform transition-transform hover:scale-105">
                <Link href={`/projects/${project.id}`}>
                  <Card values={'p-3 rounded-md'}>
                    <img
                      className="bg-white p-1 w-full h-56 object-cover object-left-top"
                      src={project.image_url}
                      alt={'image'}
                    />
                  </Card>
                </Link>
              </div>
                <h4 className="font-os font-r text-secondary text-center text-md">{project.title}</h4>
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}

export default ProjectList

