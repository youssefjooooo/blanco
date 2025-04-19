import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAddItem } from "../../context/addItemContext";
export const AddNewCard = ({ setShowNew }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const [paymentItem, setPaymentItem] = useState({});
  const { handleCreateItem, setStatus } = useAddItem();

  useEffect(() => {
    const item = {
      title,
      description,
      amount,
      status: setStatus(amount),
    };
    setPaymentItem(item);
  }, [title, description, amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNew(false);
    handleCreateItem(paymentItem);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="absolute left-0 top-0 w-full h-full bg-black/70 backdrop-blur-lg flex items-center justify-center z-90 rounded-xl ">
      <Card className=" w-[60%]">
        <CardHeader>
          <CardTitle className={`text-xl font-semibold`}>
            So, What stupid shit did you spend your money on this time ?! 😂🤦‍♂️
          </CardTitle>
          <CardDescription>Enter your purchase information</CardDescription>
        </CardHeader>
        <CardContent>
          <form className={`flex flex-col gap-5`} onSubmit={handleSubmit}>
            <div>
              <label className="font-semibold" htmlFor="title">
                Title
              </label>
              <Input
                required={"Enter something"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type={`text`}
                placeholder={`What did you spend on ...`}
                id="title"
              />
            </div>
            <div>
              {" "}
              <label className="font-semibold" htmlFor="description">
                Description
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type={`text`}
                placeholder={`Descripe your purchase ...`}
                id="description"
              />
            </div>
            <div>
              <label className="font-semibold" htmlFor="amount">
                Amount
              </label>
              <Input
                value={amount > 0 ? amount : ""}
                onChange={(e) => setAmount(e.target.value * 1)}
                type={`number`}
                min={1}
                placeholder={`How much did you spend ...`}
                id="amount"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className={`flex items-center mt-5 justify-center gap-4`}>
          <Button
            onClick={() => setShowNew(false)}
            className={`bg-white  flex items-center justify-between shadow-sm text-black border hover:bg-[#ddd]/20 hover:text-black`}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className={`w-[90%] flex items-center justify-between shadow-sm `}>
            Done <ChevronRight />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
