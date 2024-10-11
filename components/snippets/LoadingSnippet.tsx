import { Divider } from "@nextui-org/react";
import React from "react";

export const LoadingSnippet = () => {
  return <>
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-5 bg-gray-600 rounded w-3/4"></div>

        <div className="flex gap-3 md:gap-5 mt-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full"></div>

              <div className="flex flex-col gap-1 items-start justify-center">
                <div className="w-24 h-6 md:w-24 md:h-3 rounded bg-gray-600" />
                <div className="w-16 h-6 md:w-16 md:h-3 rounded bg-gray-600" />
              </div>
              
            </div>
            <div className="h-48 bg-gray-600 rounded w-full"></div>
      </div>
    </div>

    <Divider className="my-6" />

    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-5 bg-gray-600 rounded w-3/4"></div>

        <div className="flex gap-3 md:gap-5 mt-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full"></div>

              <div className="flex flex-col gap-1 items-start justify-center">
                <div className="w-24 h-6 md:w-24 md:h-3 rounded bg-gray-600" />
                <div className="w-16 h-6 md:w-16 md:h-3 rounded bg-gray-600" />
              </div>
              
            </div>
            <div className="h-48 bg-gray-600 rounded w-full"></div>
      </div>
    </div>
  </>;
};


