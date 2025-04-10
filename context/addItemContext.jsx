"use client";

const { createContext, useContext, useState, useEffect } = require("react");
import { toast } from "sonner";

// 1- CREATE CONTEXT
const addItemContext = createContext();

// 2- PROVIDE THE CONTEXT WITH DATA
export const AddItemProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const res = await fetch(
          "https://blanco-backend.vercel.app/api/v1/expences"
        );
        if (!res.ok)
          throw new Error("There was a problem with the fetch request.");
        const data = await res.json();
        setPayments(data.data.expences);
      } catch (err) {
        console.error("Error", err);
      }
    };

    getPayments();
  }, [reload]);

  const handleReload = () => setReload((prev) => !prev);

  const handleCreateItem = async (item) => {
    if (item.title !== "") {
      setPayments((prev) => [...prev, item]);
      try {
        const res = await fetch(
          "https://blanco-backend.vercel.app/api/v1/expences",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          }
        );
        handleReload();
        if (!res.ok) {
          toast(
            <div className="text-red-500">Fill in the required data!</div>,
            {
              description: (
                <div className="text-[12px] text-black/50">
                  {new Date().toISOString()}
                </div>
              ),
            }
          );
          throw new Error("Failed to create payment");
        }
      } catch (err) {
        console.error("Error:", err);
      }
      toast(
        <div className="w-full flex items-center justify-between gap-10">
          <div>Item created sccessfully!</div>
          <div className="text-black/75 capitalize">
            Item title: {item.title}
          </div>
        </div>,
        {
          description: (
            <div className="text-[12px] text-black/50">
              {new Date().toISOString()}
            </div>
          ),
        }
      );
    } else {
      toast(<div className="text-red-500">Fill in the required data!</div>, {
        description: (
          <div className="text-[12px] text-black/50">
            {new Date().toISOString()}
          </div>
        ),
      });
    }
  };

  const handleUpdateItem = async (item) => {
    await fetch(
      `https://blanco-backend.vercel.app/api/v1/expences/${item._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );
    handleReload();
    toast(
      <div className="w-full flex items-center justify-between gap-10">
        <div>Item updated sccessfully!</div>
        <div className="text-black/75 ">Track Id: {item._id}</div>
      </div>,
      {
        description: (
          <div className="text-[12px] text-black/50">
            {new Date().toISOString()}
          </div>
        ),
      }
    );
  };

  const handleDeleteItem = async (itemId) => {
    await fetch(`https://blanco-backend.vercel.app/api/v1/expences/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    handleReload();

    toast(<div className="text-red-500">Item deleted successfully !</div>, {
      description: (
        <div className="text-[12px] text-black/50">
          {new Date().toISOString()}
        </div>
      ),
    });
  };

  const setStatus = (amount) => {
    if (amount >= 500) return "max";
    if (amount > 100) return "mid";
    return "normal";
  };

  return (
    <addItemContext.Provider
      value={{
        payments,
        handleCreateItem,
        setStatus,
        handleDeleteItem,
        handleUpdateItem,
      }}>
      {children}
    </addItemContext.Provider>
  );
};

// RETURN THE CONTEXT WITHIN A CUSTOM HOOK
export const useAddItem = () => {
  const context = useContext(addItemContext);
  if (!context)
    throw new Error("Can't use addNewItem context outside of it's scope");
  return context;
};
