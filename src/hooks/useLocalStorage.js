import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const localStorageValue = window.localStorage.getItem(key);
    if (localStorageValue && JSON.parse(localStorageValue)?.length) {
      return JSON.parse(localStorageValue);
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
