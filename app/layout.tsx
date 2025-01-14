import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.scss"
import { ReactNode } from "react"
import { Topbar } from "@/components/topbar/topbar"
import { Provider } from "jotai"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "JLLM",
  description: "LLM BY JLLM",
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <Provider>
      <Topbar />
      {children}
    </Provider>
    </body>
    </html>
  )
}
