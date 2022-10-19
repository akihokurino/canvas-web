import { Header, Title } from "@mantine/core";

export const AppHeader: React.FC<{}> = (props) => {
  return (
    <Header height={70} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Title order={2}>NFT Market in Goerli</Title>
      </div>
    </Header>
  );
};
