import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../styles/globals.css"; 

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (!hasVisited) {
            sessionStorage.setItem("hasVisited", "true");
            router.replace("/loading");
        } else {
            setShowLoading(false);
        }
    }, [router]);

    if (showLoading && router.pathname !== "/loading") {
        return null; 
    }

    return <Component {...pageProps} />;
}
