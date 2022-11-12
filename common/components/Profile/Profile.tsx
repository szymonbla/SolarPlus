import { Avatar, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export const Profile = () => {
  const { data: session } = useSession();
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        width: "100%",
        py: "2rem",
      }}
    >
      <Avatar
        src={session?.user?.image! && session?.user.image}
        alt="User profile"
        sx={{
          width: 70,
          height: 70,
          mb: "0.5rem",
          mt: "4rem",
        }}
      />
      <Typography variant="subtitle2" fontWeight="600" color="grey.400">
        Welcome back,
      </Typography>
      <Typography variant="h4" fontWeight="600" color="common.white">
        {session?.user?.name}
      </Typography>
    </Grid>
  );
};
