import type { AppProps } from "next/app";

import "../styles/globals.css";
import "system-ui/styles/global.css";

function CoreApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CoreApp;
