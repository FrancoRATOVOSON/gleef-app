import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { ProjectType } from '#/types/projects'
import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { ProjectCard } from '../project-card'
import { cn } from '#/lib/utils'

interface ProjectListProps {
  onCreate: (name: string) => void
  isLoading: boolean
  projects: Array<ProjectType>
}

function NewProjectComponent({ onCreate, isLoading }: Omit<ProjectListProps, 'projects'>) {
  const [name, setName] = React.useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-fit cursor-pointer">
          {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Enter the name of the new project you want to create.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-4 px-4">
          <Label>Name</Label>
          <Input type="text" onChange={e => setName(e.target.value.trim())} />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isLoading || name.trim() === ''}
            onClick={() => {
              if (name.trim() !== '') {
                onCreate(name.trim())
                setName('')
              }
            }}
          >
            {isLoading ? 'Creating' : 'Create'}
            {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectList({ onCreate, isLoading, projects }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-8">
      <NewProjectComponent onCreate={onCreate} isLoading={isLoading} />
      <div
        className={cn(
          'flex flex-col',
          projects.length > 0
            ? 'items-stretch justify-start gap-4'
            : 'items-center justify-center text-center'
        )}
      >
        {projects.length > 0 ? (
          projects.map(project => <ProjectCard key={project.id} project={project} />)
        ) : (
          <p>No projects available. Create a new project to get started.</p>
        )}
      </div>
    </div>
  )
}
