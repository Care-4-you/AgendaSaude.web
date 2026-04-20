export default function RootLayoutDashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[calc(100vh-68px)] w-full bg-agenda-saude-blue-100 pt-20">
      {children}
    </main>
  );
}
