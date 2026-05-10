export function Footer() {
  return (
    <footer className="border-t bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
        <p className="font-medium text-foreground">DTC Bus Seva</p>
        <p>A life-changing seat booking platform for villagers who depend on Delhi Transport Corporation buses.</p>
        <p className="mt-4">&copy; {new Date().getFullYear()} DTC Bus Seva. All rights reserved.</p>
      </div>
    </footer>
  );
}
