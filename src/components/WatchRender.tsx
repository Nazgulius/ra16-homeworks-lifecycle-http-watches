import React, { useEffect, useRef } from 'react';  


interface WatchRenderProps {
  id: number;
  name: string;
  timeZone: number;
  onRemove: (id: number) => void;
}

const WatchRender: React.FC<WatchRenderProps> = ({ id, name, timeZone, onRemove }) => {
  const [time, setTime] = React.useState(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Устанавливаем текущее время с учетом временной зоны  
    const utcTime = new Date();  
    const offsetTime = new Date(utcTime.getTime() + timeZone * 3600 * 1000);  

    setTime(offsetTime);  

    // Устанавливаем интервал для обновления времени каждую секунду  
    intervalRef.current = setInterval(() => {  
      setTime(prevTime => new Date(prevTime.getTime() + 1000)); // прибавляем 1 секунду  
    }, 1000); 

    return () => {
      // Очищаем интервал при удалении компонента  
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timeZone]);

  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();

  // Рассчитываем углы для вращения стрелок  
  const secondsRotation = (seconds / 60) * 360;  
  const minutesRotation = (minutes / 60) * 360 + (seconds / 60) * 6; // Учитываем проходящие секунды  
  const hoursRotation = (hours % 12 / 12) * 360 + (minutes / 60) * 30; // Учитываем проходящие минуты 

  return (
    <div className="watch">
      <div className="watch-title">{name}</div>
      <div className="hasy">
        <div className="onen">12</div>
        <div className="one dot">.</div>
        <div className="two dot">.</div>
        <div className="threen">3</div>
        <div className="four dot">.</div>
        <div className="five dot">.</div>
        <div className="sixn">6</div>
        <div className="seven dot">.</div>
        <div className="eight dot">.</div>
        <div className="ninen">9</div>
        <div className="ten dot">.</div>
        <div className="eleven dot">.</div>

        {/* управляем и задаём движение в css */}
        {/* <div className="sekundes" style={{ transform: `rotate(${(seconds / 60) * 360}deg)` }}></div>
        <div className="minutes" style={{ transform: `rotate(${(minutes / 60) * 360}deg)` }}></div>
        <div className="has" style={{ transform: `rotate(${(hours % 12 / 12) * 360}deg)` }}></div> */}

        {/* управляем и задаём движение в JS */}
        <div className="sekundes" style={{ transform: `rotate(${secondsRotation}deg)` }}></div>  
        <div className="minutes" style={{ transform: `rotate(${minutesRotation}deg)` }}></div>  
        <div className="has" style={{ transform: `rotate(${hoursRotation}deg)` }}></div>  

        <div className="sentr"></div>
        <div className="cross" onClick={() => onRemove(id)}>X</div>
      </div>
    </div>
  );
}

export default WatchRender;  