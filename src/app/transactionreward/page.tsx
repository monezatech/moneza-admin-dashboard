import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { CheckCircle, Gift, ArrowRightCircle } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "Referral Bonus",
    icon: <CheckCircle className="text-green-500" />,
    user: "John Doe",
    date: "04 June 2025",
    status: "Completed",
    amount: "₹250",
  },
  {
    id: 2,
    type: "Course Purchase",
    icon: <Gift className="text-black" />,
    date: "02 June 2025",
    amount: "₹1200",
  },
  {
    id: 3,
    type: "Withdrawal",
    icon: <ArrowRightCircle className="text-black" />,
    date: "28 May 2025",
    status: "Completed",
    amount: "₹3000",
  },
  {
    id: 4,
    type: "Course Purchase",
    icon: <Gift className="text-black" />,
    date: "20 May 2025",
    amount: "₹800",
  },
];

export default function TransactionsRewards() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Transactions / Rewards</h2>

      <Card className="p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div className="text-gray-600">Total Rewards Earned</div>
          <div className="text-2xl font-bold">₹5000</div>
        </div>
        <div>
          <div className="text-gray-600">Available Balance</div>
          <div className="text-2xl font-bold">₹3500</div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-gray-600">Referral Code</div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">ABCD1234</span>
            <Button className="bg-orange-500 text-white">Withdraw</Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="earned">Earned</TabsTrigger>
          <TabsTrigger value="spent">Spent</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4 space-y-4">
        {transactions.map((item) => (
          <Card key={item.id} className="p-4 flex justify-between items-start">
            <div className="flex gap-4">
              {item.icon}
              <div>
                <div className="font-semibold">{item.type}</div>
                {item.user && <div className="text-sm text-gray-600">Invited User: {item.user}</div>}
                <div className="text-sm text-gray-500">
                  Date: {item.date} {item.status && <>• Status: {item.status}</>}
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold">{item.amount}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

