'use client'

import { ProjectList } from '#/components/app/(index)/project-list'
import { queryClient } from '#/lib/client'
import { queryKeys } from '#/lib/constants'
import { createProject, getProjects } from '#/services/projects'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

export default function HomeComponent() {
  const client = useQueryClient(queryClient)
  const { data } = useQuery({
    queryKey: [queryKeys.getProjects],
    queryFn: getProjects
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => client.invalidateQueries({ queryKey: [queryKeys.getProjects] })
  })

  return <ProjectList isLoading={isPending} onCreate={mutate} projects={data ?? []} />
}
