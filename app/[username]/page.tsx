"use client";

import { Card } from "@/components/snippets/Card";
import { LoadingSnippet } from "@/components/snippets/LoadingSnippet";
import { Snippet, User } from "@/utils/types";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const [userDetails, setUserDetails] = React.useState<User>({
    uid: -1,
    username: "",
    email: "",
    picture: "",
    nickname: "",
    createdAt: new Date(),
  });
  const [snippets, setSnippets] = React.useState<Snippet[]>();
  const [loading, setLoading] = React.useState(true);

  const params = useParams();
  const router = useRouter();

  async function getSnippets() {
    const username = params.username;
    const res = await fetch("/api/user/mysnippets", {
      method: "POST",
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setSnippets(data);
  }

  async function getUserDetails() {
    const username = params.username;
    const res = await fetch(`/api/user/getuser`, {
      method: "POST",
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ username }),
    });

    if (res.status == 200) {
      const data = await res.json();

      setUserDetails({
        uid: -1,
        username: data.username,
        nickname: data.nickname,
        email: data.email,
        picture: data.picture,
        createdAt: data.createdAt,
      });
      setLoading(false);
      if (data.username) {
        getSnippets();
      }
    }else{
      router.push("/404");
    }
  }

  useEffect(() => {
    if (params.username) {
      getUserDetails();
    } else {
      redirect("/404");
    }
  }, [params]);

  return (
    <>
      <div className="flex justify-center py-8 items-center sm:gap-9 gap-4 bg-zinc-900 flex-col sm:flex-row">
        {loading && (
          <>
            <div className="animate-pulse bg-zinc-600 h-24 w-24 md:h-36 md:w-36 rounded-full"></div>
            <div className="flex flex-col gap-2 sm:items-start items-center">
              <div className="animate-pulse bg-zinc-600 h-5 w-24 rounded-full"></div>
              <div className="animate-pulse bg-zinc-600 h-4 w-36 rounded-full"></div>
              <div className="animate-pulse bg-zinc-600 h-4 w-36 rounded-full"></div>
            </div>
          </>
        )}
        {!loading && (
          <>
            <Image
              src={userDetails?.picture || ""}
              width={100}
              height={100}
              className="w-24 h-24 md:w-36 md:h-36 rounded-full"
              alt="User Image"
            />

            <div className="flex flex-col gap-1 sm:items-start items-center">
              <h1 className="text-3xl font-semibold">
                {userDetails?.nickname}
              </h1>
              <h2 className="text-default-400">@{userDetails?.username}</h2>
              <h2 className="text-default-400">{userDetails?.email}</h2>
              <h4 className="text-default-400">
                Joined on{" "}
                {userDetails.createdAt
                  ? new Date(userDetails.createdAt).toLocaleDateString()
                  : null}
              </h4>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center my-8">
        <h2 className="text-lg border-b-3 cursor-pointer border-blue-500">
          My Snippets
        </h2>
      </div>

      <div className="my-10 max-w-3xl mx-10 md:mx-auto">
        {snippets && snippets.length === 0 && (
          <div className="flex gap-4 justify-center">
            <h2 className="text-default-400">
              This user has not shared any snippets yet
            </h2>
          </div>
        )}
        {!snippets ? (
          <LoadingSnippet />
        ) : (
          snippets.length > 0 &&
          snippets.map((snip, index) => <Card key={index} snippets={snip} />)
        )}
      </div>
    </>
  );
};

export default Page;
