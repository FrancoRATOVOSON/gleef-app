/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react'
import { AuthForm } from './auth-form'
import { useState } from 'react'

const meta: Meta<typeof AuthForm> = {
  title: 'Components/Auth/AuthForm',
  component: AuthForm
}

export default meta

type Story = StoryObj<typeof AuthForm>

export const Login: Story = {
  args: {
    mode: 'login'
  },
  render: args => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: { username: string; password: string }) => {
      setIsLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      alert(`Login successful for ${data.username}`)

      setIsLoading(false)
    }

    return (
      <div>
        <AuthForm {...args} isLoading={isLoading} onSubmit={handleSubmit} />
      </div>
    )
  }
}

export const Signup: Story = {
  args: {
    mode: 'signup'
  },
  render: args => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: { username: string; password: string }) => {
      setIsLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      alert(`Signup successful for ${data.username}`)

      setIsLoading(false)
    }

    return (
      <div>
        <AuthForm {...args} isLoading={isLoading} onSubmit={handleSubmit} />
      </div>
    )
  }
}
