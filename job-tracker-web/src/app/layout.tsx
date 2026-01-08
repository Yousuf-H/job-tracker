import "./globals.css";
import TopNav from "./applications/_components/TopNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
