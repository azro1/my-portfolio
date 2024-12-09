"use client"

import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Card from "./Card";


const Sidebar = () => {
  return (
    <div className="min-h-[400px] xl:min-w-[400px] xl:min-h-screen bg-softCharcoal items-center ">

        <div className="xl:min-w-[400px] h-full xl:fixed">
            <div className="h-full flex flex-col gap-20 xl:gap-40">

                <Link href="/">
                    <div className="p-20 flex flex-col items-center">
                        <Card values={'shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'}>
                            <h2 className='mainheading font-eb text-saddleBrown'>
                                Port<span className="text-stoneGray">folio</span>
                            </h2>
                        </Card>
                    </div>
                    <div className='bg-nightSky h-[3px]'></div>
                </Link>

                <nav>
                  <ul>
                    <li>
                      <Link href="/forum">
                        <div className="flex items-center justify-start pl-8 rounded-tl-full rounded-bl-full group w-4/5 ml-auto hover:bg-nightSky p-4 ">
                          <FaComments className="text-saddleBrown" size={30} />
                          <span className="text-base text-center text-ashGray group-hover:text-frostWhite transition duration-300 ml-3.5">Conversations</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </nav>

            </div>

        </div>

    </div>
  )
}

export default Sidebar
