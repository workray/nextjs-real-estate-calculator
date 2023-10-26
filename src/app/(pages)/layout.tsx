'use client'
import { Header } from '@/components'
import { ThemeProvider } from 'next-themes'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  )
}

export default PageLayout
