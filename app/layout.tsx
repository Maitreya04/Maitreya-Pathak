/**
 * Root layout component that wraps all pages in the application.
 * This layout:
 * - Sets up Instrument Serif as the primary font
 * - Configures metadata like title and favicon
 * - Provides the basic HTML structure
 * - Applies font variables to the entire app
 */

import type { Metadata } from "next";
import { instrumentSerif } from "./fonts";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Maitreya's prototypes",
  description: "The home for all my prototypes",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${instrumentSerif.className}`}>
        {children}
      </body>
    </html>
  );
}
