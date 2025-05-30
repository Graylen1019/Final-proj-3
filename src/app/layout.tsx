import './globals.css'
// Define metadata for your application (optional, but good for SEO)
export const metadata = {
  title: 'OMDb Movie Search',
  description: 'Search for movies and TV shows using the OMDb API with Next.js App Router.',
};

// This is the root layout component for your Next.js application.
// It wraps all pages and provides a consistent structure.
export default function RootLayout({
  children, // The 'children' prop represents the current page component
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
