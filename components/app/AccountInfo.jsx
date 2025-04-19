"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { CircleUserRound, LogOut } from "lucide-react";
import { toast } from "sonner";

const AccountInfo = ({ userData }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
    toast("See you around! 👋");
  };

  return (
    <motion.div
      initial={{ y: -5, opacity: 0, filter: "blur(2px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: -10, opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.15 }}
      className="rounded-b-md rounded-tr-3xl rounded-tl-0 shadow-lg border p-2 absolute bg-black text-white left-0 w-full -bottom-2 transform translate-y-full z-10 flex flex-col gap-5">
      <div className=" relative mb-5">
        <div className="overflow-hidden w-full h-24 rounded-3xl">
          <Image
            src={`/background.jpg`}
            alt="Image"
            width={1200}
            height={20}
            className="object-cover object-center"
            quality={50}
          />
        </div>

        <div className="p-1.5 bg-black flex items-center justify-center rounded-full w-15 h-15 absolute left-5 top-1/2 transform translate-y-[40%] z-30 border-t border-white">
          <CircleUserRound size={48} strokeWidth={1} absoluteStrokeWidth />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start px-4">
        <p className="font-bold text-2xl mb-2">{userData.name}</p>
        <div className="flex gap-2">
          <span className="font-bold">Email: </span>
          <p className="text-white/80">{userData.email}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Phone: </span>
          <p className="text-white/80">{userData.phone}</p>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        className={`text-black bg-white hover:bg-white/90 hover:text-black w-full flex items-center justify-between`}>
        Logout <LogOut />
      </Button>
    </motion.div>
  );
};

export default AccountInfo;
