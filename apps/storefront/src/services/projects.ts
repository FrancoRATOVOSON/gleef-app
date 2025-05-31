import { fetchGET, fetchPOST } from '#/lib/utils'
import { ProjectType } from '#/types/projects'

export const getProjects = () => fetchGET<ProjectType[]>('/projects')

export const createProject = (name: string) =>
  fetchPOST<void, { name: string }>('/project/create', { name })
