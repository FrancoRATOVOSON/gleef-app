import { Meta, StoryObj } from '@storybook/react'
import { Hero } from './hero'

const meta: Meta<typeof Hero> = {
  title: 'Components/Index/Hero',
  component: Hero
}

export default meta

type Story = StoryObj<typeof Hero>

export const Default: Story = {
  args: {}
}
