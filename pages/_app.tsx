import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ClassRegistry } from "@hyper-hyper-space/core";
import { HHSTodoList } from "../types/HHSTodo";

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    useEffect(() => {
        ClassRegistry.register(HHSTodoList.className, HHSTodoList);
        console.log("HHSTodo registered!");
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;
