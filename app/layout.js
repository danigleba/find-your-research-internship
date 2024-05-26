import Head from "next/head"
import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portiko",
  description: "Find scientific collaborations in minutes",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
