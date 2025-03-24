import { useEffect, useState } from "react";
import styles from "../styles/car.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CarPage() {
  const router = useRouter();
  const [carInfo, setCarInfo] = useState<any>(null);

  useEffect(() => {
    fetch("/api/car-info")
      .then((res) => res.json())
      .then((data) => setCarInfo(data));
  }, []);

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

      {/* Bild */}
      <div className={styles.carModelImageWrapper}>
        <Image
          src="/porsche-model.png"
          alt="Porsche Modell"
          width={350}
          height={200}
          className={styles.carModelImage}
        />
      </div>

      {/* Rubrik */}
      <h2 className={styles.pageTitle}>Om bilen</h2>

      {carInfo && (
        <div className={styles.infoSection}>
          {/* Underhåll - full bredd */}
          <div className={`${styles.infoBox} ${styles.fullWidthBox}`}>
            <p className={styles.sectionTitle}>Underhåll</p>
            <p className={styles.infoItem}>Senaste service: {carInfo.lastServiceDate}</p>
            <p className={styles.infoItem}>Nästa service: {carInfo.nextServiceDue}</p>
            <p className={styles.infoItem}>Nästa besiktning: {carInfo.nextInspection}</p>
            <p className={styles.infoItem}>Oljenivå: {carInfo.oilLevel}</p>
          </div>

          {/* Förbrukning & Status */}
          <div className={styles.infoBox}>
            <p className={styles.sectionTitle}>Förbrukning & Status</p>
            <p className={styles.infoItem}>Förbrukning bensin: {carInfo.fuelConsumption}</p>
            <p className={styles.infoItem}>Förbrukning el: {carInfo.electricConsumption}</p>
            <p className={styles.infoItem}>Mätarställning: {carInfo.mileage} km</p>
          </div>

          {/* Laddningshistorik */}
          <div className={styles.infoBox}>
            <p className={styles.sectionTitle}>Laddningshistorik</p>
            {carInfo.chargeHistory?.length > 0 ? (
              <>
                <ul className={styles.chargeList}>
                  {carInfo.chargeHistory.map((entry: any, index: number) => (
                    <li key={index}>
                      {entry.date}: {entry.percent}%
                    </li>
                  ))}
                </ul>
                <p className={styles.infoItem}>Batterihälsa: {carInfo.batteryHealth}</p>
              </>
            ) : (
              <p className={styles.infoItem}>Ingen laddningshistorik tillgänglig</p>
            )}
          </div>
        </div>
      )}

      {/* Bottennav */}
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
    </div>
  );
}
