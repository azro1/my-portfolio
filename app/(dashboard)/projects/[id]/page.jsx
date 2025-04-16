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
    <div className="flex flex-col">
          <div className="main-container">
            <main>
              <div className="flex flex-col items-center py-40 md:py-0 md:h-screen md:min-h-[1154px]">
                <div className="w-full flex-grow flex items-center justify-center">

                  <div className='flex flex-col justify-center h-full'>
                    <Heading className='subheading font-b text-nightSky'>
                       {project.title}
                    </Heading>
                    <div className='mt-6 grid gap-y-6 md:grid-auto-rows md:grid-cols-2'>

                      <div className='hidden md:block rounded-md md:col-span-2 relative w-full'>
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

                      <div className='relative min-h-[380px] md:hidden'>
                        <Image className='w-full h-full object-cover'
                          src={project.mobile_placeholder}
                          alt="mobile placeholder dark background"
                          width={380}
                          height={380}
                          quality={100}
                          priority
                        />

                        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-softGray md:hidden '>
                          <Image className='max-w-[150px] max-h-[150px]'
                            src={project.mobile_image_url}
                            alt="rocket icon"
                            width={200}
                            height={200}
                            quality={100}
                            priority
                          />
                        </div>
                      </div>


                      <div className='md:row-start-2 md:col-start-1 pb-3 md:col-span-2 relative'>
                        <ProjectFavouriteButton className={'absolute right-0 top-1'} projectId={project.id} user={user} />
                        <Heading className='text-xl md:text-1.375 font-b text-nightSky'>
                          Project description
                        </Heading>
                        <p className='pt-2.5 leading-7' >{project.description}</p>
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
                            <a href={project.url} target='_blank' rel="noopener noreferrer">
                              <span className='text-black text-base'>
                                {project.url}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
    </div>
  );
}

export default Project
