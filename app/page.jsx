"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import DataTable from "../components/app/DataTable";
import { Overview } from "../components/app/Overview";
import { AddNewCard } from "../components/app/AddNewCard";
import { useAddItem } from "../context/addItemContext";

function Home() {
  const [showSheet, SetShowSheet] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const { payments } = useAddItem();

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
    <div className="flex items-center overflow-hidden relative justify-center h-screen w-full bg-black  ">
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        exit={{ opacity: 0 }}
        className=" w-full h-full p-10 rounded-xl border bg-white">
        {/* OVERVIEW  */}
        <Overview />
        {/* THE DATA TABLE  */}
        <DataTable
          showSheet={showSheet}
          SetShowSheet={SetShowSheet}
          data={payments}
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
