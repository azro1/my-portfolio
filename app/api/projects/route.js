import { NextResponse } from "next/server"

// get
export async function GET() {
  const res = await fetch('http://localhost:8080/projects')
  const projects = await res.json()

  return NextResponse.json(projects, {
    status: 200
  })
}
