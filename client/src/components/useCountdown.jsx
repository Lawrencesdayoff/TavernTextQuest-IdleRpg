import {useState, useEffect} from 'react';

export default function useCountdown() {
    const [secondsleft, setSecondsLeft] = useState(0)

    useEffect(() => {
        if (secondsleft <= 0) return;

        const timeout = setTimeout(() => {
            setSecondsLeft(secondsleft - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsleft]);

    function start(seconds) {
        setSecondsLeft(seconds);
    }
    return {secondsleft, start}
}