import React, { useState } from "react";

export type useBoolean = (
  state: boolean
) => [
  boolean,
  () => void,
  () => void
];

const useBoolean: useBoolean = (initState: boolean) => {
  const [state, setState] = useState<boolean>(initState);
  return [state, () => setState(true), () => setState(false)];
};

export default useBoolean;
