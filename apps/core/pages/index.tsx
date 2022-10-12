import type { NextPage } from "next";

import Head from "next/head";
import dynamic from "next/dynamic";
import { useWindows, useWindowsMethods } from "system-ui";
import { useCallback } from "react";

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

let windowId = 0;

const Home: NextPage = () => {
  const windows = useWindows();
  const { createWindow } = useWindowsMethods();

  const onWindowCreate = useCallback(() => {
    createWindow({ id: `${windowId++}` });
  }, [createWindow]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Head>
        <title>Portfolio</title>
      </Head>
      <button onClick={onWindowCreate}>Create Window</button>
      <WindowManager>
        <Desktop>
          {windows.map((window) => (
            <Window key={window.id} id={window.id}>
              Michel
            </Window>
          ))}
        </Desktop>
      </WindowManager>
    </div>
  );
};

export default Home;
