import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useAddItem } from "../../context/addItemContext";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export const SideSheet = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const { handleUpdateItem, payments } = useAddItem();
  const [tempItem, setTempItem] = useState({});

  const temp = payments.find((item) => item._id === id);

  useEffect(() => {
    if (temp) {
      setTempItem(temp);
      setTitle(temp.title);
      setDescription(temp.description);
      setAmount(temp.amount);
    }
  }, [temp]);

  useEffect(() => {
    setTempItem((prevItem) => ({
      ...prevItem,
      title,
      description: description,
      amount: amount,
    }));
  }, [title, description, amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateItem(tempItem);
  };

  return (
    <Sheet>
      <SheetTrigger className="text-sm px-2 py-1.5 w-full text-start hover:bg-[#ddd]/30 rounded-md">
        Edit
      </SheetTrigger>
      <SheetContent className="p-2 w-full flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-10">
          <SheetHeader>
            <SheetTitle>Edit this item</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently update your
              item.
            </SheetDescription>
          </SheetHeader>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div>
              <label className="font-semibold" htmlFor="title">
                Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="What did you spend on ..."
                id="title"
              />
            </div>
            <div>
              <label className="font-semibold" htmlFor="description">
                Description
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Describe your purchase ..."
                id="description"
              />
            </div>
            <div>
              <label className="font-semibold" htmlFor="amount">
                Amount
              </label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min={1}
                placeholder="How much did you spend ..."
                id="amount"
              />
            </div>
          </form>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full flex items-center justify-between shadow-sm">
          Done <ChevronRight />
        </Button>
      </SheetContent>
    </Sheet>
  );
};
