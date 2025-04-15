import React, { useState } from 'react';
import WatchRender from './WatchRender'

interface Clock {
  id: number;
  name: string;
  timeZone: number;
}

const WorldWatches: React.FC = () => {
  const [clocks, setClocks] = useState<Clock[]>([]);
  const [name, setName] = useState('');
  const [timeZone, setTimeZone] = useState(0);

  const addClock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || timeZone === null) return;

    const newClock: Clock = {
      id: Date.now(),  // уникальный идентификатор для каждого часов  
      name,
      timeZone,
    };

    setClocks((prevClocks) => [...prevClocks, newClock]);
    setName(''); // сброс поля имя  
    setTimeZone(0); // сброс временной зоны  
  };

  const removeClock = (id: number) => {
    setClocks((prevClocks) => prevClocks.filter(clock => clock.id !== id));
  };

  return (
    <>
      <h1 className="title">Мировое время</h1>

      <form onSubmit={addClock} className="form">
        <label htmlFor="inName" className="in-name-title">Название</label>
        <input
          type="text"
          id="inName"
          className="in-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="timeZone" className="time-zone-title">Временная зона</label>
        <input
          type="number"
          id="timeZone"
          className="time-zone-input"
          value={timeZone}
          onChange={(e) => setTimeZone(Number(e.target.value))}
        />

        <button className="btn-add" type="submit">Добавить</button>
      </form>

      <div className="container-watches">
        {clocks.map(clock => (
          <WatchRender
            key={clock.id}
            id={clock.id}
            name={clock.name}
            timeZone={clock.timeZone}
            onRemove={removeClock}
          />
        ))}
      </div>
    </>
  );
};

export default WorldWatches;