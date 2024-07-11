import React, { createContext, useState } from 'react';

export const TelegramSolution = createContext();

const TelegramSolutionContext = ({ children }) => {
  const [teleSol, setTeleSol] = useState(null);

  return (
    <TelegramSolution.Provider value={{ teleSol, setTeleSol }}>
      {children}
    </TelegramSolution.Provider>
  );
};

export default TelegramSolutionContext;
