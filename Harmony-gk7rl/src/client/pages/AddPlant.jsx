import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPlant from '@wasp/actions/createPlant';

export function AddPlant() {
  const createPlantFn = useAction(createPlant);
  const [plantName, setPlantName] = useState('');
  const [wateringInterval, setWateringInterval] = useState(1);

  const handleCreatePlant = () => {
    createPlantFn({ name: plantName, wateringInterval });
    setPlantName('');
    setWateringInterval(1);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Add Plant</h1>
      <div className='flex flex-col gap-y-4'>
        <input
          type='text'
          placeholder='Plant Name'
          className='px-1 py-2 border rounded'
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Watering Interval (in days)'
          className='px-1 py-2 border rounded'
          value={wateringInterval}
          onChange={(e) => setWateringInterval(parseInt(e.target.value))}
        />
        <button
          onClick={handleCreatePlant}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Plant
        </button>
        <Link
          to='/'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Back
        </Link>
      </div>
    </div>
  );
}