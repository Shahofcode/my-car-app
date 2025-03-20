import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/loading.module.css";

export default function LoadingPage() {
    const router = useRouter();
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true); 
        const timer = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.container}>
            <Image
                src="/logo.png" 
                alt="Logo"
                width={200}
                height={200}
                className={`${styles.logo} ${fadeIn ? styles.fadeIn : ""}`}
            />
        </div>
    );
}
