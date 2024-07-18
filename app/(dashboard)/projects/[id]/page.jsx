import { notFound } from 'next/navigation'
export const dynamicParams = true;
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from "uuid"

// components
import Card from "@/app/components/Card";
import ProjectFavouriteButton from '../ProjectFavouriteButton';

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
  await new Promise(resolve => setTimeout(resolve, 5000))
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

  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
    const { error } = await supabase.from('activity')
    .upsert({
        id: uuidv4(),
        updated_at: new Date().toISOString(),
        project_id: params.id,
        activity_id: user ? user.id : null
      })
    .select()
    .single()

    if (error) {
      console.log(error)
    }
  
  
  
  return (
    <main className='my-4.5'>
      <h2 className='subheading font-b text-hint'>{project.title}</h2>

      <div className='grid gap-y-6 md:gap-y-10 md:grid-auto-rows md:grid-cols-2'>

        <Card values={'mt-6 p-3 rounded-md md:col-span-2 md:h-full'} >
          <div className='bg-white p-3 h-full'>
              <img className='w-full h-96 object-cover object-left-top' src={project.image_url} alt={project.alt_desc} />
          </div>
        </Card>

        <div className='md:row-start-2 md:col-start-1 pb-3 md:col-span-2 relative'>
          <ProjectFavouriteButton className={'absolute right-0 top-1'} projectId={project.id} user={user} />
          <h3 className='text-1.375 font-b text-hint'>Project Description</h3>
          <p className='pt-3 leading-7' >{project.description}</p>
        </div>

        <div className='row-start-3 col-start-1 md:col-start-1 md:row-start-3'>
          <div className='pb-6 md:pb-8'>
            <div className='text-secondary text-base leading-7'>
              Start Date:{' '}
              <span className='text-secondary text-base'>
                {project.start}
              </span>
            </div>
            <div className='text-secondary text-base leading-7'>
              End Date:{' '}
              <span className='text-secondary text-base'>
                {project.end}
              </span>
            </div>
          </div>
          <div className='pb-6 md:pb-8'>
            <div className='text-secondary text-base leading-7'>
              Tech Stack:{' '}
              <span className='text-secondary text-base'>
                {project.techstack.map((stack) => (
                   <span className='techstack ' key={stack}>
                    {stack}
                   </span>
                ))}
              </span>
            </div>
            <div className='text-secondary text-base leading-7'>
              Key Contributors:{' '}
              <span className='text-secondary text-base'>
                {project.contributions}
              </span>
            </div>
          </div>
          <div>
            <div className='text-secondary text-base leading-7'>
              Project Url:{' '}
              <a href={project.url} target='_blank'>
                <span className='text-hint text-base'>
                  {project.url}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Project
