import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import { Skeleton } from '@/components/ui/skeleton'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Wer pfeift wo?',
  description: 'Wer pfeift wo?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-4 gap-4 h-16 border-b">
              <Link href="/" className='flex items-center gap-2'>
              <Image src="/sr-logo.svg" alt="SR Logo" width={28} height={28} />
                <h1 className="text-2xl font-bold">Wer pfeift wo?</h1>
              </Link>
            <div className='flex items-center gap-4'>
            <SignedIn>
              <Link
                href="/dfbnet-data" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                DFBnet Daten
              </Link>
              <UserButton fallback={<Skeleton className="h-[28px] w-[28px] rounded-full" />}/>
            </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}