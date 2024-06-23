"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react"

const useFetchProjectsById = (user, table, column) => {
    const [retrievedProjects, setRetrievedProjects] = useState('')
    const [isProjectsLoading, setIsProjectsloading] = useState(true)

    const supabase = createClientComponentClient()

    useEffect(() => {
        async function getProjectsById() {
            try {
                // get table entries
                const { data: rows, error: rowsError } = await supabase.from(table)
                    .select()
                    .eq(column, user.id)

                if (rowsError) {
                    throw new Error(rowsError)
                }

                if (rows && rows.length > 0) {
                    
                    // convert array of string ids into an array of numbers
                    const projectIds = rows.map(project => project.project_id)
                    const projectIdsInt = projectIds.map(id => parseInt(id));

                    // get projects using ids
                    const { data: projects, error: projectsError } = await supabase.from('projects')
                        .select()
                        .in('id', projectIdsInt)

                    if (projectsError) {
                        throw new Error(projectsError.message)
                    } else {

                        // Associate projects with their corresponding table rows
                        const extendedProjects = projects.map(project => {
                            const tableEntries = rows.find(row => row.project_id === project.id);
                            return {
                                ...project,
                                tableEntries
                            }
                        });
                        setRetrievedProjects(extendedProjects)
                    }
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setIsProjectsloading(false)
            }
        }

        if (user) {
            getProjectsById()
        }
    }, [user])

    return { retrievedProjects, isProjectsLoading }
}

export { useFetchProjectsById }