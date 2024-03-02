"use client";

import { FlashCard } from "@prisma/client";
import { useEffect, useState } from "react";

export const Flashcard = ({ card }: { card: FlashCard }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [card]);

  return (
    <div
      className="w-full aspect-video m-2 rounded-md bg-background p-2 flex items-center justify-center"
      onClick={() => setFlipped((curr) => !curr)}
    >
      <h3 className="max-w-lg text-2xl">
        {flipped ? card.definition : card.term}
      </h3>
    </div>
  );
};
