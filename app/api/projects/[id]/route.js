import { NextResponse } from "next/server"

// forces handlers to be dynamic during development and dynamically built at buid time
export const dynamic = 'force dynamic'





// get single
export async function GET(_, { params }) {
  const id = params.id;

  const res = await fetch('http://localhost:8080/projects/' + id)

  if (!res.ok) {
    return NextResponse.json({ error: 'project does not exist!' }, {
      status: 404
    })
  }

  const project = await res.json()

  return NextResponse.json(project, {
    status: 200
  })
}





// delete
export async function DELETE(_, { params }) {
  const id = params.id;

  const res = await fetch('http://localhost:8080/projects/' + id, {
    method: 'DELETE'
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'project does not exist!' }, {
      status: 404
    })
  }

  return NextResponse.json({ message: 'project deleted!' }, {
    status: 200
  })
}