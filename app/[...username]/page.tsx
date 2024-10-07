"use client";

import { Card } from "@/components/snippets/Card";
import { LoadingSnippet } from "@/components/snippets/LoadingSnippet";
import { Avatar } from "@nextui-org/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface userDetails {
  username: string;
  email: string;
  picture: string;
  createdAt: string;
}

interface FileType {
  filename: string;
  language: string;
  code: string;
}

interface LikesTypes {
  sid: number;
  uid: number;
  reaction: string;
}

export interface SnippetType {
 sid: number;
  title: string;
  files: FileType[];
  user: {
    username: string;
    picture: string;
  };
  likes: LikesTypes[];
  createdAt: string;
  totalLikes: number;
}

const Page = () => {

  const [userDetails, setUserDetails] = React.useState<userDetails>({
    username: "",
    email: "",
    picture: "",
    createdAt: ""
  });
  const [snippets, setSnippets] = React.useState<SnippetType[]>();
  const [loading, setLoading] = React.useState(true);

  const params = useParams();
  const router = useRouter();

  async function getSnippets() {
    const username = params.username[0];
    const res = await fetch("/api/user/getsnippets", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setSnippets(data);  
  }
  
  async function getUserDetails() {
    const username = params.username[0];
    const res = await fetch(`/api/user/getuser`, {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    
    if(data.status == 404){
      router.push("/404");
    }
    
    setUserDetails({
      username: data.username,
      email: data.email,
      picture: data.picture,
      createdAt: data.createdAt
    });
    setLoading(false);
    if (data.username){
      getSnippets();
    }
  }

  useEffect(() => {
    if (params.username){
      getUserDetails();
    }else {
      redirect("/404");
    }
  }, [params]);
  
  return <>
    <div className="flex justify-center py-8 items-center sm:gap-9 gap-4 bg-zinc-900 flex-col sm:flex-row">

      {
        loading && <>
          <div className="animate-pulse bg-zinc-600 h-24 w-24 md:h-36 md:w-36 rounded-full"></div>
          <div className="flex flex-col gap-2 sm:items-start items-center">
            <div className="animate-pulse bg-zinc-600 h-5 w-24 rounded-full"></div>
            <div className="animate-pulse bg-zinc-600 h-4 w-36 rounded-full"></div>
            <div className="animate-pulse bg-zinc-600 h-4 w-36 rounded-full"></div>
          </div>
        </>
      }
      {!loading && <>
      <Avatar 
        src={userDetails?.picture || ""}
        isBordered={true}
        size="lg"
        className="w-24 h-24 md:w-36 md:h-36"
      />

      <div className="flex flex-col gap-1 sm:items-start items-center">
        <h1 className="text-2xl font-semibold">{userDetails?.username}</h1>
        <h2 className="text-default-400">{userDetails?.email}</h2>
        <h4 className="text-default-400">Joined on {userDetails.createdAt && userDetails.createdAt !== "" ? userDetails.createdAt.split("T")[0].split("-").reverse().join("-") : null}
        </h4>
      </div>

    </>}
    </div>

    <div className="flex justify-center my-8">
      <h2 className="text-lg border-b-3 cursor-pointer border-blue-500">My Snippets</h2>
    </div>

    <div className="my-10 max-w-3xl mx-10 md:mx-auto">
    {
        snippets && snippets.length === 0 && <div className="flex gap-4 justify-center">
          <h2 className="text-default-400">This user has not shared any snippets yet</h2>
        </div>
      }
    {
        !snippets ? <LoadingSnippet /> : snippets.length > 0 && snippets.map((snip, index) => (
          <Card key={index} snippets={snip} />
        ))
      }
    </div>
  </>;
};

export default Page;