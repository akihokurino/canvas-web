// import { Network, OpenSeaSDK } from "opensea-js";
import { createContext, FC, useEffect, useState } from "react";

interface WalletContextProps {
  installed: boolean;
  account: string;
  connect: () => void;
  // buyNft: (address: string, tokenId: string) => Promise<void>;
  error: string;
  isLoading: boolean;
}

export const WalletContext = createContext<WalletContextProps>({
  installed: false,
  account: "",
  connect: () => {},
  // buyNft: async (address: string, tokenId: string) => {},
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
  // const [seaport, setSeaport] = useState<OpenSeaSDK | undefined>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const installed = window.ethereum && window.ethereum.isMetaMask;
    setInstalled(installed);
  }, []);

  const connect = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: any) => {
        setAccount(accounts[0]);
        // setSeaport(
        //   new OpenSeaSDK(window.ethereum, {
        //     networkName: Network.Goerli,
        //     apiKey: undefined,
        //   })
        // );
      })
      .catch((e: any) => {
        setError(e.message);
        alert(e.message);
      });
  };

  // const buyNft = async (address: string, tokenId: string) => {
  //   if (!seaport || !account || isLoading) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const order = await seaport.api.getOrder({
  //       protocol: "seaport",
  //       side: "ask",
  //       assetContractAddress: address,
  //       tokenIds: [tokenId],
  //     });

  //     await seaport.fulfillOrder({
  //       order,
  //       accountAddress: account,
  //     });
  //   } catch (e: any) {
  //     setError(e.message);
  //     alert(e.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <WalletContext.Provider
      value={{
        installed,
        account,
        connect,
        // buyNft,
        error,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
