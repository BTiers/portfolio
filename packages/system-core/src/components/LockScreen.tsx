import React, { FC, useEffect, useState } from "react";

import { format } from "date-fns";

import { BsUnlock } from "react-icons/bs";

import { useIdle, useInterval } from "react-use";

const TWO_MINUTE = 120e3;
const FIVE_SECOND = 5e3;

function useIsScreenLock() {
  const isInactive = useIdle(TWO_MINUTE);
  const [isScreenLock, setIsScreenLock] = useState(false);

  useEffect(() => {
    if (isInactive && !isScreenLock) setIsScreenLock(true);
  }, [isInactive]);

  return { isScreenLock, setIsScreenLock, isInactive };
}

export type LockScreenProps = Record<string, never>;

export const LockScreen: FC<LockScreenProps> = ({ children }) => {
  const { isScreenLock, isInactive, setIsScreenLock } = useIsScreenLock();
  const [today, setToday] = useState(new Date());

  useInterval(() => {
    setToday(new Date());
  }, FIVE_SECOND);

  if (!isScreenLock) return null;

  return (
    <div className="absolute flex flex-col justify-center items-center h-screen w-screen backdrop-blur-md bg-gray-900/80 z-[999999]">
      {isInactive && (
        <div className="flex flex-col items-center">
          <p className="text-white text-8xl">{format(today, "p")}</p>
          <p className="pt-12 text-3xl text-white">{format(today, "PPP")}</p>
          <p className="pt-2 text-white text-md">
            Click or press a key to unlock
          </p>
        </div>
      )}
      {!isInactive && (
        <form
          onSubmit={() => setIsScreenLock(false)}
          className="flex flex-col items-center"
        >
          <img
            className="inline-block rounded-full h-28 w-28"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <p className="pt-3 text-xl text-white">Admin</p>
          <div className="relative flex mt-8 space-x-3">
            <input
              type="password"
              className="px-2 py-1 text-white bg-gray-700 min-w-lg focus:border-indigo-500 focus:ring-indigo-500 text-md focus:outline-none"
            />
            <button
              type="submit"
              className="absolute inline-flex items-center p-2 text-gray-800 -translate-y-1 bg-white rounded-full shadow-sm left-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <BsUnlock className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
