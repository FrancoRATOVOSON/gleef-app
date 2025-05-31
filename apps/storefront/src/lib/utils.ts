import { ApiError } from '#/errors/ApiError'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function apiFetch<T>(endpoint: string, options: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  if (!response.ok) {
    let errorBody: unknown
    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }
    throw new ApiError(response.status, response.statusText, errorBody)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function fetchGET<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'GET',
    ...options
  })
}

export function fetchPOST<T, U>(endpoint: string, body: U, options: RequestInit = {}): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'POST',
    ...options,
    body: JSON.stringify(body)
  })
}

export function fetchPUT<T, U>(endpoint: string, body: U, options: RequestInit = {}): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(body)
  })
}
