"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../components/ui/card";
import { Book, Users, UserCheck, Gift, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  const items = [
    {
      title: "Course Management",
      icon: <Book className="h-10 w-10 text-blue-600" />,
      count: "24 Courses",
      path: "/courses",
    },
    {
      title: "All Users",
      icon: <Users className="h-10 w-10 text-green-600" />,
      count: "1,240 Users",
      path: "/users",
    },
    {
      title: "Active Users",
      icon: <UserCheck className="h-10 w-10 text-orange-600" />,
      count: "850 Active",
      path: "/active-users",
    },
    {
      title: "Referral Management",
      icon: <Gift className="h-10 w-10 text-purple-600" />,
      count: "₹18,400 Rewards",
      path: "/referrals",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className="cursor-pointer transition-all hover:shadow-xl"
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            {item.icon}
            <h3 className="text-lg font-semibold text-center">{item.title}</h3>
            <p className="text-2xl font-bold text-center">{item.count}</p>

            <Button
              variant="outline"
              className="mt-4 flex items-center gap-2"
              onClick={() => router.push(item.path)}
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
