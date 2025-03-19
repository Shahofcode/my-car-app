import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/loading.module.css";

export default function LoadingPage() {
    const router = useRouter();
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true); // Starta fade-in på loggan
        const timer = setTimeout(() => {
            router.push("/"); // Efter 4 sekunder skickas man till LandingPage
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.container}>
            <Image
                src="/logo.png" // Hämtar loggan från public/
                alt="Logo"
                width={200}
                height={200}
                className={`${styles.logo} ${fadeIn ? styles.fadeIn : ""}`}
            />
        </div>
    );
}
