import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import Navigation from '@/components/Navigation'
import BootstrapClient from '@/components/BootstrapClient'

export const metadata: Metadata = {
  title: 'Restaurant Table Booking - La Maison d\'Or',
  description: 'Book your table and seat at La Maison d\'Or Restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <BootstrapClient />
      </body>
    </html>
  )
}
