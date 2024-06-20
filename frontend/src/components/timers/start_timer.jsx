import React, { useEffect, useState } from "react";


    const StartTimer = () => {
        const [seconds, setSeconds] = useState(10);

        const updateTime = () => {
            if (seconds > 0) {
                setSeconds(seconds => seconds - 1); 
            } else {
                setSeconds(0)
            }
        }

        useEffect(() => {
            const timeout = setTimeout(updateTime, 1000);
            return () => {
                clearTimeout(timeout);
            }
        })

        // const stringify = num => {
        //     if (num < 10){
        //         return "0" + num.toString();
        //     } else {
        //         return num;
        //     }
        // }

        return (
            <div className="start-timer">
                <span>GAME STARTING IN: {seconds}</span>
            </div>
        )
    }

export default StartTimer;