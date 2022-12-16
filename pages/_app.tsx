import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";

import { theme } from "common/styles/theme/theme";
import { createEmotionCache } from "common/styles/theme/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <ReduxProvider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SessionProvider session={pageProps.session}>
            <CssBaseline />
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </ReduxProvider>
  );
};
export default MyApp;
