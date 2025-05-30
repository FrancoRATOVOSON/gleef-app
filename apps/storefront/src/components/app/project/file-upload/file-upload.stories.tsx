import { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './file-upload'

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Project/FileUpload',
  component: FileUpload
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
