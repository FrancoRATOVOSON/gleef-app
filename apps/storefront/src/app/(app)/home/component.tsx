'use client'

import { ProjectList } from '#/components/app/home/project-list'
import { createProject, getProjects } from '#/services/projects'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

export default function HomeComponent() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['get-projects'],
    queryFn: getProjects
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-projects'] })
  })

  return <ProjectList isLoading={isPending} onCreate={mutate} projects={data ?? []} />
}
