import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  );
}
