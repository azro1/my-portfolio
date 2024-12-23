import { notFound } from 'next/navigation'
export const dynamicParams = true;
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from "uuid"
import Image from 'next/image';


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
  await new Promise((resolve) => setTimeout(resolve, 3000))
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
  
    const { error } = await supabase.from('project_views')
    .upsert({
        id: uuidv4(),
        updated_at: new Date().toISOString(),
        project_id: params.id,
        user_id: user ? user.id : null
      })
    .select()
    .single()

    if (error) {
      console.log(error)
    }
  
  
  
  return (
    <div className='flex flex-col justify-start'>
      <h2 className='subheading font-b text-saddleBrown'>{project.title}</h2>
      <div className='mt-8 grid gap-y-6 md:grid-auto-rows md:grid-cols-2'>

        <Card values={'p-3 rounded-md md:col-span-2 relative w-full h-[380px] lg:h-auto'} >
              <Image 
                  className='w-full h-full object-cover' 
                  src={project.image_url} 
                  alt={project.alt_desc}
                  width={1348}
                  height={596}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"
                  quality={100}
                  priority
              />
        </Card>

        <div className='md:row-start-2 md:col-start-1 pb-3 md:col-span-2 relative'>
          <ProjectFavouriteButton className={'absolute right-0 top-1'} projectId={project.id} user={user} />
          <h3 className='text-1.375 font-b text-saddleBrown'>Project Description</h3>
          <p className='pt-3 leading-7' >{project.description}</p>
        </div>

        <div className='row-start-3 col-start-1 md:col-start-1 md:row-start-3'>
          <div className='pb-6 md:pb-8'>
            <div className='text-ashGray text-base leading-7'>
              Start Date:{' '}
              <span className='text-ashGray text-base'>
                {project.start}
              </span>
            </div>
            <div className='text-ashGray text-base leading-7'>
              End Date:{' '}
              <span className='text-ashGray text-base'>
                {project.end}
              </span>
            </div>
          </div>
          <div className='pb-6 md:pb-8'>
            <div className='text-ashGray text-base leading-7'>
              Tech Stack:{' '}
              <span className='text-ashGray text-base'>
                {project.techstack.map((stack) => (
                   <span className='techstack ' key={stack}>
                    {stack}
                   </span>
                ))}
              </span>
            </div>
            <div className='text-ashGray text-base leading-7'>
              Key Contributors:{' '}
              <span className='text-ashGray text-base'>
                {project.contributions}
              </span>
            </div>
          </div>
          <div>
            <div className='text-ashGray text-base leading-7'>
              Project Url:{' '}
              <a href={project.url} target='_blank'>
                <span className='text-saddleBrown text-base'>
                  {project.url}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project
