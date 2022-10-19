import type { NextPage } from "next";

import Head from "next/head";

import {
  WindowManager,
  ProcessManager,
  Desktop,
  Taskbar,
  LockScreen,
} from "@sysfolio/system-core";

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden">
      <Head>
        <title>Portfolio</title>
      </Head>
      <LockScreen />
      <WindowManager>
        <Desktop>
          <ProcessManager processRenderer="window" />
        </Desktop>
        <Taskbar />
      </WindowManager>
    </div>
  );
};

export default Home;
