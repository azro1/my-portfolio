import Image from "next/image";
import { FaHtml5, FaCss3Alt, FaJs, FaNode, FaReact, FaPhp } from 'react-icons/fa';
import Card from "./Card";

const Skills = () => {
  return (

    <section>
    
        <div className="flex flex-col place-items-center md:flex-row md:items-center md:justify-between gap-8 shadow-inner rounded-lg p-10">

          <div className="w-full md:w-1/2">
              <h2 className='subheading text-secondary font-r text-center mb-5'>Technical Skills</h2>

              <div className="mh-skills-inner text-secondary shadow-inner rounded-lg py-5 px-10">
                 <div className="mt-8">
                    <div className="candidatos">
                        <div className="partial">
                            <div className="relative mb-6">
                               <div className="text-sm ">Hmtl</div>
                               <div className="progress-bar shadow-inner mt-2 p-3"></div>
                               <div className="text-sm  absolute right-0 top-0">86%</div>
                             </div>

                             <div className="relative mb-6">
                               <div className="text-sm ">Css</div>
                               <div className="progress-bar shadow-inner mt-2 p-3"></div>
                               <div className="text-sm  absolute right-0 top-0">86%</div>
                             </div>
                        </div>
                    </div>
                     <div className="candidatos">
                        <div className="partial">
                            <div className="relative mb-6">
                               <div className="text-sm ">JavaScript</div>
                               <div className="progress-bar shadow-inner mt-2 p-3"></div>
                               <div className="text-sm  absolute right-0 top-0">46%</div>
                             </div>

                             <div className="relative mb-6">
                               <div className="text-sm ">Php</div>
                               <div className="progress-bar shadow-inner mt-2 p-3"></div>
                               <div className="text-sm  absolute right-0 top-0">86%</div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

          </div>
    
          <div className="md:w-1/2">

          <div className="professional-skills text-secondary">
          <h2 className='subheading text-secondary font-r text-center mb-5'>Professional Skills</h2>

              <ul className="text-center grid grid-col-1 gap-10 md:grid-cols-2 place-items-center shadow-inner rounded-lg p-9">
                  <li className="flex flex-col items-center gap-2">
                      <div className="progress-circle"></div>
                      <div>Communication</div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                      <div className="progress-circle"></div>
                      <div>Team Work</div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                      <div className="progress-circle"></div>
                      <div>Adaptability</div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                      <div className="progress-circle"></div>
                      <div>Problem Solving</div>
                  </li>
              </ul>

          </div>
          </div>
    
        </div>
 
    </section>

  );
}

export default Skills
