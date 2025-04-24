"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import DataTable from "../components/app/DataTable";
import { Overview } from "../components/app/Overview";
import { AddNewCard } from "../components/app/AddNewCard";
import { useRouter } from "next/navigation";

function Home() {
  const [showSheet, SetShowSheet] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [payments, setPayments] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    }
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowNew(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowNew]);

  return (
    <div className="flex items-center overflow-hidden relative justify-center h-screen w-full bg-black p-5 ">
      <motion.div
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        className=" w-full h-full p-10 rounded-xl  bg-white">
        {/* OVERVIEW  */}
        <Overview payments={payments} />
        {/* THE DATA TABLE  */}
        <DataTable
          showSheet={showSheet}
          SetShowSheet={SetShowSheet}
          setPayments={setPayments}
          showNew={showNew}
          setShowNew={setShowNew}
        />
        {/* ADD NEW ITEM CARD  */}
        <AnimatePresence>
          {showNew && <AddNewCard setShowNew={setShowNew} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Home;
