import { useCallback, useState } from 'react';

const useInput = <T extends string | number>(
  initialValue: T,
  validator?: (value: T) => boolean,
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  let isValid = true;
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (typeof validator === 'function') {
      isValid = validator(value as T);
    }

    if (isValid) {
      setValue(value as T);
    }
  }, []);

  return [value, onChange];
};

export default useInput;
