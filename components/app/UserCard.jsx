"use client";

import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AccountInfo from "./AccountInfo";

function UserCard() {
  const [userData, setUserData] = useState([]);
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://blanco-backend.vercel.app/api/v1/users/login",
          {
            next: { revalidate: 60 * 10 },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );

        if (!res.ok) throw new Error("There was a problem!!");
        const data = await res.json();

        setUserData(data.user);
      } catch (err) {
        console.error("Error");
      }
    };

    getData();
  }, []);

  const [openAcc, setOpenAcc] = useState(false);
  return (
    userData && (
      <div className="rounded-full shadow-md p-2 flex items-center justify-between gap-18 min-w-[400px] relative z-50 border">
        <p className="font-semibold text-2xl px-2 pl-6">{userData.name}</p>
        <div
          onClick={() => setOpenAcc(!openAcc)}
          className={`w-12 h-12 rounded-full shadow p-3 bg-black text-white flex items-center justify-center cursor-pointer `}>
          <CircleUserRound size={48} strokeWidth={2} absoluteStrokeWidth />
        </div>
        <AnimatePresence>
          {openAcc && <AccountInfo userData={userData} />}
        </AnimatePresence>
      </div>
    )
  );
}

export default UserCard;
