export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Contact List</p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
};
