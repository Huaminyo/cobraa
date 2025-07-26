import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "COBRA PROTOCOL",
  description:
    "AI-native crypto protocol deployed on BASE network via APE STORE. Stealth-grade intelligence for decentralized strikes.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00BFFF" />
        <meta property="og:title" content="COBRA PROTOCOL" />
        <meta property="og:description" content="AI-native crypto protocol deployed on BASE network via APE STORE" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="COBRA PROTOCOL" />
        <meta name="twitter:description" content="Stealth-grade intelligence for decentralized strikes" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
