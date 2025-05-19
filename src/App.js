
import React, { useState } from 'react';

const models = {
  Dalbury: 4000,
  Walton: 5000,
  Dukesbury: 6000
};

const claddings = [
  { label: 'Composite', price: 1500 },
  { label: 'Fluted Composite', price: 1750 },
  { label: 'Cedar', price: 2900 }
];

const doors = [
  { label: 'Single UPVC', price: 685 },
  { label: 'Double UPVC 4ft', price: 1390 },
  { label: 'Aluminium Bi-Fold 3m', price: 3370 }
];

const windows = [
  { label: 'T1 UPVC', price: 216 },
  { label: 'T2 UPVC', price: 245 },
  { label: 'T12 LEA UPVC', price: 430 }
];

export default function App() {
  const [model, setModel] = useState('Dalbury');
  const [cladding, setCladding] = useState(null);
  const [selectedDoors, setSelectedDoors] = useState([]);
  const [selectedWindows, setSelectedWindows] = useState([]);

  const handleSelect = (type, item) => {
    if (type === 'door') setSelectedDoors([...selectedDoors, item]);
    if (type === 'window') setSelectedWindows([...selectedWindows, item]);
  };

  const total = models[model] +
    (cladding?.price || 0) +
    selectedDoors.reduce((sum, d) => sum + d.price, 0) +
    selectedWindows.reduce((sum, w) => sum + w.price, 0);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', padding: 20, borderRadius: 10 }}>
      <h1>Elite Garden Room Pricing Tool</h1>

      <label>Model:</label>
      <select value={model} onChange={e => setModel(e.target.value)}>
        {Object.keys(models).map(m => <option key={m}>{m}</option>)}
      </select>

      <label>Cladding:</label>
      <select onChange={e => setCladding(claddings.find(c => c.label === e.target.value))}>
        <option value="">None</option>
        {claddings.map(c => <option key={c.label}>{c.label}</option>)}
      </select>

      <label>Doors:</label>
      {doors.map((d, i) => (
        <div key={i}>
          <button onClick={() => handleSelect('door', d)}>Add {d.label}</button>
        </div>
      ))}

      <label>Windows:</label>
      {windows.map((w, i) => (
        <div key={i}>
          <button onClick={() => handleSelect('window', w)}>Add {w.label}</button>
        </div>
      ))}

      <h2>Total: £{total.toLocaleString()}</h2>
    </div>
  );
}
