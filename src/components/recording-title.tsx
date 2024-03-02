"use client";

import { Recording } from "@prisma/client";
import { Button } from "./ui/button";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { updateName } from "@/actions/recording";

export const RecordingTitle = ({ recording }: { recording: Recording }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(recording.name);

  function handleSave() {
    if (name.length < 3) return handleClose();
    setEditing(false);
    updateName(recording.id, name);
  }

  function handleClose() {
    setName(recording.name);
    setEditing(false);
  }

  return (
    <div className="group flex items-center gap-x-2 h-10">
      {!editing ? (
        <>
          <h1 className="font-semibold text-3xl">{name}</h1>
          <Button
            size="sm"
            variant={"ghost"}
            className="opacity-0 group-hover:opacity-100 transition"
            onClick={() => setEditing(true)}
          >
            <Pencil className="size-4" />
          </Button>
        </>
      ) : (
        <>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" onClick={handleSave}>
            <Save className="size-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleClose}>
            <X className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
};
