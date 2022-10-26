import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

import { createEmotionCache } from "common/styles/theme/createEmotionCache";
import { theme } from "common/styles/theme/theme";
import { SessionProvider } from "next-auth/react";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <CssBaseline />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
