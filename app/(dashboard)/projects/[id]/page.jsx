import { notFound } from 'next/navigation'
export const dynamicParams = true;
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// components
// import Icons from '@/app/components/Icons';
import Card from "@/app/components/Card";

// dynamic metadata
export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: project } = await supabase.from('projects')
  .select()
  .eq('id', params.id)
  .single()

  return {
    title: `My Portfolio | ${project?.title} || Project Not Found`,
    description: 'A brief summary of the project, outlining its purpose, goals, and key features'
  }
}

async function getProject(id) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('projects')
  .select()
  .eq('id', id)
  .single()

  if (!data) {
    notFound()
  }
  return data
}

const Project = async ({ params }) => {
  const project = await getProject(params.id);

  return (
    <main className='my-4.5'>
      <h2 className='subheading text-hint'>{project.title}</h2>
      <div className='grid gap-y-6 md:gap-y-10 md:grid-auto-rows md:grid-cols-2'>

        <Card values={'mt-6 p-3 rounded-md md:col-span-2 md:h-full'} >
          <div className='bg-white p-3 h-full'>
              <img className='w-full h-96 object-cover object-left-top' src={project.image_url} alt={project.alt_desc} />
          </div>
        </Card>
        
        <div className='md:row-start-2 md:col-start-1 pb-3 md:col-span-2'>
          <h3 className='text-1.375 font-b text-hint'>Project Description</h3>
          <p className='pt-3 leading-6 font-os text-sm'>{project.description}</p>
        </div>
        <div className='row-start-3 col-start-1 md:col-start-1 md:row-start-3'>
          <div className='pb-6 md:pb-8'>
            <div className='font-os text-sm text-secondary'>
              Start Date:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.start}
              </span>
            </div>
            <div className='font-os text-sm text-secondary'>
              End Date:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.end}
              </span>
            </div>
          </div>
          <div className='pb-6 md:pb-8'>
            <div className='font-os text-sm text-secondary'>
              Tech Stack:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.techstack.map((stack) => (
                   <span className='techstack' key={stack}>
                    {stack}
                   </span>
                ))}
              </span>
            </div>
            <div className='font-os text-sm text-secondary'>
              Key Contributors:{' '}
              <span className='text-sm text-secondary font-os font-r'>
                {project.contributions}
              </span>
            </div>
          </div>
          <div>
            <div className='font-os text-sm text-secondary'>
              Project Url:{' '}
              <a href={project.url} target='_blank'>
                <span className='text-sm text-blue-500 font-os font-r'>
                  {project.url}
                </span>
              </a>
            </div>
          </div>
        </div>
        {/* <Icons values={"flex gap-x-5 h-4.75 items-center md:col-start-2 md:row-start-3 md:place-content-end md:self-end md:items-end"} color={"#F6F9FF"} /> */}
      </div>
    </main>
  );
}

export default Project
