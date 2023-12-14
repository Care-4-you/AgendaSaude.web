import React, { ReactNode } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default RegisterModal;
