import { Navbar } from "./Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative flex-1">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <footer className="border-t py-8 md:py-12 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center">
                  <span className="font-bold text-xs">DTC</span>
                </div>
                Bus Seva
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connecting rural Delhi with reliable public transport. Dedicated to serving our community with safe, regular, and accessible buses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/search" className="hover:text-primary transition-colors">Find a Bus</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Timetables</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Fares & Passes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Lost & Found</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Helpline</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="font-medium text-foreground">1800-11-8181</li>
                <li>Available 24x7</li>
                <li className="mt-4"><a href="#" className="text-primary hover:underline font-medium">Report an issue</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Delhi Transport Corporation. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
