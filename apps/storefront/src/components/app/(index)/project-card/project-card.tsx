import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ProjectType } from '#/types/projects'

interface ProjectCardProps {
  project: ProjectType
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { id, name, createdAt } = project

  return (
    <div className="shadow-xs flex h-fit w-full flex-col justify-between gap-2 rounded-lg border px-6 py-4 transition-shadow duration-200 hover:shadow-sm">
      <Link href={`/project/${id}`} className="flex items-center justify-start gap-2">
        <p className="text-lg font-semibold">{name}</p>
        <ArrowRight className="h-4 w-4" />
      </Link>
      <p className="text-muted-foreground text-sm">{format(createdAt, 'PPPPp')}</p>
    </div>
  )
}
