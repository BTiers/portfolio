import type { AppProps } from "next/app";

import "../styles/globals.css";
import "@sysfolio/system-core/styles/global.css";
import "@sysfolio/spotify/styles/global.css";
import "@sysfolio/code/styles/global.css";
import "@sysfolio/calendar/styles/global.css";
import "@sysfolio/system-ui/styles/global.css";

function CoreApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CoreApp;
