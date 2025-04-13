import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9 border">
            {transaction.type === "credit" ? (
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            )}
            <AvatarFallback>{transaction.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.date}</p>
          </div>
          <div className={`ml-auto font-medium ${transaction.type === "credit" ? "text-green-500" : "text-red-500"}`}>
            {transaction.type === "credit" ? "+" : "-"}₹ {transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

const transactions = [
  {
    id: "1",
    name: "Arjun Patel",
    amount: 25000.0,
    date: "2023-11-14",
    type: "credit",
  },
  {
    id: "2",
    name: "Priya Sharma",
    amount: 15000.0,
    date: "2023-11-13",
    type: "debit",
  },
  {
    id: "3",
    name: "Vikram Reddy",
    amount: 35000.0,
    date: "2023-11-12",
    type: "credit",
  },
  {
    id: "4",
    name: "Divya Krishnan",
    amount: 12500.0,
    date: "2023-11-11",
    type: "debit",
  },
  {
    id: "5",
    name: "Rajesh Gupta",
    amount: 45000.0,
    date: "2023-11-10",
    type: "credit",
  },
];
