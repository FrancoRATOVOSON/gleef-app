import { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from './app-layout'

const meta: Meta<typeof AppLayout> = {
  title: 'App/Layout/AppLayout',
  component: AppLayout
}

export default meta

type Story = StoryObj<typeof AppLayout>

export const Default: Story = {
  args: {
    username: 'John Doe',
    onLogout: async () => {
      alert('Logged out')
    },
    children: (
      <div className="flex min-h-96 w-full items-center justify-center">
        <p>Content goes here</p>
      </div>
    )
  }
}
