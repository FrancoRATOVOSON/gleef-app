import { fetchPOST } from '#/lib/utils'
import { CredentialsType, UserType } from '#/types/auth'

export const login = (credentials: CredentialsType) =>
  fetchPOST<UserType, CredentialsType>('/auth/login', credentials, { credentials: undefined })

export const signup = (credentials: CredentialsType) =>
  fetchPOST<UserType, CredentialsType>('/auth/signup', credentials, { credentials: undefined })

export const logout = () => fetchPOST<void, undefined>('/auth/logout', undefined)
