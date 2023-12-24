import { IconX } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

interface CustomModalProps {
  children?: ReactNode;
  setHidden: (a: false) => void;
}

export const CustomModal = ({ children, setHidden }: CustomModalProps) => {
  return (
    <div className=" min-h-14 min-w-32 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-14 px-24 shadow-2xl shadow-slate-900 dark:shadow-slate-300 bg-gray-600 dark:bg-gray-100">
      <button
        onClick={() => setHidden(false)}
        className="absolute top-5 right-5"
      >
        <IconX className="text-white dark:text-black" />
      </button>
      {children}
    </div>
  );
};
