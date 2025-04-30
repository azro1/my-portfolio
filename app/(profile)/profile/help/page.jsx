"use client"

import { useEffect, useState } from "react"

// components
import BrevoChatWidget from "./BrevoChatWidget";
import Heading from "@/app/components/Heading";

const Help = () => {
  const [userQuery, setUserQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [queryResults, setQueryResults] = useState([]);

  useEffect(() => {
    fetch(`${location.origin}/data/faqs.json`)
      .then(response => response.json())
      .then(json => setQuestions(json))
  }, [])

  useEffect(() => {
    if (userQuery) {
      const { faqs } = questions;
      const query = faqs.filter(faq => faq.question.toLowerCase().includes(userQuery.toLowerCase()))
      setQueryResults(query);
    } else {
      setQueryResults([]);
    }
  }, [questions, userQuery])

  return (
    <div className='flex px-[x-pad]'>
      <main>
        <div className='h-screen flex pt-40 pb-20 min-h-[924px] md:min-h-[1034px] xl:pt-36 xl:pb-28'>

          <div className='w-full h-full flex flex-col'>
            <Heading className='font-medium text-cloudGray text-1.375 md:text-2xl '>
                How Can We Help?
            </Heading>
            <p className='text-charcoalGrayLight mt-4'>Use the search bar to find answers to frequently asked questions or contact us via the online chat for further assistance</p>

            <input
              type='text'
              spellCheck='false'
              placeholder='Search...'
              className='w-full h-max mt-6 py-2.5 md:py-4 px-4 outline-none text-stoneGray bg-nightSky'
              onChange={(e) => setUserQuery(e.target.value)}
            />

            <div className='flex-1 flex flex-col gap-12 w-full p-4 mt-4 overflow-y-scroll hide-scrollbar bg-nightSky'>
              {queryResults.length > 0 ? (
                queryResults.map(result => (
                  <div key={result.id}>
                    <Heading className='font-medium text-cloudGray text-xl md:text-1.375'> 
                      {result.question}
                    </Heading>
                    <p className='text-ashGray pt-2'>{result.answer}</p>
                  </div>
                ))) : (
                <div className='flex-1 flex items-center justify-center'>
                  <p>No results</p>
                </div>
              )}
            </div>
            <BrevoChatWidget />

          </div>

        </div>
      </main>

    </div>
  )
}

export default Help
