import { Cards } from "@/components/snippets/Cards";
import { Divider } from "@nextui-org/react";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Divider />
      <Cards />
    </>
  );
}
