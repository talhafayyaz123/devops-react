'use client';
import React from 'react';

interface UserStatsProps {
  stats: {
    label: string;
    value: number;
  }[];
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  return (
    <div className="flex flex-col space-y-6 self-center">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl bg-[#FBFCFF] border border-gray-200 p-4 min-w-40 mr-4"
        >
          <p className="text-xs text-gray-500">{stat.label}</p>
          <p className="text-4xl text-blue-200 font-markForMC">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
