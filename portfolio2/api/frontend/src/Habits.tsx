import React, { useEffect } from "react";

// Eksempel på en "habit" komponent
const Habit = ({ name }: { name: string }) => {
  // Oppdaterer state når komponenten lastes første gang
  useEffect(() => {
    console.log(`Habit "${name}" komponent lastet`);
  }, [name]);

  return <div>{name}</div>;
};

export default Habit;
