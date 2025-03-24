import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCar } from "../context/CarContext";

export default function Homepage() {
  const router = useRouter();
  const {
    isLocked,
    toggleLock,
    isFanOn,
    toggleFan,
    temperature,
    setTemperature,
    batteryLevel,
    isCharging,
    startCharging,
    stopCharging,
  } = useCar();

  const [showLockPopup, setShowLockPopup] = useState(false);
  const [showFanPopup, setShowFanPopup] = useState(false);
  const [showBatteryPopup, setShowBatteryPopup] = useState(false);

  // Hantera låsning + popup
  const handleToggleLock = () => {
    toggleLock();
    setShowLockPopup(true);
    setTimeout(() => setShowLockPopup(false), 1500);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
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

      {/* Bild & ikoner */}
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
            onClick={handleToggleLock}
          />
          <div className={styles.line}></div>
          <Image
            src={isFanOn ? "/fannon.png" : "/fannoff.png"}
            alt={isFanOn ? "Fan On" : "Fan Off"}
            width={60}
            height={60}
            className={`${styles.icon} ${styles.fanIcon}`}
            onClick={() => setShowFanPopup((prev) => !prev)}
          />
          <div className={styles.line}></div>
          <Image
            src="/bolt.png"
            alt="Battery"
            width={50}
            height={50}
            className={styles.icon}
            onClick={() => setShowBatteryPopup((prev) => !prev)}
          />
        </div>
      </div>

      {/* Nav */}
      <div className={styles.bottomSection}>
        <div className={styles.horizontalLine}></div>
        <div className={styles.bottomIcons}>
          <Link href="/">
            <Image
              src={router.pathname === "/" ? "/home2.png" : "/home1.png"}
              alt="Home"
              width={40}
              height={40}
              className={styles.bottomIcon}
            />
          </Link>
          <Link href="/car">
            <Image
              src={router.pathname === "/car" ? "/car1.png" : "/car.png"}
              alt="Car"
              width={40}
              height={40}
              className={styles.bottomIcon}
            />
          </Link>
          <Image
            src="/user.png"
            alt="User"
            width={40}
            height={40}
            className={styles.bottomIcon}
          />
        </div>
      </div>

      {/* Popup - Låsning */}
      {showLockPopup && (
        <div className={styles.lockPopup}>
          <h2 className={styles.lockPopupText}>{isLocked ? "Låst" : "Olåst"}</h2>
          <Image
            src={isLocked ? "/locked.png" : "/unlocked.png"}
            alt="Lock Status"
            width={60}
            height={60}
            className={styles.lockPopupIcon}
          />
        </div>
      )}

      {/* Popup - Klimat */}
      {showFanPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowFanPopup(false)}>✖</button>
            <h2 className={styles.popupTitle}>Klimat</h2>
            <p className={styles.popupStatus}>{isFanOn ? "Igång" : "Avstängt"}</p>
            <div className={styles.temperatureControl}>
              <button
                className={styles.upArrow}
                onClick={() => setTemperature((prev: number) => Math.min(prev + 1, 27))}
              >
                ▲
              </button>
              <span className={styles.tempDisplay}>{temperature}°C</span>
              <button
                className={styles.downArrow}
                onClick={() => setTemperature((prev: number) => Math.max(prev - 1, 15))}
              >
                ▼
              </button>
            </div>
            <button onClick={toggleFan} className={styles.popupButton}>
              {isFanOn ? "Stäng av" : "Starta"}
            </button>
          </div>
        </div>
      )}

      {/* Popup - Batteri */}
      {showBatteryPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowBatteryPopup(false)}>✖</button>
            <h2 className={styles.popupTitle}>Batteristatus</h2>
            <div className={styles.batteryContainer}>
              <div className={styles.batteryLevel} style={{ width: `${batteryLevel}%` }}></div>
            </div>
            <p className={styles.popupStatus}>Nuvarande laddning: {batteryLevel}%</p>
            {isCharging && <p className={styles.chargingAnimation}>⚡ Laddar...</p>}
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
