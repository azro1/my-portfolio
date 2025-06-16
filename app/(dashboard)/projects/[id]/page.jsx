import { notFound } from 'next/navigation'
export const dynamicParams = true;
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from "uuid"
import Image from 'next/image';


// components
import ProjectFavouriteButton from '../ProjectFavouriteButton';
import Heading from '@/app/components/Heading';

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
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
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
    <div className="main-container flex-1 flex flex-col">
        <main className='flex flex-grow'>
          <div className="flex-1 pt-36 pb-20 md:p-0 md:h-screen md:min-h-[1154px]">

              <div className='flex flex-col justify-center gap-4 h-full relative'>
                <div className='flex gap-2'>
                  <Heading className='font-bold text-nightSky subheading'>
                    {project.title}
                  </Heading>
                  <ProjectFavouriteButton projectId={project.id} user={user} />
                </div>


                <div className='flex flex-col gap-6'>

                  <div className='hidden w-full md:block'>
                    <Image
                      className='w-full h-full'
                      src={project.image_url}
                      alt={project.alt_desc}
                      width={1348}
                      height={596}
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"
                      quality={100}
                      priority
                    />
                  </div>

              
                  <div className='min-h-[200px] sm:max-w-xs relative bg-white md:hidden'>
                    <Image className='max-w-[100px] max-h-[100px] mx-auto my-auto'
                      src={project.mobile_image_url}
                      alt="Animated SVG image representing the project on mobile"
                      fill
                      quality={100}
                      priority
                    />
                  </div>


                  <div className='flex flex-col gap-1'>
                    <Heading className='text-lg md:text-xl font-bold text-nightSky'>
                      Project description
                    </Heading>
                    <p>{project.description}</p>
                  </div>

                  <div>
                    <div className='text-ashGray text-base'>
                      <span className='text-nightSky font-bold'>Start Date:{' '}</span>
                      <span className='text-ashGray text-base'>
                        {project.start}
                      </span>
                    </div>
                    <div className='text-ashGray text-base'>
                      <span className='text-nightSky font-bold'>End Date:{' '}</span>
                      <span className='text-ashGray text-base'>
                        {project.end}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className='text-ashGray text-base'>
                      <span className='text-nightSky font-bold'>Tech Stack:{' '}</span>
                      <span className='text-ashGray text-base'>
                        {project.techstack.map((stack) => (
                          <span className='techstack ' key={stack}>
                            {stack}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className='text-ashGray text-base'>
                      <span className='text-nightSky font-bold'>Key Contributors:{' '}</span>
                      <span className='text-ashGray text-base'>
                        {project.contributions}
                      </span>
                    </div>
                  </div>

                  <div className='text-ashGray text-base'>
                    <span className='text-nightSky font-bold'>Project Url:{' '}</span>
                    <a href={project.url} target='_blank' rel="noopener noreferrer">
                      <span className='text-goldenOchre text-base'>
                        {project.url}
                      </span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
        </main>
    </div>
  );
}

export default Project
