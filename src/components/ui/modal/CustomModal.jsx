import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import { setModalOpen } from '../../../store/features/userSlice';

const CustomModal = ({ 
  isOpen, 
  title, 
  description, 
  children, 
  className = '',
  showHeader = true 
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} >
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        {showHeader && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal; 