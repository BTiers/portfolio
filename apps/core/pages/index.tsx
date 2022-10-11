import type { NextPage } from "next";

import Head from "next/head";
import dynamic from "next/dynamic";

const WindowManager = dynamic(
  async () => {
    return (await import("system-ui")).WindowManager;
  },
  {
    ssr: false,
  }
);
const Desktop = dynamic(
  async () => {
    return (await import("system-ui")).Desktop;
  },
  {
    ssr: false,
  }
);
const Window = dynamic(
  async () => {
    return (await import("system-ui")).Window;
  },
  {
    ssr: false,
  }
);

const FirstWindow = () => {
  return <Window id="first_window">Blabla</Window>;
};

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Head>
        <title>Portfolio</title>
      </Head>
      <WindowManager>
        <Desktop>
          <FirstWindow />
        </Desktop>
      </WindowManager>
    </div>
  );
};

export default Home;
