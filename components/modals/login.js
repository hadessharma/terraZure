import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import Image from "next/image";

import { LoadingSpinner } from "../loading-spinner";

export default function LoginModal({ title }) {
  const [loading, setLoading] = useState(false);

  const handleGitHUBLogin = async () => {
    try {
      setLoading(true);
      await signIn("github");
      setLoading(false);
      toast({
        description: "Logged In successfully",
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm font-semibold hover:text-red-500 transition-all">
        {title === "signIn" ? (
          "Sign In"
        ) : (
          <p className="text-md text-red-500 cursor-pointer">Register</p>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Continue With</DialogTitle>
        </DialogHeader>
        <Separator className="bg-gray-300 w-full h-[2px]" />
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex items-center justify-evenly">
            <Button
              onClick={handleGitHUBLogin}
              className="flex flex-col items-center justify-center gap-2 h-[120px] w-[150px]"
            >
              <Image src="/github.png" height="50" width="50" alt="NF" />
              <p>Github</p>
            </Button>
            <Button
              variant="destructive"
              className="flex flex-col items-center justify-center gap-2 h-[120px] w-[150px]"
            >
              <Image src="/google.webp" height="50" width="50" alt="NF" />
              <p>Google</p>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
