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
    <section className="mt-8.375 lg:mt-12.5">
      <h2 className="subheading text-hint text-center">My Projects</h2>

      <div className="md:grid md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-14">
        {projects.map((project) => (
          <div className="flex-1 mt-6" key={project.id}>
             <Link href={`/projects/${project.id}`}>
              <div className="flex flex-col items-center transform transition-transform hover:scale-105">
                 <Card values={"min-w-0 max-w-sm"}>
                   <img className="w-full" src={project.image_url} alt="a project" />
                 </Card>
                <h4 className="font-rubik text-secondary text-xl mt-4">{project.title}</h4>
              </div>
             </Link>
          </div>
        ))}
      </div>

    </section>
  )
}

export default ProjectList
