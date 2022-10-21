import { Box, Button, Header, Text, Title } from "@mantine/core";
import { WalletContext } from "context/wallet";
import { useContext } from "react";

export const AppHeader: React.FC<{}> = (props) => {
  const { installed, account, connect } = useContext(WalletContext);

  return (
    <Header height={70} p="md">
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        })}
      >
        <Title order={2}>NFT Market in Goerli</Title>

        {account && <Text weight={500}>アドレス: {account}</Text>}
        {installed && !account && (
          <Button onClick={connect}>Metamaskと接続</Button>
        )}
        {!installed && <Button>Metamaskをインストール</Button>}
      </Box>
    </Header>
  );
};
