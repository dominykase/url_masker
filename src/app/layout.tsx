import type { Metadata } from 'next'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import "reflect-metadata";

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
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
