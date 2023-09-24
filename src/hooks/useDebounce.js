import { useEffect } from 'react';
import { useState } from 'react';

export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('');
    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounce(value);

            return () => {
                clearTimeout(handle);
            };
        }, [delay]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return valueDebounce;
};
