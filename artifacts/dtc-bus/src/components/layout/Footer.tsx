import { Link } from "wouter";
import { Train, MapPin, Phone, Mail, Shield, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-14 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
                <Train className="h-5 w-5" />
              </div>
              <span className="text-white font-extrabold text-xl">AI <span className="text-primary">Safar</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Delhi's smartest bus booking platform. Built for villagers, powered by AI — your seat is secured before you step out.
            </p>
            <div className="flex gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Shield className="h-3.5 w-3.5 text-primary" /> Secure Booking
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Zap className="h-3.5 w-3.5 text-primary" /> Instant Confirm
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Search Routes", href: "/search?busNumber=401" },
                { label: "My Bookings", href: "/bookings" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Register", href: "/register" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-primary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Popular Routes</h4>
            <ul className="space-y-2.5">
              {[
                "Bus 401 – ISBT to Najafgarh",
                "Bus 764 – Nangloi to Shivaji Stadium",
                "Bus 534 – Ambedkar Nagar to Mehrauli",
                "Bus 380 – Badarpur to Dwarka",
                "DL1PC – Rohini to Dilshad Garden",
              ].map((route) => (
                <li key={route} className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  {route}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact & Help</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-primary shrink-0" /> 1800-XXX-XXXX (Toll Free)
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-primary shrink-0" /> help@aisafar.in
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" /> DTC Headquarters, IP Estate, New Delhi – 110002
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xs text-primary font-medium">DTC Helpline</p>
              <p className="text-xs text-gray-400 mt-0.5">Available 24/7 for booking support</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} AI Safar. All rights reserved. Powered by Delhi Transport Corporation data.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
