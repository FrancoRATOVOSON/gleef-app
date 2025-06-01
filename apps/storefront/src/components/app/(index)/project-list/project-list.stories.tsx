import { Meta, StoryObj } from '@storybook/react'
import { ProjectList } from './project-list'

const meta: Meta<typeof ProjectList> = {
  title: 'Components/Home/ProjectList',
  component: ProjectList
}

export default meta

type Story = StoryObj<typeof ProjectList>

const mockProjects = [
  {
    id: '1',
    name: 'Project Alpha',
    createdAt: '2023-10-01T12:00:00Z'
  },
  {
    id: '2',
    name: 'Project Beta',
    createdAt: '2023-10-02T12:00:00Z'
  },
  {
    id: '3',
    name: 'Project Gamma',
    createdAt: '2023-10-03T12:00:00Z'
  }
]

export const Default: Story = {
  args: {
    onCreate: async (name: string) => {
      console.log(`Creating project with name: ${name}`)
    },
    isLoading: false,
    projects: mockProjects
  }
}

export const Empty: Story = {
  args: {
    onCreate: async (name: string) => {
      console.log(`Creating project with name: ${name}`)
    },
    isLoading: false,
    projects: []
  }
}

export const Loading: Story = {
  args: {
    onCreate: async (name: string) => {
      console.log(`Creating project with name: ${name}`)
    },
    isLoading: true,
    projects: mockProjects
  }
}
