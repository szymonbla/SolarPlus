import Image from "next/image";
import { keyframes } from "@emotion/react";
import { Typography, Grid } from "@mui/material";
import { signIn } from "next-auth/react";

import { BaseLayout } from "layouts";
import { GoogleFormButton } from "common/components";
import LoginIllustration from "common/images/login.svg";
import { RoutesDefinition } from "common/routes";

const float = keyframes({
  "0%": { transform: "translatey(0px)" },
  "50%": { transform: "translatey(-20px)" },
  "100%": { transform: "translatey(0)" },
});

const LoginPage = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: RoutesDefinition.dashboard });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseLayout sx={{ display: "flex" }}>
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex={1}
        sx={{
          px: "8rem",
          "&>*": {
            pb: "2rem",
          },
        }}
      >
        <Typography variant="h1">Login</Typography>
        <Typography variant="h3">
          Compare and visualise your solar farm
        </Typography>
        <Grid sx={{ width: "60%" }}>
          <GoogleFormButton handleClick={handleGoogleSignIn} />
        </Grid>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        flex={1}
      >
        <Grid position="absolute" sx={{ animation: `${float} 5s infinite` }}>
          <Image
            src={LoginIllustration}
            width={700}
            height={600}
            alt="Login illustration"
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default LoginPage;
