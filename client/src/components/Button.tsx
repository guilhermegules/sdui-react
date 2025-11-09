import { Button as MUIButton } from "@mui/material";

export const Button = ({
  label,
  variant = "outlined",
  onClick,
}: {
  label: string;
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
}) => (
  <MUIButton variant={variant} onClick={onClick}>
    {label}
  </MUIButton>
);
