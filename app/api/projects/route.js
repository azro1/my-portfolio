import { NextResponse } from "next/server"

// forces handlers to be dynamic during development and dynamically built at buid time
export const dynamic = 'force dynamic'

// get
export async function GET() {
  const res = await fetch('http://localhost:8080/projects')
  const projects = await res.json()

  return NextResponse.json(projects, {
    status: 200
  })
}

// post
export async function POST(request) {
    // first make new post to this handler from postman to add a new project which we recieve from this request param and store in const
    const project = await request.json()
  
    // send it to json file in post request
    const res = await fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
  
    // post returns it
    const newProject = await res.json()
  
    // sent it back to postman
    return NextResponse.json(newProject, {
      status: 201
    })
  }
  
