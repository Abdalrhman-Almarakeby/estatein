import { useEffect, useState } from "react";

export function useCapsLock() {
  const [capsLock, setCapsLock] = useState<boolean | null>(null);

  useEffect(() => {
    if ("getModifierState" in KeyboardEvent.prototype) {
      const initialState = new KeyboardEvent("").getModifierState("CapsLock");
      setCapsLock(initialState);
    }

    function handleKeyPress(event: KeyboardEvent) {
      if ("getModifierState" in event) {
        setCapsLock(event.getModifierState("CapsLock"));
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, []);

  return capsLock;
}
