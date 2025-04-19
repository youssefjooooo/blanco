import { color } from "framer-motion";
import { MiniCard } from "./MiniCard";
import { useAddItem } from "../../context/addItemContext";
import UserCard from "../app/UserCard";
export const Overview = () => {
  const { payments } = useAddItem();
  let total = 0;
  payments.map((item) => (total += +item.amount));
  const last_expense = payments[payments.length - 1]?.amount || 0;
  const max_expence =
    payments.length > 0
      ? Math.max(...payments.map((item) => Number(item?.amount)))
      : 0;
  const monthly_limit = 7000;

  const overview_data = [
    {
      mini_title: "Total Expences",
      value: total,
      mini_invoice: `${payments.length} total`,
      color: "#111",
    },
    {
      mini_title: "Monthly Limint",
      value: monthly_limit,
      mini_invoice: `Remaining: $${monthly_limit - total}`,
      color: "#fbbf49",
    },
    {
      mini_title: "Last Expence",
      value: last_expense,
      mini_invoice: `Max expence: $${max_expence}`,
      color: "#fb7549",
      title: payments[payments.length - 1]?.title,
    },
  ];
  return (
    <div className="flex flex-col gap-7 mb-8">
      <div className="w-full flex items-center justify-between gap-10">
        <h2 className="text-4xl font-bold ">Expences Overview</h2>
        <UserCard />
      </div>

      <div className="border rounded-xl gap-2 flex items-center justify-center p-3 px-5">
        {overview_data.map((item, index) => (
          <MiniCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
