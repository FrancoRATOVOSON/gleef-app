import { Meta, StoryObj } from '@storybook/react'
import { AddToken } from './add-token'

const meta: Meta<typeof AddToken> = {
  title: 'Components/Project/AddToken',
  component: AddToken
}

export default meta

type Story = StoryObj<typeof AddToken>

const onSubmit = (fullKey: string, values: { [locales: string]: string | null }) => {
  return new Promise<void>(() => {
    console.log(`Created ${fullKey} with ${JSON.stringify(values)}`)
  })
}

export const Default: Story = {
  args: {
    isSubmitting: false,
    onSubmit,
    fullKey: 'root.parent',
    locales: ['fr-FR', 'en-US']
  }
}
