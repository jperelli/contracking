import { Button } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { type Values } from "./ItemForm";
import { useEffect, useState } from "react";
import UUID from "pure-uuid";

export default function TrackerButton() {
  const [items, setItems] = useLocalStorage<Array<Values>>({
    key: "items",
    defaultValue: [],
  });
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [msElapsed, setMsElapsed] = useState<number>(0);

  const [tracking, { toggle: trackToggle }] = useDisclosure(false, {
    onOpen: () => {
      setStartedAt(new Date());
    },
    onClose: () => {
      if (!startedAt) return;
      setItems(
        items.concat({
          id: new UUID(4).toString(),
          startedAt: startedAt.toISOString(),
          endedAt: new Date().toISOString(),
          strength: 1,
        })
      );
      setMsElapsed(0);
      setStartedAt(null);
    },
  });

  useEffect(() => {
    if (!startedAt) return;
    const interval = setInterval(() => {
      setMsElapsed(new Date().getTime() - startedAt.getTime());
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, [startedAt]);

  return (
    <Button onClick={() => trackToggle()} color={tracking ? "red" : undefined} >
      <span>{tracking ? "Stop" : "Start"}</span>
      <br />
      <span>{msElapsed ? msElapsed : null}</span>
    </Button>
  );
}
