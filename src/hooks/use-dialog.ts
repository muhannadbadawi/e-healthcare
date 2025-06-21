import { useCallback, useState } from 'react';

export const useDialogHook = () => {
  const [isOpen, setIsOpen] = useState('');

  const openDialog = useCallback((dialogName: string) => {
    setIsOpen(dialogName);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen('');
  }, []);

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};
