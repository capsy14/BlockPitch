'use client'; // 👈 Important

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function MessageButton({ founderId }: { founderId: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/investor/dashboard/messages?recipientId=${founderId}`);
  };

  return (
    <Button className="my-3 w-full" size="lg" onClick={handleClick}>
      Message
    </Button>
  );
}
