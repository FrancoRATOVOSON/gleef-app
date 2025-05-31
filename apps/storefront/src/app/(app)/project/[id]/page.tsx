import React from 'react'
import ProjectPageComponent from './component'

export default async function ProjectPage({
  params: paramsPromise
}: {
  params: Promise<{ id: string }>
}) {
  const params = await paramsPromise

  return <ProjectPageComponent id={params.id} />
}
