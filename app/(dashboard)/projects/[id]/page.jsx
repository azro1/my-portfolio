import { notFound } from 'next/navigation'
export const dynamicParams = true;

// components
import Icons from '@/app/components/Icons';
import Card from "@/app/components/Card";

// dynamic metadata
export async function generateMetadata({ params }) {
  const id = params.id;
  const res = await fetch(`http://localhost:8080/projects/${id}`)
  const project = await res.json()

  return {
    title: `My Portfolio | ${project.title}`,
    description: 'A brief summary of the project, outlining its purpose, goals, and key features'
  }
}

// provide all of the ids to Next so that it knows how many routes and pages it needs to make so that they can be rendered way in advance at build time into html pages and distributed to a CDN so that they can be served up quickly when requested
export async function generateStaticParams () {
  const res = await fetch('http://localhost:8080/projects');
  const projects = await res.json();

  return projects.map((project) => ({
    id: project.id
  }))
}

async function getProject(id) {
  const res = await fetch(`http://localhost:8080/projects/${id}`, {
    next: {
      revalidate: 86400 // re-validates page after 1 day so Next can use static rendering for this page
    }
  })

  if (!res.ok) {
    notFound()
  }
  return res.json()
}

const Project = async ({ params }) => {
  const project = await getProject(params.id);

  return (
    <main className='my-24'>
      <h1 className='title text-hint font-b'>{project.title}</h1>
      <div className='grid gap-y-6 md:gap-y-6 md:grid-auto-rows md:grid-cols-2'>
        <div className='mt-6'>
          <Card values={'w-full'}>
            <img className='w-full' src={project.image_url} alt='a project' />
          </Card>
        </div>
        <div className='md:row-start-2 md:col-start-1 pb-3 md:col-span-2'>
          <h2 className='subheading text-hint'>Project Description</h2>
          <p className='pt-3 leading-6 text-sm'>{project.description}</p>
        </div>
        <div className='row-start-3 col-start-1 md:col-start-2 md:row-start-1 md:mt-20 md:pl-8'>
          <div className='pb-6 md:pb-8'>
            <p className='font-os font-b text-base text-hint'>
              Start Date:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.start}
              </span>
            </p>
            <p className='font-os font-b text-base text-hint'>
              End Date:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.end}
              </span>
            </p>
          </div>
          <div className='pb-6 md:pb-8'>
            <p className='font-os font-b text-base text-hint'>
              Tech Stack:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.techstack.map((stack) => (
                   <span className='techstack' key={stack}>
                    {stack}
                   </span>
                ))}
              </span>
            </p>
            <p className='font-os font-b text-base text-hint leading-6'>
              Key Contributors:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.contributions}
              </span>
            </p>
          </div>
          <div>
            <p className='font-rubik font-b text-base text-hint'>
              Project Url:{' '}
              <a href={project.project_url} target='_blank'>
                <span className='text-sm text-secondary font-os font-r'>
                  {project.project_url}
                </span>
              </a>
            </p>
          </div>
        </div>
        <Icons values={"flex gap-x-5 md:h-4.75 md:col-start-2 md:place-content-end md:items-end"} />
      </div>
    </main>
  );
}

export default Project
