"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useCallback } from "react"

const useFetchProjectsById = (user, table, column) => {
    const [retrievedProjects, setRetrievedProjects] = useState([])
    const [isProjectsLoading, setIsProjectsloading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null);

    const supabase = createClientComponentClient()
    
    const getProjectsById = useCallback(async () => {
        try {
            if (user) {
                // get table entries
                const { data: rows, error: rowsError } = await supabase.from(table)
                    .select()
                    .eq(column, user.id)

                if (rowsError) {
                    setErrorMessage(`Sorry! We're currently unbale to display your ${table.replace('_', ' ')} right now. Please try refreshing the page or check back later.`);
                    console.log('table error:', rowsError.message)
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
                        setErrorMessage("An unexpected error occured and we are unable to display your activity feed data at this time. Please try refreshing the page or try again later. If the issue persists, contact support.");
                        console.log('projects error:', projectsError.message)
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
            }
            return true
        } catch (error) {
            console.log(error.message)
            return false
        } finally {
            setIsProjectsloading(false)
        }
    }, [supabase, user, table, column])

    return { retrievedProjects, isProjectsLoading, errorMessage, getProjectsById }
}

export { useFetchProjectsById }