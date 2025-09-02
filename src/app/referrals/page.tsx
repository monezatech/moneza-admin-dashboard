"use client"
import { Card } from '@/components/ui/card';

const referrals = [
  { user: 'Ravi Sharma', course: 'React Native Basics', reward: '₹100' },
  { user: 'Anita Mehta', course: 'Fullstack Bootcamp', reward: '₹200' },
];

export default function Referrals() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Referral Activity</h1>
      {referrals.map((ref, index) => (
        <Card key={index} title={`👤 ${ref.user}`}>
          <p className="text-gray-700">
            Referred <strong>{ref.course}</strong> and earned <strong className="text-green-600">{ref.reward}</strong>
          </p>
        </Card>
      ))}
    </div>
  );
}