import { Grid, SxProps } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { CSSProperties, useState } from "react";

export interface NavigationItemProps {
  label: string;
  hrefLink: string;
  icon: string;
}

export const NavigationItem = ({
  label,
  hrefLink,
  icon,
}: NavigationItemProps) => {
  const [isActiveState, setActiveState] = useState<boolean>(false);

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      gap={2}
      onClick={() => setActiveState(true)}
    >
      <Image
        src={icon}
        width={32}
        height={32}
        alt={`${label.toLowerCase()} icon`}
      />
      <Link href={hrefLink} passHref>
        <StyledLink style={linkStyling(isActiveState)}>{label}</StyledLink>
      </Link>
    </Grid>
  );
};

const StyledLink = styled.a`
  color: #ffffff;
  text-decoration: none;
`;

const linkStyling = (isActive: boolean): CSSProperties => {
  return {
    fontWeight: isActive ? 800 : 400,
  };
};
