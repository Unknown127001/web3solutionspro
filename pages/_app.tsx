import type { AppProps } from "next/app";
import {
  ThirdwebProvider,ConnectWallet,metamaskWallet,coinbaseWallet,walletConnect,trustWallet,zerionWallet,rainbowWallet, embeddedWallet,phantomWallet,
} from "@thirdweb-dev/react";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { useState, useContext } from "react";
import ChainContext from "../context/Chain";
import { Ethereum, Polygon, Avalanche,Binance } from "@thirdweb-dev/chains";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState("ethereum");
  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
    <ThirdwebProvider
clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
activeChain={selectedChain}
      supportedChains={[Ethereum, Polygon, Avalanche, Binance]}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet({ recommended: true }),
        zerionWallet(),
        rainbowWallet(),
        embeddedWallet(),
        phantomWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
    </NextThemesProvider>
    </NextUIProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;
