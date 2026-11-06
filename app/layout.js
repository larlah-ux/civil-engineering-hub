import './globals.css';

export const metadata = {
  title: 'The Civil Engineering Hub',
  description: 'A professional community for Civil Engineering students and graduates.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}