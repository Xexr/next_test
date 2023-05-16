import './globals.css';

export const metadata = {
  title: 'next test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center p-3">
        <main className="flex w-full justify-center pt-3">{children}</main>
      </body>
    </html>
  );
}
