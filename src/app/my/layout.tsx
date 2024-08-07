export default async function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen px-4 py-6 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">마이페이지</h1>
        </header>
        <>{children}</>
      </div>
    </div>
  );
}
