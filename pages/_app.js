import { getDecryptedCookie } from "@/src/utils/EncryptCookie";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  const cookie = getDecryptedCookie("accountBook_userData");
  useEffect(() => {
    const cachedData = cookie ? JSON.parse(cookie) : false;
    if (!cachedData && !pathname.includes("/auth")) {
      router.push("/auth/login");
    } else if (cachedData && pathname.includes("/auth")) {
      router.push("/");
    }
  }, [cookie]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
