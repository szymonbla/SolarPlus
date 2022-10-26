import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { theme } from "common/styles/theme/theme";
import { LoadingSpinner } from "common/components";
import { ProtectedRoutes } from "common/routes/protectedRoutes";
import { createEmotionCache } from "common/styles/theme/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  const isProtectedRoute = () => {
    return ProtectedRoutes.find((item) => item.url === router.pathname)?.auth;
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <CssBaseline />
          {isProtectedRoute() ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
export default MyApp;

interface AuthProps {
  children: any;
}

const Auth = ({ children }: AuthProps) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return children;
};
