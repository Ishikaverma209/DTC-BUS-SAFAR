import { useState } from "react";
import { useLocation, Link } from "wouter";
import {
  Search, MapPin, Clock, Users, ArrowRight, Star,
  Shield, Zap, Bus, ChevronRight, CheckCircle2, Smartphone,
  TrendingUp, Award, HeartHandshake, Wifi
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetPopularRoutes, getGetPopularRoutesQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

const STATS = [
  { value: "50,000+", label: "Seats Booked", icon: Users },
  { value: "200+", label: "DTC Routes", icon: Bus },
  { value: "4.8 / 5", label: "User Rating", icon: Star },
  { value: "98%", label: "On-Time Accuracy", icon: CheckCircle2 },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Book your seat in under 30 seconds. No queues, no waiting — your booking is confirmed immediately.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Shield,
    title: "100% Secure Payments",
    desc: "Your data and payments are fully encrypted. Cancel anytime with hassle-free refunds.",
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    icon: MapPin,
    title: "Village-to-City Routes",
    desc: "We cover stops deep in rural areas, not just city hubs. Find buses from your own village.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Clock,
    title: "Real-Time Schedules",
    desc: "Live departure times and seat availability updated every minute, directly from DTC data.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Smartphone,
    title: "Works on Any Phone",
    desc: "Designed for 2G networks and low-end smartphones. No app download required.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Wifi,
    title: "Offline Booking Receipt",
    desc: "Your booking reference is saved on your device. Show it even without internet.",
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
];

const TESTIMONIALS = [
  {
    name: "Ramesh Kumar",
    village: "Najafgarh, Delhi",
    rating: 5,
    text: "Before AI Safar, I used to stand at the bus stop for hours. Now I book from home and board directly. This has changed my life.",
  },
  {
    name: "Sunita Devi",
    village: "Nilothi Village, West Delhi",
    rating: 5,
    text: "My son helped me register. Now I book seats for the hospital visits myself. Very easy and reliable.",
  },
  {
    name: "Mohit Sharma",
    village: "Badarpur, South Delhi",
    rating: 5,
    text: "I use this every day for work commute. The route details showing exact village stops is very helpful.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search Your Bus",
    desc: "Enter the DTC bus number to see the full route, all village stops, and real-time seat availability.",
  },
  {
    step: "02",
    icon: Users,
    title: "Choose Seats & Date",
    desc: "Pick the number of passengers, your boarding stop, and travel date. Simple and guided.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Get Confirmed",
    desc: "Receive an instant booking reference. Show it at boarding — no printing required.",
  },
];

const QUICK_ROUTES = [
  { bus: "401", from: "ISBT Kashmere Gate", to: "Najafgarh", time: "~95 min", type: "Ordinary" },
  { bus: "764", from: "Nangloi", to: "Shivaji Stadium", time: "~88 min", type: "AC" },
  { bus: "534", from: "Ambedkar Nagar", to: "Mehrauli", time: "~48 min", type: "Ordinary" },
  { bus: "380", from: "Badarpur", to: "Dwarka Sec 23", time: "~100 min", type: "AC" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [busNumber, setBusNumber] = useState("");

  const { data: popularRoutes, isLoading } = useGetPopularRoutes({
    query: { queryKey: getGetPopularRoutesQueryKey() }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      setLocation(`/search?busNumber=${encodeURIComponent(busNumber.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-red-700 to-rose-900 text-white">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
                <Zap className="h-3.5 w-3.5 text-yellow-300" />
                India's First AI-Powered DTC Bus Booking
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
                  Your Village.<br />
                  Your Bus.<br />
                  <span className="text-yellow-300">Your Seat — Secured.</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-lg leading-relaxed">
                  AI Safar connects rural Delhi to the city. Book seats on DTC buses from your village stop, before you leave home.
                </p>
              </div>

              {/* Search box */}
              <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-lg">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Enter Bus Number</p>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g. 401, 764, DL1PC..."
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    className="flex-1 text-gray-900 text-base border-gray-200 focus-visible:ring-primary h-11"
                  />
                  <Button type="submit" size="lg" className="shrink-0 gap-2 px-5">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </form>
                <div className="flex flex-wrap gap-2 mt-3 px-1">
                  {["401", "534", "764", "380", "615", "DL1PC"].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setLocation(`/search?busNumber=${n}`)}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors font-medium"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="gap-2 font-semibold bg-white text-primary hover:bg-white/90">
                    Create Free Account <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/search?busNumber=401">
                  <Button size="lg" variant="ghost" className="gap-2 text-white border border-white/30 hover:bg-white/10">
                    Browse All Routes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="/hero-bus.png"
                  alt="DTC bus on a Delhi street"
                  className="w-full aspect-video object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["R", "S", "M"].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold border-2 border-white">{l}</div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">50,000+ travelers</p>
                  <p className="text-xs text-gray-500">booked this week</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-xl shadow-xl px-3 py-2 text-center">
                <p className="text-lg font-extrabold leading-none">4.8</p>
                <div className="flex justify-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-yellow-300 text-yellow-300" />)}
                </div>
                <p className="text-xs mt-0.5 text-green-100">Rated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="space-y-1">
                <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-extrabold text-white">{value}</p>
                <p className="text-sm text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ROUTE CARDS ───────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Quick Book a Route</h2>
              <p className="text-muted-foreground mt-1">Most popular DTC routes — click to book instantly</p>
            </div>
            <Link href="/search?busNumber=401">
              <Button variant="outline" size="sm" className="gap-1 hidden md:flex">
                See All <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ROUTES.map((r) => (
              <div
                key={r.bus}
                onClick={() => setLocation(`/search?busNumber=${r.bus}`)}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    {r.bus}
                  </span>
                  <Badge variant="secondary" className="text-xs">{r.type}</Badge>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-xs text-muted-foreground font-medium">FROM</p>
                  <p className="font-semibold text-sm text-foreground leading-tight">{r.from}</p>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <div className="h-px flex-1 bg-gray-200" />
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-xs text-muted-foreground font-medium">TO</p>
                  <p className="font-semibold text-sm text-foreground leading-tight">{r.to}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {r.time}
                  </div>
                  <span className="text-xs font-semibold text-primary group-hover:underline">Book Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR ROUTES FROM API ─────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">All DTC Routes</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold">Popular Bus Routes</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Connecting villages and districts across Delhi with reliable DTC service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)
              : popularRoutes?.map((route) => (
                <Card
                  key={route.busNumber}
                  className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all rounded-2xl group border"
                  onClick={() => setLocation(`/search?busNumber=${route.busNumber}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <Bus className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-base">Bus {route.busNumber}</p>
                          <Badge variant="outline" className="text-xs mt-0.5">{route.type}</Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground line-clamp-1 font-medium">{route.origin}</span>
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground line-clamp-1 font-medium">{route.destination}</span>
                    </div>
                    <div className="flex items-center gap-4 pt-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {route.frequency}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {route.totalStops} stops
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ───────────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Why AI Safar</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold">Everything You Need to Travel Smart</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Designed ground-up for Delhi's rural commuters. Simple, fast, and always reliable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Simple Process</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold">Book in 3 Easy Steps</h2>
            <p className="text-muted-foreground mt-2">No training needed. If you can use a phone, you can book a seat.</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }, idx) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-px border-t-2 border-dashed border-primary/30" />
                )}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-950 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-14 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Real Stories</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold">Trusted by Delhi's Commuters</h2>
            <p className="text-muted-foreground mt-2">Hear from villagers whose daily travel has changed forever.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t.village}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ────────────────────────────────────────── */}
      <section className="py-10 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: "SSL Encrypted", sub: "Bank-grade security" },
              { icon: Award, label: "Govt. Recognised", sub: "Official DTC Partner" },
              { icon: HeartHandshake, label: "Rural First", sub: "Built for villages" },
              { icon: TrendingUp, label: "Growing Fast", sub: "10,000 new users/month" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-bold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-primary to-rose-800 text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Travel Smarter?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Join 50,000+ commuters who've stopped waiting at bus stops. Create your free account and book your first seat today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 px-8">
                Start for Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/search?busNumber=401">
              <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 gap-2 px-8">
                Search Routes <Search className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
