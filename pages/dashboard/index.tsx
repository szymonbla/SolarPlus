import { Button } from "@mui/material";
import { GetServerSideProps } from "next/types";
import { getSession, signOut } from "next-auth/react";

const DashboardPage = () => {
  const handleGoogleSignOut = () => {
    signOut();
  };
  return (
    <div>
      <Button onClick={handleGoogleSignOut}>Sign out</Button>
    </div>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { session },
  };
};
