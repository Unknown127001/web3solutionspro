import type { AppProps } from "next/app";
import {
  ThirdwebProvider,ConnectWallet,metamaskWallet,coinbaseWallet,walletConnect,trustWallet,zerionWallet,rainbowWallet, embeddedWallet,phantomWallet,
} from "@thirdweb-dev/react";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { useState, useContext } from "react";
import ChainContext from "../context/Chain";
import { Ethereum, Polygon, Avalanche } from "@thirdweb-dev/chains";
import { useRouter } from "next/router";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.


function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState("polygon");
  const activeChain = selectedChain;
  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
    <ThirdwebProvider
clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
     activeChain={Ethereum}
      supportedChains={[Ethereum, Polygon, Avalanche]}
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
