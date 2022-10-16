import React, { useRef, useState, useCallback, memo } from "react";

import classNames from "classnames";

import { useKeyPressEvent } from "react-use";

import {
  AiFillCloud,
  AiFillGithub,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineReload,
} from "react-icons/ai";
import { FaStackOverflow } from "react-icons/fa";
import { SiBrave } from "react-icons/si";

const SuggestionButton: React.FC<{
  icon: React.ReactElement;
  title: string;
  onClick: () => void;
}> = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-2 space-y-2 rounded-md hover:bg-gray-700"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full">
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-100">{title}</span>
    </button>
  );
};

type TabState = {
  ref: HTMLIFrameElement | null;
  url: string;
  prev: string[];
  next: string[];
  active: boolean;
};

const DEFAULT_TAB_STATE = {
  url: "",
  prev: [],
  next: [],
  active: true,
  ref: null,
};

type BrowserProps = { id: string };

export const Browser: React.FC<BrowserProps> = memo(({ id }) => {
  const [tabs, setTabs] = useState<TabState[]>([{ ...DEFAULT_TAB_STATE }]);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useKeyPressEvent(
    "Enter",
    useCallback(() => {
      if (urlInputRef?.current)
        setTabs((tabs) =>
          tabs.map((tab) => {
            if (tab.active === true)
              return {
                ...tab,
                prev: [...tab.prev, tab.url],
                url: urlInputRef?.current?.value || "",
              };
            return tab;
          })
        );
    }, [urlInputRef])
  );

  const setActiveTab = useCallback((index: number) => {
    setTabs((tabs) =>
      tabs.map((tab, tabIndex) => {
        if (tabIndex === index) {
          if (urlInputRef?.current) urlInputRef.current.value = tab.url;
          return { ...tab, active: true };
        }
        return { ...tab, active: false };
      })
    );
  }, []);
  const removeTab = useCallback((index: number) => {
    setTabs((tabs) => {
      const tabsCpy = [...tabs];

      if (tabsCpy[index].active) {
        if (tabsCpy.length > index + 1) tabsCpy[index + 1].active = true;
        else if (index - 1 >= 0) tabsCpy[index - 1].active = true;
      }
      tabsCpy.splice(index, 1);
      return tabsCpy.length === 0 ? [{ ...DEFAULT_TAB_STATE }] : tabsCpy;
    });
  }, []);
  const createTab = useCallback(() => {
    setTabs((tabs) => [
      ...tabs.map((tab) => ({ ...tab, active: false })),
      { ...DEFAULT_TAB_STATE },
    ]);
  }, []);
  const setUrlToActiveTab = useCallback((url: string) => {
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.active === true) {
          if (urlInputRef?.current) urlInputRef.current.value = url;
          return { ...tab, prev: [...tab.prev, tab.url], url };
        }
        return { ...tab };
      })
    );
  }, []);
  const goBack = useCallback(() => {
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.active === true && tab.prev.length > 0) {
          const prevCopy = [...tab.prev];
          const nextCopy = [...tab.next];

          const nextUrl = prevCopy.pop() || "";

          nextCopy.push(tab.url);

          if (urlInputRef?.current) urlInputRef.current.value = nextUrl;

          return {
            ...tab,
            prev: [...prevCopy],
            next: [...nextCopy],
            url: nextUrl,
          };
        }
        return { ...tab };
      })
    );
  }, []);
  const goForward = useCallback(() => {
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.active === true && tab.next.length > 0) {
          const prevCopy = [...tab.prev];
          const nextCopy = [...tab.next];

          const nextUrl = nextCopy.pop() || "";

          prevCopy.push(tab.url);

          if (urlInputRef?.current) urlInputRef.current.value = nextUrl;

          return {
            ...tab,
            prev: [...prevCopy],
            next: [...nextCopy],
            url: nextUrl,
          };
        }
        return { ...tab };
      })
    );
  }, []);

  return (
    <div className="relative flex flex-col flex-grow rounded-b-md" id={id}>
      <div className="flex w-full h-10 px-3 bg-gray-900">
        {tabs.map(({ ref, active, url, prev, next }, index) => (
          <div
            key={index}
            className={`flex items-center overflow-hidden justify-between mt-2 w-full max-w-[16rem] px-2 text-xs text-gray-100 rounded-t-md hover:bg-gray-800 ${
              active ? "bg-gray-800" : "border-r border-gray-800"
            }`}
          >
            <button
              className="flex items-center flex-grow h-8 min-w-0 space-x-2"
              onClick={() => setActiveTab(index)}
            >
              <div className="flex-shrink-0">
                <AiFillCloud />
              </div>
              <div className="flex-shrink truncate">
                {!url ? "New tab" : url}
              </div>
            </button>
            <button
              onClick={() => removeTab(index)}
              className="flex items-center flex-shrink-0 rounded-full hover:bg-gray-600 p-0.5   "
            >
              <AiOutlineClose />
            </button>
          </div>
        ))}
        <button
          onClick={() => createTab()}
          className="flex items-center self-center justify-center w-5 h-5 mt-2 ml-2 text-gray-100 rounded-full hover:bg-gray-100 hover:text-gray-800"
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div className="flex items-center w-full h-10 px-4 space-x-2 bg-gray-800">
        <button
          onClick={goBack}
          disabled={tabs.find(({ active }) => active)?.prev.length === 0}
          className="flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full disabled:hover:bg-gray-800 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:hover:cursor-default hover:bg-gray-100 hover:text-gray-800"
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          onClick={goForward}
          disabled={tabs.find(({ active }) => active)?.next.length === 0}
          className="flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full disabled:hover:bg-gray-800 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:hover:cursor-default hover:bg-gray-100 hover:text-gray-800"
        >
          <AiOutlineArrowRight />
        </button>
        <button className="flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full hover:bg-gray-100 hover:text-gray-800">
          <AiOutlineReload />
        </button>
        <input
          ref={urlInputRef}
          className="flex-grow px-4 py-1 text-sm text-gray-100 bg-gray-900 rounded-full outline-none focus:border-0 focus:ring-2 focus:ring-blue-300"
        />
      </div>
      {tabs.map(({ url, active }, index) =>
        !!url ? (
          <iframe
            key={index}
            ref={(ref) => {
              if (!tabs[index].ref)
                setTabs((tabs) => {
                  const tabsCpy = [...tabs];
                  tabsCpy[index].ref = ref;
                  return tabsCpy;
                });
            }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/search?q=${url}&igu=1`}
            style={{
              zIndex: active ? 1 : 0,
              top: "5rem",
              height: "calc(100% - 5rem)",
            }}
            className="absolute left-0 w-full rounded-b-md"
          />
        ) : (
          <div
            key={index}
            style={{
              zIndex: active ? 1 : 0,
              top: "5rem",
              height: "calc(100% - 5rem)",
            }}
            className="absolute left-0 flex flex-col items-center justify-center w-full overflow-hidden bg-gray-900 rounded-b-md"
          >
            <div className="grid flex-shrink-0 grid-cols-4 mx-auto gap-y-8 gap-x-12">
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
              <SuggestionButton
                onClick={() => setUrlToActiveTab("https://www.github.com")}
                icon={
                  <AiFillGithub className="w-8 h-8 text-white rounded-full" />
                }
                title="Github"
              />
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
              <SuggestionButton
                onClick={() =>
                  setUrlToActiveTab("https://www.stackoverflow.com")
                }
                icon={
                  <FaStackOverflow className="w-8 h-8 text-yellow-600 rounded-full" />
                }
                title="Stack overflow"
              />
            </div>
          </div>
        )
      )}
    </div>
  );
});

type BrowserIconProps = { className?: string };

export const BrowserIcon: React.FC<BrowserIconProps> = memo(({ className }) => {
  return (
    <div className={classNames("relative", className)}>
      <div
        className={classNames(
          "top-0 left-0 translate-x-[25%] translate-y-[21%] w-[67%] h-[66%] absolute bg-white rounded-b-lg",
          className
        )}
      />
      <SiBrave className={classNames("absolute text-orange-500", className)} />
    </div>
  );
});
