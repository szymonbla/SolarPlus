import { CSSProperties } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

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
  const router = useRouter();
  const isActive = router.pathname === hrefLink;

  return (
    <Grid display="flex" alignItems="center" gap={2}>
      <Image
        src={icon}
        width={isActive ? 40 : 32}
        height={isActive ? 40 : 32}
        alt={`${label.toLowerCase()} icon`}
      />
      <Link href={hrefLink} passHref>
        <StyledLink style={linkStyling(isActive)}>{label}</StyledLink>
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
