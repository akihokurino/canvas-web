import detectEthereumProvider from "@metamask/detect-provider";
import { Network, OpenSeaPort } from "opensea-js";
import { createContext, FC, useEffect, useState } from "react";
import Web3 from "web3";

interface WalletContextProps {
  installed: boolean;
  account: string;
  connect: () => Promise<void>;
  buyNft: (address: string, tokenId: string) => Promise<void>;
  error: string;
  isLoading: boolean;
}

export const WalletContext = createContext<WalletContextProps>({
  installed: false,
  account: "",
  connect: async () => {},
  buyNft: async (address: string, tokenId: string) => {},
  error: "",
  isLoading: false,
});

export const WalletConsumer = WalletContext.Consumer;

interface Props {
  children: React.ReactNode;
}

export const WalletProvider: FC<Props> = ({ children }) => {
  const [installed, setInstalled] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");
  const [seaport, setSeaport] = useState<OpenSeaPort | undefined>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    detectEthereumProvider({ mustBeMetaMask: true }).then((provider) => {
      const installed = provider && window.ethereum.isMetaMask;
      setInstalled(installed);
    });
  }, []);

  const connect = async () => {
    if (!installed) {
      return;
    }

    const web3 = new Web3(Web3.givenProvider);
    web3.eth.defaultChain = "goerli";

    const accounts = await web3.eth.requestAccounts();

    setAccount(accounts[0]);
    setSeaport(
      new OpenSeaPort(window.ethereum, {
        networkName: Network.Goerli,
        apiKey: undefined,
      })
    );
  };

  const buyNft = async (address: string, tokenId: string) => {
    if (!seaport || !account || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const order = await seaport.api.getOrder({
        protocol: "seaport",
        side: "ask",
        assetContractAddress: address,
        tokenIds: [tokenId],
      });

      await seaport.fulfillOrder({
        order,
        accountAddress: account,
      });
    } catch (e: any) {
      setError(e.message);
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        installed,
        account,
        connect,
        buyNft,
        error,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
