import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const page = () => {
  return <>
    <div className="flex justify-center items-center h-[80vh] flex-col gap-6">
        <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>

        <Link href="/">
            <Button color="primary" variant="solid">
                Go back home
            </Button>
        </Link>
    </div>
  </>;
};

export default page;