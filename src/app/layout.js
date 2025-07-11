

export const metadata = {
  title: 'Alloitte News Website',
  description: 'Get the latest news from around the world',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <main className="container mx-auto px-4 py-7">
          <header className="mb-2">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">Alloitte _ News Website</h1>
            <p className="text-center text-gray-600">Stay updated with the latest headlines</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}