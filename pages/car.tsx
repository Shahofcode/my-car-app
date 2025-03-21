import styles from "../styles/car.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";






export default function CarPage() {
    const router = useRouter();
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

      <div className={styles.carModelImageWrapper}>
        <Image
          src="/porsche-model.png"
          alt="Porsche Modell"
          width={350}
          height={200}
          className={styles.carModelImage}
        />
      </div>
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

    
    <Image src="/user.png" alt="User" width={40} height={40} className={styles.bottomIcon} />
  </div>
</div>

    </div>
  );
}
