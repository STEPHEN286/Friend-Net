import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import { userProgressSliceActions } from '../../../store/slices/userProgressSlice';

const CustomModal = ({ 
  isOpen,
  title = '', 
  description = '', 
  children, 
  className = '',
  showHeader = true 
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(userProgressSliceActions.setModalOpen());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} >
      <DialogContent className={` ${className}`}>
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