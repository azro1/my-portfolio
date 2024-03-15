
const Skills = () => {

  return (
    <section>
      <div className='flex flex-col place-items-center md:flex-row md:items-center md:justify-between gap-8'>
        <div className='w-full md:w-1/2'>
          <h2 className='subheading text-secondary font-r text-center mb-5'>
            Technical Skills
          </h2>

          <div className='ts-inner text-secondary shadow-inner rounded-lg p-10'>


            <div className='ts-inner-wrapper'>

              <div className='relative mb-6'>
                <p>Hmtl</p>
                <div className='progress-bar shadow-inner mt-2 p-3'>
                  <div></div>
                </div>
                <p className='absolute right-0 top-0'>64%</p>
              </div>

              <div className='relative mb-6'>
                <p>Css</p>
                <div className='progress-bar shadow-inner mt-2 p-3'>
                  <div></div>
                </div>
                <p className='absolute right-0 top-0'>78%</p>
              </div>

              <div className='relative mb-6'>
                <p>JavaScript</p>
                <div className='progress-bar shadow-inner mt-2 p-3'>
                  <div></div>
                </div>
                <p className='absolute right-0 top-0'>86%</p>
              </div>

              <div className='relative mb-6'>
                <p>Php</p>
                <div className='progress-bar shadow-inner mt-2 p-3'>
                  <div></div>
                </div>
                <p className='absolute right-0 top-0'>52%</p>
              </div>
              
            </div>



          </div>
        </div>

        <div className='progress-skills text-secondary md:w-1/2'>
          <h2 className='subheading font-r text-center mb-5'>
            Professional Skills
          </h2>

          <ul className='text-center grid grid-col-1 gap-10 md:grid-cols-2 place-items-center shadow-inner rounded-lg p-10'>
            <li className='communication flex flex-col items-center gap-2'>
              <div className='progress-circle '>
                <div className="outer">
                  <div className="inner">
                     <div>75%</div>
                  </div>
                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                  <defs>
                     <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                     </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="40" stroke-linecap="round" />
                </svg>

              </div>
              <div>Communication</div>
            </li>
            <li className='team-work flex flex-col items-center gap-2'>
              <div className='progress-circle'>
                <div className="outer">
                  <div className="inner">
                    <div>56%</div>
                  </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                  <defs>
                     <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                     </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="40" stroke-linecap="round" />
                </svg>

              </div>
              <div>Team Work</div>
            </li>
            <li className='adaptability flex flex-col items-center gap-2'>
              <div className='progress-circle'>
                <div className="outer">
                  <div className="inner">
                    <div>45%</div>

                  </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                  <defs>
                     <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                     </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="40" stroke-linecap="round" />
                </svg>

              </div>
              <div>Adaptability</div>
            </li>
            <li className='problem-solving flex flex-col items-center gap-2'>
              <div className='progress-circle'>
                <div className="outer">
                  <div className="inner">
                  <div>60%</div>

                  </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                  <defs>
                     <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                     </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="40" stroke-linecap="round" />
                </svg>
              </div>
              <div>Problem Solving</div>
            </li>
          </ul>
          
        </div>
      </div>
    </section>
  );
};

export default Skills;
