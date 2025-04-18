"use client";

import { Button } from "../../components/ui/button";
import { ChevronLeft, Server, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function Layout({ children }) {
  const path = usePathname();
  const isRootAuthRoute = path === "/auth";
  return (
    <div className="h-screen bg-black/70 relative">
      <title>Get your account</title>
      <div className="flex items-center justify-center flex-wrap gap-0 md:gap-0 w-full h-full p-5 md:p-5 z-20 backdrop-blur-[200px] ">
        <Banner />
        <div className="grow basis-[400px] h-full bg-white rounded-r-xl  relative overflow-hidden">
          {isRootAuthRoute ? <Logs /> : children}
        </div>
        {!isRootAuthRoute && <BackBtn />}
      </div>
    </div>
  );
}

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 grow basis-[300px] h-full  rounded-l-xl text-white shadow-xl bg-[url('/background.jpg')] bg-cover bg-center"></div>
  );
};

const Logs = () => {
  return (
    <motion.div
      initial={{ x: 20, filter: "blur(2px)" }}
      animate={{ x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.25 }}
      className="w-full h-full p-6 bg-white rounded-r-xl  flex items-center justify-center">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-7xl font-bold">
          Track your spendings. <br /> Take control of your money.
        </h1>

        <div className="flex flex-col gap-6">
          <p className="text-black/50">
            Our expense tracking app helps you understand where your money goes,
            set budgets that actually work, and build better financial habits —
            all in one place.
          </p>
          <p className="text-black/50">
            Whether you're managing daily expenses or planning for something
            big, we make it easy to stay on track and stress-free.
          </p>
          <div>
            <h2 className="font-bold text-2xl ">Ready to get started?</h2>
            <p className="text-black/50">
              Create an account or log in to begin managing your finances
              smarter and simpler.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link href={`/auth/login`} className="w-full">
            <Button className={`flex justify-between w-full`}>
              <p>Login using your account</p>
              <span className="flex items-center justify-between gap-4 w-[80px]">
                Login <UserRound />
              </span>
            </Button>
          </Link>
          <Link href={`/auth/signup`} className="w-full">
            <Button className={`flex justify-between w-full`}>
              <p>Dont't have an account?</p>
              <span className="flex items-center justify-between gap-4 w-[80px]">
                Signup <Server />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const BackBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className={`flex items-center justify-center absolute w-10 h-10 rounded-full z-20 top-12`}>
      <ChevronLeft />
    </Button>
  );
};

export default Layout;
