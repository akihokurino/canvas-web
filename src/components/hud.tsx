import { Box, Center, Loader } from "@mantine/core";
import { FC } from "react";

interface Props {}

export const Hud: FC<Props> = () => {
  return (
    <Box
      sx={(theme) => ({
        display: "block",
        position: "fixed",
        zIndex: 99999,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      })}
    >
      <Center
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 50,
          height: 50,
        })}
      >
        <Loader size={100} />
      </Center>
    </Box>
  );
};
