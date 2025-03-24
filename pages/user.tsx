import styles from "../styles/user.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.userContainer}>
          <h1 className={styles.name}>SHAHIN</h1>
          <p className={styles.surname}>NADERI</p>
        </div>
        <Image
          src="/porsche-logo.png"
          alt="Porsche logo"
          width={60}
          height={60}
          className={styles.logo}
        />
      </div>

      {/* Info-sektioner */}
      <div className={styles.infoSection}>
        <div className={styles.infoBox}>
          <p className={styles.sectionTitle}>Användaruppgifter</p>
          <p className={styles.infoItem}>E-post: shahin@example.com</p>
          <p className={styles.infoItem}>Telefon: 070-123 45 67</p>
        </div>

        <div className={styles.infoBox}>
          <p className={styles.sectionTitle}>Registrerade fordon</p>
          <p className={styles.infoItem}>Porsche 911 Turbo S</p>
          <p className={styles.infoItem}>Reg.nr: ABC123</p>
        </div>

        <div className={styles.infoBox}>
          <p className={styles.sectionTitle}>Säkerhet</p>
          <p className={styles.infoItem}>Tvåfaktorsautentisering: På</p>
          <p className={styles.infoItem}>Senast inloggad: 2025-03-25</p>
        </div>
      </div>
      <div className={styles.sideImageWrapper}>
  <Image
    src="/front.png"
    alt="Car Front"
    width={200}
    height={80}
    className={styles.sideImage}
  />
</div>

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
          <Link href="/user">
            <Image
              src={router.pathname === "/user" ? "/user1.png" : "/user.png"}
              alt="User"
              width={40}
              height={40}
              className={styles.bottomIcon}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
