// import React from "https://esm.sh/react";
// import ReactDOM from "https://esm.sh/react-dom";

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeAmountLeft, setTimeAmountLeft] = React.useState(1500);
  const [clockType, setClockType] = React.useState("SESSION");
  const [play, setPlay] = React.useState(false);
  
  const timeOut = setTimeout(() => {
    if(timeAmountLeft && play){
      setTimeAmountLeft(timeAmountLeft - 1)
    }
  }, 1000);
  
  const handleBreakIncrement = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrement = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const handleSessionIncrement = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTimeAmountLeft(timeAmountLeft + 60)
    }
  }
  
  const handleSessionDecrement = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTimeAmountLeft(timeAmountLeft - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout(timeOut);
    setPlay(false);
    setTimeAmountLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setClockType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeOut);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeAmountLeft && clockType === "SESSION"){
      setTimeAmountLeft(breakLength * 60)
      setClockType("BREAK")
      audio.play()
    }
    if(!timeAmountLeft && clockType === "BREAK"){
      setTimeAmountLeft(sessionLength * 60)
      setClockType("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timeOut
      resetTimer()
    }else {
      clearTimeout(timeOut)
    }
  }
  
  React.useEffect(() => {
    clock()
  }, [play, timeAmountLeft, timeOut])
 
  const timeChange = () => {
    const minutes = Math.floor(timeAmountLeft / 60);
    const seconds = timeAmountLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = clockType === "SESSION" ? "Session" : "Break";
  return (
    <div>
      <div className="project-wrapper">
        <h2>25 + 5 Clock</h2>
          <div className="breakSession--length">
            <div>
              <h3 id="break-label">Break Length</h3>
                <div>
                  <button className="fas fa-chevron-up" disabled={play} onClick={handleBreakIncrement} id="break-increment"></button>
                    <text id="break-length">{breakLength}</text>
                  <button className="fas fa-chevron-down" disabled={play} onClick={handleBreakDecrement} id="break-decrement"></button>
                </div>
            </div>
            <div>
              <h3 id="session-label">Session Length</h3>
                <div>
                  <button className="fas fa-chevron-up" disabled={play} onClick={handleSessionIncrement} id="session-increment"></button>
                    <text id="session-length">{sessionLength}</text>
                  <button className="fas fa-chevron-down" disabled={play} onClick={handleSessionDecrement} id="session-decrement"></button>
                </div>
            </div>
          </div>
          <div className="timer-box">
            <div className="timer-object">
              <h2 id="timer-label">{title}</h2>
              <h3 id="time-left">{timeChange()}</h3>
            </div>
            <button onClick={handlePlay} id="start_stop">
              <i className="fas fa-play"></i>
              <i className="fas fa-pause"></i> 
            </button>
            <button onClick={handleReset} id="reset">
              <i className="fas fa-refresh"></i> 
            </button>
          </div>
        </div>
        <audio
          id="beep" 
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  )
}

// ReactDOM.render(<App />, document.getElementById('root'));
