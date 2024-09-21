"use client";  // This tells Next.js this is a client component


import { useAccount, useDisconnect } from 'wagmi';
import { BrowserProvider } from 'ethers';  // Correct import for the new version of ethers
import { useState } from 'react';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new BrowserProvider((window as any).ethereum);  // Correct provider instantiation
        await provider.send('eth_requestAccounts', []); // Request connection to MetaMask
        const signer = await provider.getSigner();
        const address = await signer.getAddress(); // Get the connected wallet address
        setProvider(provider);
        setWalletAddress(address);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected to {walletAddress || address}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}



