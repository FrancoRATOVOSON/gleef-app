import React from 'react'
import LayoutComponent from './component'

export default function Layout({ children }: React.PropsWithChildren) {
  return <LayoutComponent>{children}</LayoutComponent>
}
