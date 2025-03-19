import styles from "../styles/home.module.css";
import Image from "next/image";

export default function Homepage() {
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
                {/* Huvudbilden (nu till vänster) */}
                <div className={styles.imageContainer}>
                    <Image 
                        src="/birdsview.png" 
                        alt="Porsche Birdsview" 
                        width={400} 
                        height={250} 
                        className={styles.carImage} 
                    />
                </div>

                {/* Lodrätt ikon-sektion (nu till höger) */}
                <div className={styles.iconColumn}>
                    <Image 
                        src="/locked.png" 
                        alt="Lock" 
                        width={40} 
                        height={40} 
                        className={`${styles.icon} ${styles.lockedIcon}`} 
                    />
                    <div className={styles.line}></div>
                    <Image 
                        src="/fannoff.png" 
                        alt="Fan" 
                        width={60} 
                        height={60} 
                        className={`${styles.icon} ${styles.fannoffIcon}`} 
                    />
                    <div className={styles.line}></div>
                    <Image 
                        src="/bolt.png" 
                        alt="Bolt" 
                        width={50} 
                        height={50} 
                        className={styles.icon} 
                    />
                </div>
            </div>

            {/* Horisontell linje och ikoner längst ner */}
            <div className={styles.bottomSection}>
                <div className={styles.horizontalLine}></div>
                <div className={styles.bottomIcons}>
                    <Image src="/home1.png" alt="Home" width={40} height={40} className={styles.bottomIcon} />
                    <Image src="/car.png" alt="Car" width={40} height={40} className={styles.bottomIcon} />
                    <Image src="/user.png" alt="User" width={40} height={40} className={styles.bottomIcon} />
                </div>
            </div>
        </div>
    );
}
