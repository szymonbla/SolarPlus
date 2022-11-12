import { Grid } from "@mui/material";

import { RoutesDefinition } from "common/routes";
import MapIcon from "common/images/map.svg";
import DashboardIcon from "common/images/dashboard.svg";
import ComparatorIcon from "common/images/comparator.svg";
import { NavigationItem, NavigationItemProps } from "./NavigationItem";

export const Navigation = () => {
  const navigationItems: NavigationItemProps[] = [
    {
      label: "Dashboard",
      hrefLink: RoutesDefinition.dashboard,
      icon: DashboardIcon,
    },
    {
      label: "Map",
      hrefLink: RoutesDefinition.map,
      icon: MapIcon,
    },
    {
      label: "Comparator (SOON)",
      hrefLink: RoutesDefinition.comparator,
      icon: ComparatorIcon,
    },
  ];

  return (
    <Grid
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={4}
      component="nav"
    >
      {navigationItems.map((item, index) => (
        <NavigationItem {...item} key={index} />
      ))}
    </Grid>
  );
};
