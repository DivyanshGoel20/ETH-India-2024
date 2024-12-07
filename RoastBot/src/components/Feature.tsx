import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-md">
      <Icon className="w-12 h-12 mb-2 text-red-500" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-center">{description}</p>
    </div>
  );
}