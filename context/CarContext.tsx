import React, { createContext, useState, useContext, useEffect } from "react";

interface CarContextType {
  isLocked: boolean;
  toggleLock: () => void;

  isFanOn: boolean;
  temperature: number;
  toggleFan: () => void;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;


  batteryLevel: number;
  isCharging: boolean;
  startCharging: () => void;
  stopCharging: () => void;
}


const CarContext = createContext<CarContextType | undefined>(undefined);

// Provider-komponent
export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [isFanOn, setIsFanOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [batteryLevel, setBatteryLevel] = useState(40);
  const [isCharging, setIsCharging] = useState(false);
  const [chargingInterval, setChargingInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hämta batterinivå vid start
    fetch("/api/battery")
      .then(res => res.json())
      .then(data => setBatteryLevel(data.batteryLevel));
  }, []);

  const toggleLock = () => setIsLocked(prev => !prev);
  const toggleFan = () => setIsFanOn(prev => !prev);

  const startCharging = () => {
    if (!isCharging) {
      setIsCharging(true);
      const interval = setInterval(() => {
        fetch("/api/battery", { method: "POST" })
          .then(res => res.json())
          .then(data => {
            setBatteryLevel(data.batteryLevel);
            if (data.batteryLevel >= 100) {
              clearInterval(interval);
              setIsCharging(false);
              setChargingInterval(null);
            }
          });
      }, 60000);
      setChargingInterval(interval);
    }
  };

  const stopCharging = () => {
    if (chargingInterval) {
      clearInterval(chargingInterval);
      setChargingInterval(null);
    }
    setIsCharging(false);
  };

  return (
    <CarContext.Provider
      value={{
        isLocked,
        toggleLock,
        isFanOn,
        toggleFan,
        temperature,
        setTemperature,
        batteryLevel,
        isCharging,
        startCharging,
        stopCharging
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

// Hook för att använda kontexten
export const useCar = (): CarContextType => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCar måste användas inom CarProvider");
  }
  return context;
};
