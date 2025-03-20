import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";

export default function Homepage() {
  const [isLocked, setIsLocked] = useState(true);
  const [showLockPopup, setShowLockPopup] = useState(false);
  const [isFanOn, setIsFanOn] = useState(false);
  const [showFanPopup, setShowFanPopup] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [showBatteryPopup, setShowBatteryPopup] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(40);
  const [isCharging, setIsCharging] = useState(false);

  // Hämta batterinivå från API vid sidladdning
  useEffect(() => {
    fetch("/api/battery")
      .then((res) => res.json())
      .then((data) => setBatteryLevel(data.batteryLevel));
  }, []);

  // Funktion för att toggla lås och visa popup
  const toggleLock = () => {
    setIsLocked((prevState) => !prevState);
    setShowLockPopup(true);

    // Stänger popupen automatiskt efter 1.5 sekunder
    setTimeout(() => {
      setShowLockPopup(false);
    }, 1500);
  };

  // Funktion för att öppna/stänga klimat-popup
  const toggleFanPopup = () => {
    setShowFanPopup((prev) => !prev);
  };

  const handleFanToggle = () => {
    setIsFanOn((prevState) => !prevState);
    setShowFanPopup(false);
  };

  // Funktion för att öppna/stänga batteri-popup
  const toggleBatteryPopup = () => {
    setShowBatteryPopup((prev) => !prev);
  };

  const [chargingInterval, setChargingInterval] = useState<NodeJS.Timeout | null>(null);

  const startCharging = () => {
    if (!isCharging) {
      setIsCharging(true);
      const interval = setInterval(() => {
        fetch("/api/battery", { method: "POST" })
          .then((res) => res.json())
          .then((data) => {
            setBatteryLevel(data.batteryLevel);
            if (data.batteryLevel >= 100) {
              clearInterval(interval);
              setIsCharging(false);
              setChargingInterval(null);
            }
          });
      }, 60000); // Ladda 1% per minut

      setChargingInterval(interval); // Spara intervallet
    }
  };

  // Stoppa laddningen och rensa intervallet
  const stopCharging = () => {
    if (chargingInterval) {
      clearInterval(chargingInterval); // Rensa intervallet
      setChargingInterval(null);
    }
    setIsCharging(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.brandContainer}>
          <h1 className={styles.brand}>PORSCHE</h1>
          <p className={styles.model}>911 TURBO S</p>
        </div>
        <Image
          src="/porsche-logo.png"
          alt="Porsche Logo"
          width={60}
          height={60}
          className={styles.logo}
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.imageContainer}>
          <Image
            src="/birdsview.png"
            alt="Porsche Birdsview"
            width={400}
            height={250}
            className={styles.carImage}
          />
        </div>

        <div className={styles.iconColumn}>
          <Image
            src={isLocked ? "/locked.png" : "/unlocked.png"}
            alt={isLocked ? "Locked" : "Unlocked"}
            width={40}
            height={40}
            className={`${styles.icon} ${styles.lockedIcon}`}
            onClick={toggleLock}
          />
          <div className={styles.line}></div>
          <Image
            src={isFanOn ? "/fannon.png" : "/fannoff.png"}
            alt={isFanOn ? "Fan On" : "Fan Off"}
            width={60}
            height={60}
            className={`${styles.icon} ${styles.fanIcon}`}
            onClick={toggleFanPopup}
          />
          <div className={styles.line}></div>
          <Image
            src="/bolt.png"
            alt="Battery"
            width={50}
            height={50}
            className={styles.icon}
            onClick={toggleBatteryPopup}
          />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.horizontalLine}></div>
        <div className={styles.bottomIcons}>
          <Image src="/home1.png" alt="Home" width={40} height={40} className={styles.bottomIcon} />
          <Image src="/car.png" alt="Car" width={40} height={40} className={styles.bottomIcon} />
          <Image src="/user.png" alt="User" width={40} height={40} className={styles.bottomIcon} />
        </div>
      </div>

      {/* Popup för låsning */}
      {showLockPopup && (
        <div className={styles.lockPopup}>
          <h2 className={styles.lockPopupText}>{isLocked ? "Låst" : "Olåst"}</h2>
          <Image 
            src={isLocked ? "/locked.png" : "/unlocked.png"} 
            alt={isLocked ? "Locked" : "Unlocked"} 
            width={60} 
            height={60} 
            className={styles.lockPopupIcon} 
          />
        </div>
      )}

      {/* Popup för klimatkontroll */}
      {showFanPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={toggleFanPopup}>✖</button>
            <h2 className={styles.popupTitle}>Klimat</h2>
            <p className={styles.popupStatus}>{isFanOn ? "Igång" : "Avstängt"}</p>
            <div className={styles.temperatureControl}>
              <button className={styles.upArrow} onClick={() => setTemperature(prev => Math.min(prev + 1, 27))}>▲</button>
              <span className={styles.tempDisplay}>{temperature}°C</span>
              <button className={styles.downArrow} onClick={() => setTemperature(prev => Math.max(prev - 1, 15))}>▼</button>
            </div>
            <button onClick={handleFanToggle} className={styles.popupButton}>
              {isFanOn ? "Stäng av" : "Starta"}
            </button>
          </div>
        </div>
      )}

      {/* Popup för batterinivå */}
{showBatteryPopup && (
  <div className={styles.popup}>
    <div className={styles.popupContent}>
      <button className={styles.closeButton} onClick={toggleBatteryPopup}>✖</button>
      <h2 className={styles.popupTitle}>Batteristatus</h2>
      
      {/* Progress-bar för batterinivån */}
      <div className={styles.batteryContainer}>
        <div className={styles.batteryLevel} style={{ width: `${batteryLevel}%` }}></div>
      </div>

      <p className={styles.popupStatus}>Nuvarande laddning: {batteryLevel}%</p>

      {/* Laddningsanimation */}
      {isCharging && <p className={styles.chargingAnimation}>⚡ Laddar...</p>}

      {/* Om bilen laddar -> "Avsluta", annars "Starta Laddning" */}
      {isCharging ? (
        <button onClick={stopCharging} className={styles.popupButton}>Avsluta</button>
      ) : batteryLevel < 100 ? (
        <button onClick={startCharging} className={styles.popupButton}>Starta Laddning</button>
      ) : null}
    </div>
  </div>
)}

    </div>
  );
}
