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
          <p className="text-8xl text-white">{format(today, "p")}</p>
          <p className="text-3xl text-white pt-12">{format(today, "PPP")}</p>
          <p className="text-md text-white pt-2">
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
            className="inline-block h-28 w-28 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <p className="text-xl text-white pt-3">Admin</p>
          <div className="relative flex space-x-3 mt-8">
            <input
              type="password"
              className="min-w-lg focus:border-indigo-500 focus:ring-indigo-500 text-md text-white py-1 px-2 bg-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-full -translate-y-1 inline-flex items-center rounded-full bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <BsUnlock className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
