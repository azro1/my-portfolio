"use client"

import { useState, useEffect, useRef } from "react";

const Skills = () => {

  // professional skills
  const [communicationPercent, setCommunicationPercent] = useState(0)
  const communicationPercentId = useRef()
  const [teamworkPercent, setTeamworkPercent] = useState(0)
  const teamworkPercentId = useRef()
  const [adaptabilityPercent, setAdaptabilityPercent] = useState(0)
  const adaptabilityPercentId = useRef()
  const [problemSolvingPercent, setproblemSolvingPercent] = useState(0)
  const problemSolvingPercentId = useRef()

  const [isCommunicationPaused, setIsCommunicationPaused] = useState(false);
  const [isTeamworkPaused, setIsTeamworkPaused] = useState(false);
  const [isAdaptabilityPaused, setIsAdaptabilityPaused] = useState(false);
  const [isProblemSolvingPaused, setProblemSolvingPaused] = useState(false)


  // technical skills
  const [htmlPercent, setHtmlPercent] = useState(0);
  const htmlPercentId = useRef();
  const [cssPercent, setCssPercent] = useState(0);
  const cssPercentId = useRef();
  const [jsPercent, setJsPercent] = useState(0);
  const jsPercentId = useRef();
  const [phpPercent, setPhpPercent] = useState(0);
  const phpPercentId = useRef();

  const [isHtmlPaused, setIsHtmlPaused] = useState(false)
  const [isCssPaused, setIsCssPaused] = useState(false)
  const [isJsPaused, setIsJsPaused] = useState(false)
  const [isPhpPaused, setIsPhpPaused] = useState(false)


  const [resetTrigger, setResetTrigger] = useState(false);


  // Reset professional skill and technical skill counts after 100 seconds
  useEffect(() => {
    if (resetTrigger) {
      setTimeout(() => {
        // professional skills
        setIsCommunicationPaused(false); // Unpause communication
        setCommunicationPercent(0); // Reset communication count
        setIsTeamworkPaused(false); // Unpause teamwork
        setTeamworkPercent(0); // Reset teamwork count
        setIsAdaptabilityPaused(false); // Unpause adaptability
        setAdaptabilityPercent(0); // Reset adaptability count
        setProblemSolvingPaused(false); // Unpause problemSolving
        setproblemSolvingPercent(0); // Reset problemSolving count

        // technical skills
        setIsHtmlPaused(false)
        setHtmlPercent(0);
        setIsCssPaused(false);
        setCssPercent(0);
        setIsJsPaused(false);
        setJsPercent(0);
        setIsPhpPaused(false);
        setPhpPercent(0);

        setResetTrigger(false); // Reset the trigger
      }, 99000); // 100000ms = 100 seconds(1 min 40s) but deducted 1 second here to compensate for 1 second animation delay
    }
  }, [resetTrigger]);


  // communication
  useEffect(() => {
    communicationPercentId.current = setInterval(() => {
      if (!isCommunicationPaused) {
        setCommunicationPercent(prev => {
          if (prev === 75) {
            setIsCommunicationPaused(true);
            setResetTrigger(true)
            return prev;
          }
          return prev + 1;
        })
      }
    }, 24)
    return () => clearInterval(communicationPercentId.current)
  }, [isCommunicationPaused])


  // teamwork
  useEffect(() => {
    teamworkPercentId.current = setInterval(() => {
      if (!isTeamworkPaused) {
        setTeamworkPercent(prev => {
          if (prev === 56) {
            setIsTeamworkPaused(true);
            setResetTrigger(true); 
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(teamworkPercentId.current)
  }, [isTeamworkPaused])


  // adaptability
  useEffect(() => {
    adaptabilityPercentId.current = setInterval(() => {
      if (!isAdaptabilityPaused) {
        setAdaptabilityPercent(prev => {
          if (prev === 45) {
            setIsAdaptabilityPaused(true); // Pause the count
            setResetTrigger(true);
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(adaptabilityPercentId.current)
  }, [isAdaptabilityPaused])


  // // problem solving
  useEffect(() => {
    problemSolvingPercentId.current = setInterval(() => {
      if (!isProblemSolvingPaused) {
        setproblemSolvingPercent(prev => {
          if (prev === 60) {
            setProblemSolvingPaused(true);
            setResetTrigger(true);
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(problemSolvingPercentId.current)
  }, [isProblemSolvingPaused])


  // html
  useEffect(() => {
    htmlPercentId.current = setInterval(() => {
      if (!isHtmlPaused) {
        setHtmlPercent(prev => {
          if (prev === 64) {
            setIsHtmlPaused(true);
            setResetTrigger(true);
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(htmlPercentId.current)
  }, [isHtmlPaused])
  
  
  // css
  useEffect(() => {
    cssPercentId.current = setInterval(() => {
      if (!isCssPaused) {
        setCssPercent(prev => {
          if (prev === 78) {
            setIsCssPaused(true);
            setResetTrigger(true);
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(cssPercentId.current)
  }, [isCssPaused])
  

  // js
  useEffect(() => {
    jsPercentId.current = setInterval(() => {
      if (!isJsPaused) {
        setJsPercent(prev => {
          if (prev === 50) {
            setIsJsPaused(true);
            setResetTrigger(true);
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(jsPercentId.current)
  }, [isJsPaused])


  // php
  useEffect(() => {
    phpPercentId.current = setInterval(() => {
      if (!isPhpPaused) {
        setPhpPercent(prev => {
          if (prev === 35) {
            setIsPhpPaused(true);
            setResetTrigger(true);
            return prev;
          }
          return prev + 1
        })
      }
    }, 24)
    return () => clearInterval(phpPercentId.current)
  }, [isPhpPaused])

  return (
    <section>
      <div className='flex flex-col place-items-center gap-y-6.25 md:flex-row md:items-stretch'>

        <div className='w-full flex-1'>
          <div className='mx-auto md:mx-0 max-w-xs'>
            <h2 className='subheading font-b text-saddleBrown text-center pb-8'>
              Technical Skills
            </h2>

              <div className='ts-inner-wrapper text-ashGray flex flex-col gap-6'>
                <div className='relative'>
                  <p>Hmtl</p>
                  <div className='progress-bar shadow-inner mt-4 p-0.312'>
                    <div></div>
                  </div>
                  <p className='absolute right-0 top-0 text-ashGray' ref={htmlPercentId}>{htmlPercent}%</p>
                </div>
                <div className='relative'>
                  <p>Css</p>
                  <div className='progress-bar shadow-inner mt-4 p-0.312'>
                    <div></div>
                  </div>
                  <p className='absolute right-0 top-0 text-ashGray' ref={cssPercentId}>{cssPercent}%</p>
                </div>
                <div className='relative'>
                  <p>JavaScript</p>
                  <div className='progress-bar shadow-inner mt-4 p-0.312'>
                    <div></div>
                  </div>
                  <p className='absolute right-0 top-0 text-ashGray' ref={jsPercentId}>{jsPercent}%</p>
                </div>
                <div className='relative'>
                  <p>Php</p>
                  <div className='progress-bar shadow-inner mt-4 p-0.312'>
                    <div></div>
                  </div>
                  <p className='absolute right-0 top-0 text-ashGray' ref={phpPercentId}>{phpPercent}%</p>
                </div>
            </div>
          </div>
        </div>




        <div className='flex-1 flex flex-col'>
          <div className='max-w-xs ml-auto'>
            <h2 className='subheading font-b text-saddleBrown text-center pb-8'>
              Professional Skills
            </h2>

            <ul className='text-ashGray text-center flex flex-wrap gap-y-6'>
              <li className='organisation flex flex-col items-center justify-center gap-1 px-2 flex-1'>
                <div className='progress-circle mb-1'>
                  <div className="outer">
                    <div className="inner">
                      <div className="text-ashGray" ref={communicationPercentId}>{communicationPercent}%</div>
                    </div>
                  </div>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                    <defs>
                      <linearGradient id="GradientColor">
                          <stop offset="0%" stopColor="#e91e63" />
                          <stop offset="100%" stopColor="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="45" strokeLinecap="butt" />
                  </svg>

                </div>
                <p>Organisation</p>
              </li>
              <li className='teamwork flex flex-col items-center justify-center gap-1  px-2 flex-1'>
                <div className='progress-circle mb-1'>
                  <div className="outer">
                    <div className="inner">
                      <div className="text-ashGray" ref={teamworkPercentId}>{teamworkPercent}%</div>
                    </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                    <defs>
                      <linearGradient id="GradientColor">
                          <stop offset="0%" stopColor="#e91e63" />
                          <stop offset="100%" stopColor="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="45" strokeLinecap="butt" />
                  </svg>

                </div>
                <p>Teamwork</p>
              </li>
              <li className='adaptability flex flex-col items-center justify-center gap-1 px-2 flex-1'>
                <div className='progress-circle mb-1'>
                  <div className="outer">
                    <div className="inner">
                      <div className="text-ashGray" ref={adaptabilityPercentId}>{adaptabilityPercent}%</div>

                    </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                    <defs>
                      <linearGradient id="GradientColor">
                          <stop offset="0%" stopColor="#e91e63" />
                          <stop offset="100%" stopColor="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="45" strokeLinecap="butt" />
                  </svg>

                </div>
                <p>Adaptability</p>
              </li>
              <li className='research-skills flex flex-col items-center justify-center gap-1 px-2 flex-1'>
                <div className='progress-circle mb-1'>
                  <div className="outer">
                    <div className="inner">
                    <div className="text-ashGray" ref={problemSolvingPercentId}>{problemSolvingPercent}%</div>

                    </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                    <defs>
                      <linearGradient id="GradientColor">
                          <stop offset="0%" stopColor="#e91e63" />
                          <stop offset="100%" stopColor="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="45" strokeLinecap="butt" />
                  </svg>
                </div>
                <p className="frostWhitespace-nowrap">Research-skills</p>
              </li>
            </ul>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Skills;
