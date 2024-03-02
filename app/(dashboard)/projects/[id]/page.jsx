import { notFound } from 'next/navigation'
export const dynamicParams = true;
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// components
import Icons from '@/app/components/Icons';
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
      <div className='grid gap-y-6 md:gap-y-6 md:grid-auto-rows md:grid-cols-2'>
        <div className='mt-6'>
          <Card values={'w-full'}>
            <img className='w-full' src={project.image_url} alt='a project' />
          </Card>
        </div>
        <div className='md:row-start-2 md:col-start-1 pb-3 md:col-span-2'>
          <h3 className='text-1.375 font-b text-hint'>Project Description</h3>
          <p className='pt-3 leading-6 font-cn text-sm'>{project.description}</p>
        </div>
        <div className='row-start-3 col-start-1 md:col-start-2 md:row-start-1 md:mt-20 md:pl-8'>
          <div className='pb-6 md:pb-8'>
            <div className='font-cn font-b text-base text-hint'>
              Start Date:{' '}
              <span className='text-sm text-secondary font-cn font-r'>
                {project.start}
              </span>
            </div>
            <div className='font-cn font-b text-base text-hint'>
              End Date:{' '}
              <span className='text-sm text-secondary font-cn font-r'>
                {project.end}
              </span>
            </div>
          </div>
          <div className='pb-6 md:pb-8'>
            <div className='font-cn font-b text-base text-hint'>
              Tech Stack:{' '}
              <span className='text-sm text-secondary font-cn font-r'>
                {project.techstack.map((stack) => (
                   <span className='techstack' key={stack}>
                    {stack}
                   </span>
                ))}
              </span>
            </div>
            <div className='font-cn font-b text-base text-hint'>
              Key Contributors:{' '}
              <span className='text-sm text-secondary font-cn font-r'>
                {project.contributions}
              </span>
            </div>
          </div>
          <div>
            <div className='font-cn font-b text-base text-hint'>
              Project Url:{' '}
              <a href={project.project_url} target='_blank'>
                <span className='text-sm text-secondary font-cn font-r'>
                  {project.project_url}
                </span>
              </a>
            </div>
          </div>
        </div>
        <Icons values={"flex gap-x-5 h-4.75 items-center md:col-start-2 md:place-content-end md:items-end"} />
      </div>
    </main>
  );
}

export default Project
