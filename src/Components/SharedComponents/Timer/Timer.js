import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Timer.css";

const Timer = ({ endTime, startTime,setTimeoutMsgVisible }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
      // console.log(timeRemaining.seconds );
      if (timeRemaining.days  <= 0 && timeRemaining.hours  <= 0 && timeRemaining.minutes  <= 0 && timeRemaining.seconds <= 0) {
        clearInterval(timerInterval);
         console.log(timeRemaining.seconds );
        setTimeoutMsgVisible(true);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  function calculateTimeRemaining() {
    const now = moment();
    const start = moment(startTime);
    const end = moment(endTime);
    const duration = moment.duration(end.diff(now));
    // console.log(end);
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="timer_container" >
      <h5>Ending in  </h5>
      <div className="timer_container_content">
        <div className="timer_day">{timeRemaining.days} days</div> :
        <div className="timer_hours">{timeRemaining.hours} hours</div> :
        <div className="timer_minutes">{timeRemaining.minutes} minutes</div> 
        <div className="timer_seconds">{timeRemaining.seconds} seconds</div>
      </div>
    </div>
  );
};

export default Timer;
