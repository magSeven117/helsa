const ErrorSheet = () => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <h1 className="text-xl">Error</h1>
      <p className="text-muted-foreground text-xs">An error occurred while trying to load the page.</p>
    </div>
  );
};

export default ErrorSheet;
