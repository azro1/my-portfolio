import Link from "next/link"

import Card from '../components/Card'

async function getProjects() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })
  
  const res = await fetch('http://localhost:8080/projects');
  return res.json();
}

const ProjectList = async () => {
  const projects = await getProjects();

  return (
    <section className="mt-8.375 lg:mt-12.5">
      <h2 className="subheading text-hint text-center pb-8">My Projects</h2>

      <div className="md:grid md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-14">
        {projects.map((project) => (
          <div className="flex-1" key={project.id}>
             <Link href={`/projects/${project.id}`}>
              <div className="flex flex-col items-center transform transition-transform hover:scale-105">
                 <Card values={"min-w-0 w-full"}>
                   <img className="w-full" src={project.url} alt="a project" />
                 </Card>
                <h4 className="font-rubik text-secondary text-xl m-4">{project.title}</h4>
              </div>
             </Link>
          </div>
        ))}
      </div>

    </section>
  )
}

export default ProjectList
