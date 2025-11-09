import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";

export const Screen = ({ children }: { children: ReactNode }) => (
  <Box sx={{ p: 4 }}>
    <Stack spacing={2}>{children}</Stack>
  </Box>
);
