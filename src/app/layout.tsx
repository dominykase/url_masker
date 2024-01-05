import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'

const lato = Lato({ subsets: ['latin'], weight: ["300"] })

export const metadata: Metadata = {
  title: 'Shorten your URLs',
  description: 'Shorten your URLs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
