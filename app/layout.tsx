"use client";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Inter } from "next/font/google";
import { arbitrumSepolia } from "viem/chains";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { Header } from "./components/common/Header";
import { ToastContainer } from "react-toastify";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getDefaultConfig({
    appName: "Nestors Project",
    projectId: "YOUR_PROJECT_ID",
    chains: [arbitrumSepolia],
  });

  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider theme={darkTheme()} modalSize="compact">
                <div className="mx-auto w-full max-w-[1200px]">
                  <Header />
                  {children}
                  <ToastContainer theme="dark" />
                </div>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
