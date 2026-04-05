export const metadata = {
  title: 'Test Taschenrechner',
  description: 'A simple calculator app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-950 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
