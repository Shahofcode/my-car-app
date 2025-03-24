export default function handler(req: any, res: any) {
    res.status(200).json({
      fuelConsumption: "7.4 L/100km",
      electricConsumption: "18.5 kWh/100km",
      mileage: 13500,
      batteryHealth: "92%",
      lastServiceDate: "2024-10-01",
      nextServiceDue: "2025-04-01",
      nextInspection: "2025-06-15",
      oilLevel: "OK",
  
      chargeHistory: [
        { date: "2025-03-18", percent: 82 },
        { date: "2025-03-15", percent: 76 },
        { date: "2025-03-12", percent: 88 },
        { date: "2025-03-10", percent: 59 },
        { date: "2025-03-07", percent: 100 },
      ]
    });
  }
  