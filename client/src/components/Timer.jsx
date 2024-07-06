import { useEffect, useState } from React;

const Timer = () => {
    const [secondselapsed, setSecondsElapsed] = useState(0);
    const [minuteselapsed, setMinutesElapsed] = useState(0);
    const [hourselapsed, setHoursElapsed] = useState(0);
    useEffect(() => {
        
        const handleSecondElapsed = () => {
            setSecondsElapsed(secondselapsed + 1)
        }
        
        if(secondselapsed == 60){
            setSecondsElapsed(0);
            setMinutesElapsed(minuteselapsed + 1);
        }
        else if (minuteselapsed == 60){
            setMinutesElapsed(0);
            setHoursElapsed(0);
            setHoursElapsed( hourselapsed + 1);;
        }
        handleSecondElapsed();
        const {hourselapsed, minuteselapsed, secondselapsed} = totaltime;
        return  totaltime;
    }, 1000)
}


export default Timer;