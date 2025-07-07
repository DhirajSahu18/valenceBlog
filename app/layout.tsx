import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Analytics } from '@/components/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ValenceAI Blog',
    template: '%s | ValenceAI Blog'
  },
  description: 'Insights, tutorials, and updates from the ValenceAI team.',
  keywords: ['AI', 'Machine Learning', 'Technology', 'ValenceAI'],
  authors: [{ name: 'ValenceAI Team' }],
  creator: 'ValenceAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valenceai.io',
    title: 'ValenceAI Blog',
    description: 'Insights, tutorials, and updates from the ValenceAI team.',
    siteName: 'ValenceAI Blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ValenceAI Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValenceAI Blog',
    description: 'Insights, tutorials, and updates from the ValenceAI team.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}