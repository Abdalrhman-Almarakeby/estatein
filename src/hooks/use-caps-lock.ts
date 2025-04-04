import { useEffect, useState } from "react";

export function useCapsLock() {
  const [capsLockEnabled, setCapsLockEnabled] = useState(false);

  useEffect(() => {
    function handleKeyEvent(event: KeyboardEvent) {
      setCapsLockEnabled(event.getModifierState("CapsLock"));
    }

    window.addEventListener("keydown", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return capsLockEnabled;
}
