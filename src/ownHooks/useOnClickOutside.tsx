import React, {useEffect} from "react";

export function useOnClickOutside(ref: any, onClose: () => void) {
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}