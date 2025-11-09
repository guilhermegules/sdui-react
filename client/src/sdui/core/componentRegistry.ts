import { Card, Grid, TextField } from "@mui/material";
import { lazy } from "react";

export const componentRegistry: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.LazyExoticComponent<React.ComponentType<any>> | React.FC<any>
> = {
  Text: lazy(() =>
    import("../../components/Text").then((m) => ({ default: m.Text }))
  ),
  Button: lazy(() =>
    import("../../components/Button").then((m) => ({ default: m.Button }))
  ),
  Screen: lazy(() =>
    import("../../components/Screen").then((m) => ({ default: m.Screen }))
  ),
  Card: Card,
  Grid: Grid,
  TextField: TextField,
};
