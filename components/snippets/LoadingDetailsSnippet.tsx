import { Divider } from "@nextui-org/react";
import React from "react";

export default function LoadingDetailsSnippet() {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mx-5 mt-10 mb-6 md:mx-20">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="animate-pulse w-10 h-10 md:w-14 md:h-14 hidden sm:block rounded-full bg-gray-600" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="flex items-center gap-1">
              <div className="animate-pulse w-20 h-4 bg-gray-600 rounded-lg" />
              /
              <div className="animate-pulse w-80 h-4 bg-gray-600 rounded-lg" />
            </h4>
            <h5 className="animate-pulse w-32 h-4 bg-gray-600 rounded-lg" />
          </div>
        </div>

        <div className="animate-pulse w-28 h-10 bg-gray-600 rounded-lg" />
      </div>
      <Divider />

        <div className="max-w-4xl m-auto">

        
      <div className="animate-pulse flex space-x-4 max-w-3xl m-auto my-10">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-5 bg-gray-600 rounded w-3/4"></div>

          <div className="flex gap-3 md:gap-5 mt-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full"></div>

            <div className="flex flex-col gap-1 items-start justify-center">
              <div className="w-24 h-6 md:w-24 md:h-3 rounded bg-gray-600" />
              <div className="w-16 h-6 md:w-16 md:h-3 rounded bg-gray-600" />
            </div>
          </div>
          <div className="h-72 bg-gray-600 rounded w-full"></div>
        </div>
      </div>
      <Divider />

      <div className="animate-pulse flex space-x-4 max-w-3xl m-auto my-10">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-5 bg-gray-600 rounded w-3/4"></div>

          <div className="flex gap-3 md:gap-5 mt-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full"></div>

            <div className="flex flex-col gap-1 items-start justify-center">
              <div className="w-24 h-6 md:w-24 md:h-3 rounded bg-gray-600" />
              <div className="w-16 h-6 md:w-16 md:h-3 rounded bg-gray-600" />
            </div>
          </div>
          <div className="h-72 bg-gray-600 rounded w-full"></div>
        </div>
      </div>
      </div>
    </>
  );
}
