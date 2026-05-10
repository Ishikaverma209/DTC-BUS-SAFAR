import { Router } from "express";

const router = Router();

const DTC_ROUTES: Record<string, {
  busNumber: string;
  origin: string;
  destination: string;
  frequency: string;
  type: string;
  stops: Array<{ stopNumber: number; stopName: string; estimatedArrivalMinutes: number; village: string; district: string }>;
}> = {
  "401": {
    busNumber: "401",
    origin: "ISBT Kashmere Gate",
    destination: "Najafgarh",
    frequency: "Every 15 min",
    type: "Ordinary",
    stops: [
      { stopNumber: 1, stopName: "ISBT Kashmere Gate", estimatedArrivalMinutes: 0, village: "Kashmere Gate", district: "Central Delhi" },
      { stopNumber: 2, stopName: "Sadar Bazar", estimatedArrivalMinutes: 8, village: "Sadar Bazar", district: "Central Delhi" },
      { stopNumber: 3, stopName: "Patel Nagar", estimatedArrivalMinutes: 20, village: "Patel Nagar", district: "West Delhi" },
      { stopNumber: 4, stopName: "Rajouri Garden", estimatedArrivalMinutes: 32, village: "Rajouri Garden", district: "West Delhi" },
      { stopNumber: 5, stopName: "Nangloi", estimatedArrivalMinutes: 48, village: "Nangloi", district: "West Delhi" },
      { stopNumber: 6, stopName: "Nilothi Village", estimatedArrivalMinutes: 62, village: "Nilothi", district: "West Delhi" },
      { stopNumber: 7, stopName: "Mundka Village", estimatedArrivalMinutes: 70, village: "Mundka", district: "West Delhi" },
      { stopNumber: 8, stopName: "Bahadurgarh Mod", estimatedArrivalMinutes: 82, village: "Bahadurgarh Mod", district: "West Delhi" },
      { stopNumber: 9, stopName: "Najafgarh", estimatedArrivalMinutes: 95, village: "Najafgarh", district: "Southwest Delhi" },
    ],
  },
  "534": {
    busNumber: "534",
    origin: "Ambedkar Nagar",
    destination: "Mehrauli",
    frequency: "Every 20 min",
    type: "Ordinary",
    stops: [
      { stopNumber: 1, stopName: "Ambedkar Nagar Terminal", estimatedArrivalMinutes: 0, village: "Ambedkar Nagar", district: "South Delhi" },
      { stopNumber: 2, stopName: "Khanpur", estimatedArrivalMinutes: 10, village: "Khanpur", district: "South Delhi" },
      { stopNumber: 3, stopName: "Sangam Vihar", estimatedArrivalMinutes: 18, village: "Sangam Vihar", district: "South Delhi" },
      { stopNumber: 4, stopName: "Devli Village", estimatedArrivalMinutes: 28, village: "Devli", district: "South Delhi" },
      { stopNumber: 5, stopName: "Fatehpur Beri", estimatedArrivalMinutes: 38, village: "Fatehpur Beri", district: "South Delhi" },
      { stopNumber: 6, stopName: "Mehrauli Bus Stand", estimatedArrivalMinutes: 48, village: "Mehrauli", district: "South West Delhi" },
    ],
  },
  "764": {
    busNumber: "764",
    origin: "Nangloi Terminal",
    destination: "Shivaji Stadium",
    frequency: "Every 12 min",
    type: "AC Low Floor",
    stops: [
      { stopNumber: 1, stopName: "Nangloi Terminal", estimatedArrivalMinutes: 0, village: "Nangloi", district: "West Delhi" },
      { stopNumber: 2, stopName: "Mundka Village", estimatedArrivalMinutes: 12, village: "Mundka", district: "West Delhi" },
      { stopNumber: 3, stopName: "Rohtak Road", estimatedArrivalMinutes: 22, village: "Rohtak Road", district: "West Delhi" },
      { stopNumber: 4, stopName: "Peeragarhi", estimatedArrivalMinutes: 30, village: "Peeragarhi", district: "West Delhi" },
      { stopNumber: 5, stopName: "Paschim Vihar", estimatedArrivalMinutes: 40, village: "Paschim Vihar", district: "West Delhi" },
      { stopNumber: 6, stopName: "Punjabi Bagh", estimatedArrivalMinutes: 52, village: "Punjabi Bagh", district: "West Delhi" },
      { stopNumber: 7, stopName: "Karol Bagh", estimatedArrivalMinutes: 65, village: "Karol Bagh", district: "Central Delhi" },
      { stopNumber: 8, stopName: "Connaught Place", estimatedArrivalMinutes: 78, village: "Connaught Place", district: "Central Delhi" },
      { stopNumber: 9, stopName: "Shivaji Stadium", estimatedArrivalMinutes: 88, village: "Connaught Place", district: "Central Delhi" },
    ],
  },
  "380": {
    busNumber: "380",
    origin: "Badarpur Terminal",
    destination: "Dwarka Sector 23",
    frequency: "Every 18 min",
    type: "AC Low Floor",
    stops: [
      { stopNumber: 1, stopName: "Badarpur Terminal", estimatedArrivalMinutes: 0, village: "Badarpur", district: "South East Delhi" },
      { stopNumber: 2, stopName: "Sarita Vihar", estimatedArrivalMinutes: 12, village: "Sarita Vihar", district: "South Delhi" },
      { stopNumber: 3, stopName: "Jasola Village", estimatedArrivalMinutes: 22, village: "Jasola", district: "South Delhi" },
      { stopNumber: 4, stopName: "Okhla", estimatedArrivalMinutes: 32, village: "Okhla", district: "South Delhi" },
      { stopNumber: 5, stopName: "Lajpat Nagar", estimatedArrivalMinutes: 45, village: "Lajpat Nagar", district: "South Delhi" },
      { stopNumber: 6, stopName: "INA Colony", estimatedArrivalMinutes: 58, village: "INA", district: "South Delhi" },
      { stopNumber: 7, stopName: "Dhaula Kuan", estimatedArrivalMinutes: 72, village: "Dhaula Kuan", district: "South West Delhi" },
      { stopNumber: 8, stopName: "Dwarka Mor", estimatedArrivalMinutes: 88, village: "Dwarka", district: "West Delhi" },
      { stopNumber: 9, stopName: "Dwarka Sector 23", estimatedArrivalMinutes: 100, village: "Dwarka Sector 23", district: "West Delhi" },
    ],
  },
  "615": {
    busNumber: "615",
    origin: "Delhi Cantonment",
    destination: "Shahdara Terminal",
    frequency: "Every 25 min",
    type: "Ordinary",
    stops: [
      { stopNumber: 1, stopName: "Delhi Cantonment", estimatedArrivalMinutes: 0, village: "Cantonment", district: "South West Delhi" },
      { stopNumber: 2, stopName: "Palam Village", estimatedArrivalMinutes: 15, village: "Palam", district: "South West Delhi" },
      { stopNumber: 3, stopName: "Airport Terminal", estimatedArrivalMinutes: 28, village: "Palam", district: "South West Delhi" },
      { stopNumber: 4, stopName: "Mahipalpur", estimatedArrivalMinutes: 40, village: "Mahipalpur", district: "South West Delhi" },
      { stopNumber: 5, stopName: "Vasant Kunj", estimatedArrivalMinutes: 52, village: "Vasant Kunj", district: "South Delhi" },
      { stopNumber: 6, stopName: "Safdurjung Hospital", estimatedArrivalMinutes: 68, village: "Safdurjung", district: "Central Delhi" },
      { stopNumber: 7, stopName: "Connaught Place", estimatedArrivalMinutes: 82, village: "Connaught Place", district: "Central Delhi" },
      { stopNumber: 8, stopName: "Old Delhi Railway Station", estimatedArrivalMinutes: 95, village: "Old Delhi", district: "Central Delhi" },
      { stopNumber: 9, stopName: "Shastri Park", estimatedArrivalMinutes: 108, village: "Shastri Park", district: "North East Delhi" },
      { stopNumber: 10, stopName: "Shahdara Terminal", estimatedArrivalMinutes: 118, village: "Shahdara", district: "East Delhi" },
    ],
  },
  "DL1PC": {
    busNumber: "DL1PC",
    origin: "Rohini Sector 18",
    destination: "Dilshad Garden",
    frequency: "Every 10 min",
    type: "AC Low Floor",
    stops: [
      { stopNumber: 1, stopName: "Rohini Sector 18 Terminal", estimatedArrivalMinutes: 0, village: "Rohini", district: "North West Delhi" },
      { stopNumber: 2, stopName: "Rohini Sector 15", estimatedArrivalMinutes: 8, village: "Rohini", district: "North West Delhi" },
      { stopNumber: 3, stopName: "Pitampura Village", estimatedArrivalMinutes: 18, village: "Pitampura", district: "North West Delhi" },
      { stopNumber: 4, stopName: "Shalimar Bagh", estimatedArrivalMinutes: 28, village: "Shalimar Bagh", district: "North West Delhi" },
      { stopNumber: 5, stopName: "Azadpur", estimatedArrivalMinutes: 40, village: "Azadpur", district: "North Delhi" },
      { stopNumber: 6, stopName: "GTB Nagar", estimatedArrivalMinutes: 52, village: "GTB Nagar", district: "North Delhi" },
      { stopNumber: 7, stopName: "Mukherjee Nagar", estimatedArrivalMinutes: 62, village: "Mukherjee Nagar", district: "North Delhi" },
      { stopNumber: 8, stopName: "Kashmere Gate ISBT", estimatedArrivalMinutes: 75, village: "Kashmere Gate", district: "Central Delhi" },
      { stopNumber: 9, stopName: "Shahdara", estimatedArrivalMinutes: 88, village: "Shahdara", district: "East Delhi" },
      { stopNumber: 10, stopName: "Dilshad Garden", estimatedArrivalMinutes: 100, village: "Dilshad Garden", district: "East Delhi" },
    ],
  },
};

