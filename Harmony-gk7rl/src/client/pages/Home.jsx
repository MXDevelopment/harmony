import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserPlants from '@wasp/queries/getUserPlants';
import waterPlant from '@wasp/actions/waterPlant';

export function Home() {
  const { data: plants, isLoading, error } = useQuery(getUserPlants);
  const waterPlantFn = useAction(waterPlant);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {plants.map((plant) => (
        <div
          key={plant.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{plant.name}</div>
          <div>{plant.wateringInterval} days left</div>
          <div>
            <button
              onClick={() => waterPlantFn({ plantId: plant.id })}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Water
            </button>
          </div>
        </div>
      ))}

      <Link
        to='/add-plant'
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Add plant
      </Link>
    </div>
  );
}