import { Meta, StoryObj } from '@storybook/react'
import { ProjectCard } from './project-card'

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/Home/ProjectCard',
  component: ProjectCard
}

export default meta

type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: {
    id: '4Z3RTYU8',
    name: 'Sample Project',
    createdAt: '2023-10-01T12:00:00Z'
  }
}
