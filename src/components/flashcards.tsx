"use client";

import { FlashCard } from "@prisma/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Flashcard } from "./flashcard";

export const Flashcards = ({ flashcards }: { flashcards: FlashCard[] }) => {
  const [card, setCard] = useState(0);

  const disableBack = card <= 0;
  const disableForward = card >= flashcards.length - 1;

  function handleBack() {
    if (disableBack) return;
    setCard((curr) => curr - 1);
  }

  function handleForward() {
    if (disableForward) return;
    setCard((curr) => curr + 1);
  }

  return (
    <div className="h-full flex items-center justify-center m-2">
      <Button
        variant="default"
        size="icon"
        onClick={handleBack}
        disabled={disableBack}
        className="shrink-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Flashcard card={flashcards[card]} />
      <Button
        variant="default"
        size="icon"
        onClick={handleForward}
        disabled={disableForward}
        className="shrink-0"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
