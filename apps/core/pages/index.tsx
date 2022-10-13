import type { NextPage } from "next";

import Head from "next/head";

import {
  WindowManager,
  ProcessManager,
  Desktop,
  Taskbar,
  LockScreen
} from "@sysfolio/system-core";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden relative">
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
