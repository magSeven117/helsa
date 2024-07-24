
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-3 h-full w-full">
      <div className="w-100 flex justify-between items-center h-[10%] px-[15px] box-border mt-4">
        <h1 className="text-3xl font-bold">Helsa</h1>
      </div>
      <p className="text-sm text-center my-5 text-muted-foreground">
        Complete the steps to create your account
      </p>
      <div className="w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}