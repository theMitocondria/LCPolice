import React, { createContext, useState } from 'react';

export const TelegramSolution = createContext();

const TelegramSolutionContext = ({ children }) => {

  const [questionId, setQuestionId] = useState(null);

  return (
    <TelegramSolution.Provider value={{ questionId, setQuestionId }}>
      {children}
    </TelegramSolution.Provider>
  );
};

export default TelegramSolutionContext;
