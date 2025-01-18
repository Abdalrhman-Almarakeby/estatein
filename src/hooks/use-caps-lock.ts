import { useEffect, useState } from "react";

export function useCapsLock() {
  const [capsLock, setCapsLock] = useState(false);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      setCapsLock(event.getModifierState("CapsLock"));
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
