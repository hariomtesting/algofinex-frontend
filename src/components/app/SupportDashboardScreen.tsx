import React from 'react';
import { SupportPage } from '../marketing/SupportPage';

interface SupportDashboardScreenProps {
  onNavigate: (tab: any) => void;
}

export const SupportDashboardScreen: React.FC<SupportDashboardScreenProps> = ({ onNavigate }) => {
  return (
    <div className="p-2 sm:p-4 max-w-[1400px] mx-auto text-left">
      <SupportPage onNavigate={(path) => onNavigate(path.replace('/app/', '') as any)} />
    </div>
  );
};
