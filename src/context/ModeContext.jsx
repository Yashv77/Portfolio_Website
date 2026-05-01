import React, { createContext, useContext } from 'react';
import { useStore } from '../store/useStore';

const ModeContext = createContext(null);

export const ModeProvider = ({ children, mode }) => {
  return (
    <ModeContext.Provider value={mode}>
      {children}
    </ModeContext.Provider>
  );
};

export const useAppMode = () => {
  const contextMode = useContext(ModeContext);
  const storeMode = useStore((state) => state.mode);
  return contextMode || storeMode;
};
