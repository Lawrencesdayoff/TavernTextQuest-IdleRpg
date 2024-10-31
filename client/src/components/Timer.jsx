import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Timer = (props) => {
  const {queststart, days, hours, minutes, seconds} = props;
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  // const [startdate, setStartDate] = useState("");


  // const getTime = (creationdate) => {
  //   const time = Math.abs(Date.parse(formatDate(creationdate)) - Date.now());
  //   setDays(Math.abs(Math.floor((time / (1000 * 60 * 60 * 24)))));
  //   setHours(Math.abs(Math.floor((time / (1000 * 60 * 60)) % 24)));
  //   setMinutes(Math.abs(Math.floor((time / 1000 / 60) % 60)));
  //   setSeconds(Math.abs(Math.floor((time / 1000) % 60)));
  // };
  // const formatDate = (dateString) => {
  //   const options = { hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" , second: "2-digit"}
  //   return new Date(dateString).toLocaleDateString([], options)
  // };

  // useEffect(() => {
  //   setStartDate(queststart)
  //   // console.log(startdate)
  //   const interval = setInterval(() => getTime(startdate), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, []);

  return (
  <>
    <div className="timer">
      <p>
               {hours < 10 ? "0" + hours : hours} : 
               {minutes < 10 ? "0" + minutes : minutes} : 
               {seconds < 10 ? "0" + seconds : seconds}               
              </p>
    </div>
    </>
  );
  
};

export default Timer;