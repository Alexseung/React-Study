import React, {useState, useCallback} from 'react';

export default function hook(def: boolean = true) {
  const [value, valueChanger] = useState(def);
  const Toggle = () => {
    valueChanger(!value);
  };
  const On = useCallback(() => {
    valueChanger(true);
  }, []);
  const Off = useCallback(() => {
    valueChanger(false);
  }, []);
  return {value, Toggle, On, Off};
}
