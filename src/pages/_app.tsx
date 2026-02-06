import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 bg-gray-50">
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  );
}