function getNextDepartures(): string[] {
  const now = new Date();
  const times: string[] = [];
  for (let i = 1; i <= 4; i++) {
    const next = new Date(now.getTime() + i * 15 * 60000);
    times.push(next.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }));
  }
  return times;
}

router.get("/buses/search", (req, res) => {
  const { busNumber } = req.query as { busNumber?: string };

  if (!busNumber) {
    res.status(400).json({ error: "busNumber query parameter is required" });
    return;
  }

  const route = DTC_ROUTES[busNumber.toUpperCase()] ?? DTC_ROUTES[busNumber];

  if (!route) {
    res.status(404).json({ error: `Bus number ${busNumber} not found in DTC routes` });
    return;
  }

  res.json({
    ...route,
    totalStops: route.stops.length,
    nextDepartures: getNextDepartures(),
    availableSeats: Math.floor(Math.random() * 30) + 10,
  });
});

router.get("/buses/:busNumber/stops", (req, res) => {
  const { busNumber } = req.params;
  const route = DTC_ROUTES[busNumber.toUpperCase()] ?? DTC_ROUTES[busNumber];

  if (!route) {
    res.status(404).json({ error: `Bus number ${busNumber} not found` });
    return;
  }

  res.json(route.stops);
});

router.get("/buses/popular", (_req, res) => {
  const popular = Object.values(DTC_ROUTES).map((r) => ({
    busNumber: r.busNumber,
    origin: r.origin,
    destination: r.destination,
    totalStops: r.stops.length,
    frequency: r.frequency,
    type: r.type,
  }));

  res.json(popular);
});

export default router;
