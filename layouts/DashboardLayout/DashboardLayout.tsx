import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode;
}
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <Grid>{children}</Grid>;
};
