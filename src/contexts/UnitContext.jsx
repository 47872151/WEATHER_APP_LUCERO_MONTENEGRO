import React, { createContext, useContext, useState } from 'react';

const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [unit, setUnit] = useState('C');
  const value = { unit, setUnit };
  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  return useContext(UnitContext);
}
