import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Timer.css";

const Timer = ({ endDate, startDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());

      clearInterval(timerInterval);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [startDate, endDate]);

  function calculateTimeRemaining() {
    const now = moment();
    const end = moment(endDate);
    const diff = end.diff(now);
    const duration = moment.duration(diff);
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
    <div className="timer_container">
      <h5>Ending in </h5>
      <div className="timer_container_content">
        <div className="timer_day">
          <span>{timeRemaining.days} days</span>
        </div>{" "}
        :
        <div className="timer_hours">
          <span>{timeRemaining.hours} hours</span>
        </div>{" "}
        :
        <div className="timer_minutes">
          <span>{timeRemaining.minutes} minutes</span>
        </div>{" "}
        :
        <div className="timer_seconds">
          <span>{timeRemaining.seconds} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
