import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SideSheet } from "./SideSheet";

export const getColumns = (handleDelete) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className=" h-5 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("description")}</div>
    ),
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-start">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-start font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-2">
        <StatusColor status={row.getValue("status")} />
        {row.getValue("status")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment?._id);
                toast("Id copied to clipboard", {
                  description: (
                    <div className="text-[12px] text-black/50">
                      {new Date().toISOString()}
                    </div>
                  ),
                });
              }}>
              Copy payment ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <SideSheet id={payment._id} />
            <DropdownMenuItem
              onClick={() => {
                handleDelete(payment._id);
              }}
              className={`text-red-500 focus:text-red-500`}>
              Delete item <Trash2 className="text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const StatusColor = ({ status }) => {
  let color = "gray";
  switch (status) {
    case "normal":
      color = "#22c55e";
      break;
    case "mid":
      color = "#fbbf49";
      break;
    case "max":
      color = "#fb7549";
      break;
    default:
      color = "gray";
      break;
  }

  return (
    <div
      style={{ backgroundColor: color }}
      className="w-3 h-3 rounded-full p-1 "></div>
  );
};
