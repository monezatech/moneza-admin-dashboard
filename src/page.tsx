"use client"
import '../styles/globals.css';
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
export default function Dashboard() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/referrals");
  };
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="📚 Total Courses">
        <p className="text-4xl font-bold text-blue-600">24</p>
      </Card>
      <Card title="👥 Total Users">
        <p className="text-4xl font-bold text-green-600">1,240</p>
      </Card>
      <Card title="🎁 Referral Rewards">
        <p className="text-4xl font-bold text-purple-600">₹18,400</p>
      </Card>

      <button onClick={handleNavigate}>referrals</button>
    </div>
  );
}
