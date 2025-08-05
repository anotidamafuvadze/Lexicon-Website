import { useEffect, useRef } from "react";

/**
 * usePreviousProps
 * Returns the previous value of a tile
 */

function usePreviousProps<K = any>(value: K){
   const ref = useRef<K | undefined>(undefined); 

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePreviousProps;
