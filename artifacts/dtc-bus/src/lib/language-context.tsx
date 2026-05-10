import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.routes": "Routes",
    "nav.bookings": "My Bookings",
    "nav.dashboard": "Dashboard",
    "nav.login": "Log in",
    "nav.getStarted": "Get Started",
    "nav.logout": "Logout",

    // Home hero
    "home.hero.badge": "India's First AI-Powered DTC Bus Booking",
    "home.hero.line1": "Your Village.",
    "home.hero.line2": "Your Bus.",
    "home.hero.line3": "Your Seat — Secured.",
    "home.hero.sub": "AI Safar connects rural Delhi to the city. Book seats on DTC buses from your village stop, before you leave home.",
    "home.hero.inputLabel": "Enter Bus Number",
    "home.hero.inputPlaceholder": "e.g. 401, 764, DL1PC...",
    "home.hero.search": "Search",
    "home.hero.createAccount": "Create Free Account",
    "home.hero.browse": "Browse All Routes",
    "home.hero.travelers": "travelers booked this week",

    // Stats
    "home.stats.seats": "Seats Booked",
    "home.stats.routes": "DTC Routes",
    "home.stats.rating": "User Rating",
    "home.stats.ontime": "On-Time Accuracy",

    // Quick routes
    "home.quick.title": "Quick Book a Route",
    "home.quick.sub": "Most popular DTC routes — click to book instantly",
    "home.quick.seeAll": "See All",
    "home.quick.from": "FROM",
    "home.quick.to": "TO",
    "home.quick.bookNow": "Book Now",

    // Popular routes
    "home.popular.badge": "All DTC Routes",
    "home.popular.title": "Popular Bus Routes",
    "home.popular.sub": "Connecting villages and districts across Delhi with reliable DTC service.",
    "home.popular.stops": "stops",

    // Features
    "home.features.badge": "Why AI Safar",
    "home.features.title": "Everything You Need to Travel Smart",
    "home.features.sub": "Designed ground-up for Delhi's rural commuters. Simple, fast, and always reliable.",
    "home.features.f1.title": "Instant Confirmation",
    "home.features.f1.desc": "Book your seat in under 30 seconds. No queues, no waiting — your booking is confirmed immediately.",
    "home.features.f2.title": "100% Secure Payments",
    "home.features.f2.desc": "Your data and payments are fully encrypted. Cancel anytime with hassle-free refunds.",
    "home.features.f3.title": "Village-to-City Routes",
    "home.features.f3.desc": "We cover stops deep in rural areas, not just city hubs. Find buses from your own village.",
    "home.features.f4.title": "Real-Time Schedules",
    "home.features.f4.desc": "Live departure times and seat availability updated every minute, directly from DTC data.",
    "home.features.f5.title": "Works on Any Phone",
    "home.features.f5.desc": "Designed for 2G networks and low-end smartphones. No app download required.",
    "home.features.f6.title": "Offline Booking Receipt",
    "home.features.f6.desc": "Your booking reference is saved on your device. Show it even without internet.",

    // How it works
    "home.how.badge": "Simple Process",
    "home.how.title": "Book in 3 Easy Steps",
    "home.how.sub": "No training needed. If you can use a phone, you can book a seat.",
    "home.how.s1.title": "Search Your Bus",
    "home.how.s1.desc": "Enter the DTC bus number to see the full route, all village stops, and real-time seat availability.",
    "home.how.s2.title": "Choose Seats & Date",
    "home.how.s2.desc": "Pick the number of passengers, your boarding stop, and travel date. Simple and guided.",
    "home.how.s3.title": "Get Confirmed",
    "home.how.s3.desc": "Receive an instant booking reference. Show it at boarding — no printing required.",

    // Testimonials
    "home.testimonials.badge": "Real Stories",
    "home.testimonials.title": "Trusted by Delhi's Commuters",
    "home.testimonials.sub": "Hear from villagers whose daily travel has changed forever.",
    "home.testimonials.t1.name": "Ramesh Kumar",
    "home.testimonials.t1.village": "Najafgarh, Delhi",
    "home.testimonials.t1.text": "Before AI Safar, I used to stand at the bus stop for hours. Now I book from home and board directly. This has changed my life.",
    "home.testimonials.t2.name": "Sunita Devi",
    "home.testimonials.t2.village": "Nilothi Village, West Delhi",
    "home.testimonials.t2.text": "My son helped me register. Now I book seats for hospital visits myself. Very easy and reliable.",
    "home.testimonials.t3.name": "Mohit Sharma",
    "home.testimonials.t3.village": "Badarpur, South Delhi",
    "home.testimonials.t3.text": "I use this every day for my work commute. The route details showing exact village stops is very helpful.",

    // Trust
    "home.trust.t1": "SSL Encrypted",
    "home.trust.t1s": "Bank-grade security",
    "home.trust.t2": "Govt. Recognised",
    "home.trust.t2s": "Official DTC Partner",
    "home.trust.t3": "Rural First",
    "home.trust.t3s": "Built for villages",
    "home.trust.t4": "Growing Fast",
    "home.trust.t4s": "10,000 new users/month",

    // CTA
    "home.cta.title": "Ready to Travel Smarter?",
    "home.cta.sub": "Join 50,000+ commuters who've stopped waiting at bus stops. Create your free account and book your first seat today.",
    "home.cta.register": "Start for Free",
    "home.cta.search": "Search Routes",

    // Search page
    "search.title": "Search Results",
    "search.newSearch": "New Search",
    "search.noNumber": "No bus number provided",
    "search.goHome": "Go Back Home",
    "search.notFound": "Could not find bus route. Please check the number and try again.",
    "search.available": "Available",
    "search.full": "Full",
    "search.frequency": "Frequency",
    "search.totalStops": "Total Stops",
    "search.nextDepartures": "Next Departures",
    "search.bookSeat": "Book Seat",
    "search.routeStops": "Route Stops",
    "search.minArrival": "min",

    // Book page
    "book.title": "Book Seat on Bus",
    "book.desc": "Secure your journey. Please fill in the details below.",
    "book.boardingStop": "Boarding Stop",
    "book.dropStop": "Drop Stop",
    "book.selectStop": "Select stop",
    "book.travelDate": "Date of Travel",
    "book.passenger": "Passenger Details",
    "book.fullName": "Full Name",
    "book.enterName": "Enter full name",
    "book.age": "Age",
    "book.years": "Years",
    "book.seats": "Number of Seats",
    "book.seatsUnit": "Seat",
    "book.seatsUnits": "Seats",
    "book.cancel": "Cancel",
    "book.confirm": "Confirm Booking",
    "book.confirming": "Confirming...",
    "book.noStop": "No bus selected",
    "book.selectBothStops": "Please select both boarding and drop stops",
    "book.success": "Booking confirmed successfully!",

    // Bookings page
    "bookings.title": "My Bookings",
    "bookings.busNumber": "Bus Number",
    "bookings.ref": "Booking Ref",
    "bookings.travelDate": "Travel Date",
    "bookings.journey": "Journey",
    "bookings.passenger": "Passenger",
    "bookings.cancelBtn": "Cancel Booking",
    "bookings.confirmed": "Confirmed",
    "bookings.cancelled": "Cancelled",
    "bookings.empty.title": "No bookings yet",
    "bookings.empty.sub": "You haven't booked any bus tickets.",
    "bookings.findBus": "Find a Bus",
    "bookings.cancelConfirm": "Are you sure you want to cancel this booking?",
    "bookings.cancelSuccess": "Booking cancelled",

    // Dashboard
    "dash.welcome": "Welcome back,",
    "dash.sub": "Here is your travel summary with AI Safar.",
    "dash.bookNew": "Book New Ticket",
    "dash.totalBookings": "Total Bookings",
    "dash.upcoming": "Upcoming Trips",
    "dash.cancelled": "Cancelled",
    "dash.recentBookings": "Recent Bookings",
    "dash.viewAll": "View All",
    "dash.noRecent": "No recent bookings.",
    "dash.popularRoutes": "Popular Routes",
    "dash.book": "Book",
    "dash.to": "to",

    // Login
    "login.welcome": "Welcome Back",
    "login.desc": "Enter your credentials to access your account",
    "login.email": "Email",
    "login.password": "Password",
    "login.btn": "Log In",
    "login.loading": "Logging in...",
    "login.noAccount": "Don't have an account?",
    "login.signup": "Sign up",
    "login.alreadyIn": "You are already logged in!",
    "login.success": "Login Successful!",

    // Register
    "reg.title": "Create an Account",
    "reg.desc": "Join AI Safar to start booking",
    "reg.name": "Full Name",
    "reg.namePh": "Your full name",
    "reg.email": "Email",
    "reg.emailPh": "name@example.com",
    "reg.password": "Password",
    "reg.passwordPh": "Create a password",
    "reg.btn": "Create Account",
    "reg.loading": "Creating...",
    "reg.haveAccount": "Already have an account?",
    "reg.login": "Log in",
    "reg.success": "Account created! Welcome to AI Safar.",
  },

  hi: {
    // Nav
    "nav.home": "होम",
    "nav.routes": "रूट",
    "nav.bookings": "मेरी बुकिंग",
    "nav.dashboard": "डैशबोर्ड",
    "nav.login": "लॉग इन",
    "nav.getStarted": "शुरू करें",
    "nav.logout": "लॉग आउट",

    // Home hero
    "home.hero.badge": "भारत की पहली AI-आधारित DTC बस बुकिंग",
    "home.hero.line1": "आपका गाँव।",
    "home.hero.line2": "आपकी बस।",
    "home.hero.line3": "आपकी सीट — पक्की।",
    "home.hero.sub": "AI Safar ग्रामीण दिल्ली को शहर से जोड़ता है। घर से निकलने से पहले DTC बस में अपनी सीट बुक करें।",
    "home.hero.inputLabel": "बस नंबर डालें",
    "home.hero.inputPlaceholder": "जैसे 401, 764, DL1PC...",
    "home.hero.search": "खोजें",
    "home.hero.createAccount": "मुफ़्त खाता बनाएं",
    "home.hero.browse": "सभी रूट देखें",
    "home.hero.travelers": "यात्रियों ने इस हफ्ते बुकिंग की",

    // Stats
    "home.stats.seats": "सीटें बुक हुईं",
    "home.stats.routes": "DTC रूट",
    "home.stats.rating": "यूज़र रेटिंग",
    "home.stats.ontime": "समय पर सटीकता",

    // Quick routes
    "home.quick.title": "जल्दी बुक करें",
    "home.quick.sub": "सबसे लोकप्रिय DTC रूट — तुरंत बुक करने के लिए क्लिक करें",
    "home.quick.seeAll": "सभी देखें",
    "home.quick.from": "से",
    "home.quick.to": "तक",
    "home.quick.bookNow": "अभी बुक करें",

    // Popular routes
    "home.popular.badge": "सभी DTC रूट",
    "home.popular.title": "लोकप्रिय बस रूट",
    "home.popular.sub": "दिल्ली के गाँवों और जिलों को भरोसेमंद DTC सेवा से जोड़ते हैं।",
    "home.popular.stops": "स्टॉप",

    // Features
    "home.features.badge": "AI Safar क्यों?",
    "home.features.title": "स्मार्ट यात्रा के लिए सब कुछ",
    "home.features.sub": "दिल्ली के ग्रामीण यात्रियों के लिए बना। सरल, तेज़, और हमेशा भरोसेमंद।",
    "home.features.f1.title": "तुरंत पुष्टि",
    "home.features.f1.desc": "30 सेकंड में सीट बुक करें। कोई कतार नहीं, कोई इंतज़ार नहीं — बुकिंग तुरंत पक्की।",
    "home.features.f2.title": "100% सुरक्षित भुगतान",
    "home.features.f2.desc": "आपका डेटा और भुगतान पूरी तरह एन्क्रिप्टेड है। कभी भी रद्द करें, आसान रिफ़ंड।",
    "home.features.f3.title": "गाँव-से-शहर रूट",
    "home.features.f3.desc": "हम सिर्फ शहरी हब नहीं, बल्कि गाँव के स्टॉप भी कवर करते हैं।",
    "home.features.f4.title": "रियल-टाइम टाइमटेबल",
    "home.features.f4.desc": "हर मिनट अपडेट होने वाले लाइव डिपार्चर टाइम और सीट उपलब्धता।",
    "home.features.f5.title": "हर फोन पर चलता है",
    "home.features.f5.desc": "2G नेटवर्क और सस्ते स्मार्टफोन के लिए बना। कोई ऐप डाउनलोड नहीं।",
    "home.features.f6.title": "ऑफलाइन बुकिंग रसीद",
    "home.features.f6.desc": "बुकिंग रेफरेंस आपके डिवाइस में सेव रहता है। बिना इंटरनेट दिखाएं।",

    // How it works
    "home.how.badge": "आसान प्रक्रिया",
    "home.how.title": "3 आसान कदमों में बुक करें",
    "home.how.sub": "कोई ट्रेनिंग नहीं चाहिए। अगर फोन चला सकते हैं, तो सीट बुक कर सकते हैं।",
    "home.how.s1.title": "बस खोजें",
    "home.how.s1.desc": "DTC बस नंबर डालें, पूरा रूट, गाँव के स्टॉप और सीट उपलब्धता देखें।",
    "home.how.s2.title": "सीट और तारीख चुनें",
    "home.how.s2.desc": "यात्रियों की संख्या, बोर्डिंग स्टॉप और यात्रा की तारीख चुनें।",
    "home.how.s3.title": "पुष्टि पाएं",
    "home.how.s3.desc": "तुरंत बुकिंग रेफरेंस मिलेगा। बोर्डिंग पर दिखाएं — प्रिंट की ज़रूरत नहीं।",

    // Testimonials
    "home.testimonials.badge": "असली कहानियाँ",
    "home.testimonials.title": "दिल्ली के यात्रियों का भरोसा",
    "home.testimonials.sub": "उन ग्रामीणों से सुनें जिनकी रोज़ की यात्रा बदल गई।",
    "home.testimonials.t1.name": "रमेश कुमार",
    "home.testimonials.t1.village": "नजफगढ़, दिल्ली",
    "home.testimonials.t1.text": "AI Safar से पहले घंटों बस स्टॉप पर खड़ा रहता था। अब घर से बुक करके सीधे चढ़ता हूं। जीवन बदल गया।",
    "home.testimonials.t2.name": "सुनीता देवी",
    "home.testimonials.t2.village": "निलोठी गाँव, पश्चिम दिल्ली",
    "home.testimonials.t2.text": "बेटे ने रजिस्टर करवाया। अब अस्पताल जाने के लिए खुद बुक कर लेती हूं। बहुत आसान और भरोसेमंद।",
    "home.testimonials.t3.name": "मोहित शर्मा",
    "home.testimonials.t3.village": "बदरपुर, दक्षिण दिल्ली",
    "home.testimonials.t3.text": "रोज़ ऑफिस के लिए इस्तेमाल करता हूं। गाँव के स्टॉप का सटीक विवरण बहुत काम आता है।",

    // Trust
    "home.trust.t1": "SSL एन्क्रिप्टेड",
    "home.trust.t1s": "बैंक जैसी सुरक्षा",
    "home.trust.t2": "सरकार मान्यता प्राप्त",
    "home.trust.t2s": "आधिकारिक DTC भागीदार",
    "home.trust.t3": "ग्रामीण प्राथमिकता",
    "home.trust.t3s": "गाँवों के लिए बना",
    "home.trust.t4": "तेज़ी से बढ़ रहे हैं",
    "home.trust.t4s": "10,000 नए यूज़र/महीना",

    // CTA
    "home.cta.title": "स्मार्ट यात्रा शुरू करें?",
    "home.cta.sub": "50,000+ यात्री जो बस स्टॉप पर इंतज़ार करना छोड़ चुके हैं। आज ही मुफ़्त खाता बनाएं।",
    "home.cta.register": "मुफ़्त शुरू करें",
    "home.cta.search": "रूट खोजें",

    // Search page
    "search.title": "खोज परिणाम",
    "search.newSearch": "नई खोज",
    "search.noNumber": "कोई बस नंबर नहीं दिया गया",
    "search.goHome": "होम पर जाएं",
    "search.notFound": "बस रूट नहीं मिला। नंबर जांचें और दोबारा कोशिश करें।",
    "search.available": "उपलब्ध",
    "search.full": "भरी हुई",
    "search.frequency": "आवृत्ति",
    "search.totalStops": "कुल स्टॉप",
    "search.nextDepartures": "अगली रवानगी",
    "search.bookSeat": "सीट बुक करें",
    "search.routeStops": "रूट स्टॉप",
    "search.minArrival": "मिनट",

    // Book page
    "book.title": "बस पर सीट बुक करें",
    "book.desc": "यात्रा सुरक्षित करें। नीचे विवरण भरें।",
    "book.boardingStop": "चढ़ने का स्टॉप",
    "book.dropStop": "उतरने का स्टॉप",
    "book.selectStop": "स्टॉप चुनें",
    "book.travelDate": "यात्रा की तारीख",
    "book.passenger": "यात्री विवरण",
    "book.fullName": "पूरा नाम",
    "book.enterName": "पूरा नाम दर्ज करें",
    "book.age": "उम्र",
    "book.years": "साल",
    "book.seats": "सीटों की संख्या",
    "book.seatsUnit": "सीट",
    "book.seatsUnits": "सीटें",
    "book.cancel": "रद्द करें",
    "book.confirm": "बुकिंग की पुष्टि करें",
    "book.confirming": "पुष्टि हो रही है...",
    "book.noStop": "कोई बस नहीं चुनी",
    "book.selectBothStops": "चढ़ने और उतरने दोनों स्टॉप चुनें",
    "book.success": "बुकिंग सफलतापूर्वक पक्की हो गई!",

    // Bookings page
    "bookings.title": "मेरी बुकिंग",
    "bookings.busNumber": "बस नंबर",
    "bookings.ref": "बुकिंग रेफरेंस",
    "bookings.travelDate": "यात्रा की तारीख",
    "bookings.journey": "यात्रा",
    "bookings.passenger": "यात्री",
    "bookings.cancelBtn": "बुकिंग रद्द करें",
    "bookings.confirmed": "पक्की",
    "bookings.cancelled": "रद्द",
    "bookings.empty.title": "अभी कोई बुकिंग नहीं",
    "bookings.empty.sub": "आपने कोई बस टिकट नहीं बुक किया है।",
    "bookings.findBus": "बस खोजें",
    "bookings.cancelConfirm": "क्या आप वाकई यह बुकिंग रद्द करना चाहते हैं?",
    "bookings.cancelSuccess": "बुकिंग रद्द हो गई",

    // Dashboard
    "dash.welcome": "वापसी पर स्वागत है,",
    "dash.sub": "AI Safar के साथ आपका यात्रा सारांश।",
    "dash.bookNew": "नई टिकट बुक करें",
    "dash.totalBookings": "कुल बुकिंग",
    "dash.upcoming": "आगामी यात्राएं",
    "dash.cancelled": "रद्द की गईं",
    "dash.recentBookings": "हाल की बुकिंग",
    "dash.viewAll": "सभी देखें",
    "dash.noRecent": "कोई हाल की बुकिंग नहीं।",
    "dash.popularRoutes": "लोकप्रिय रूट",
    "dash.book": "बुक",
    "dash.to": "से",

    // Login
    "login.welcome": "वापस आएं",
    "login.desc": "अपने खाते तक पहुंचने के लिए विवरण दर्ज करें",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.btn": "लॉग इन करें",
    "login.loading": "लॉग इन हो रहा है...",
    "login.noAccount": "खाता नहीं है?",
    "login.signup": "साइन अप करें",
    "login.alreadyIn": "आप पहले से लॉग इन हैं!",
    "login.success": "लॉग इन सफल!",

    // Register
    "reg.title": "खाता बनाएं",
    "reg.desc": "बुकिंग शुरू करने के लिए AI Safar से जुड़ें",
    "reg.name": "पूरा नाम",
    "reg.namePh": "आपका पूरा नाम",
    "reg.email": "ईमेल",
    "reg.emailPh": "name@example.com",
    "reg.password": "पासवर्ड",
    "reg.passwordPh": "पासवर्ड बनाएं",
    "reg.btn": "खाता बनाएं",
    "reg.loading": "बन रहा है...",
    "reg.haveAccount": "पहले से खाता है?",
    "reg.login": "लॉग इन करें",
    "reg.success": "खाता बन गया! AI Safar में आपका स्वागत है।",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = () => setLang((l) => (l === "en" ? "hi" : "en"));

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
