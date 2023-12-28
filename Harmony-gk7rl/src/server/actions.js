import HttpError from '@wasp/core/HttpError.js'

export const createPlant = async ({ name, wateringInterval }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newPlant = await context.entities.Plant.create({
    data: {
      name,
      wateringInterval,
      lastWatered: new Date(),
      userId: context.user.id
    }
  });

  return newPlant;
}

export const waterPlant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const plant = await context.entities.Plant.findUnique({
    where: { id: args.plantId }
  });

  if (plant.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Plant.update({
    where: { id: args.plantId },
    data: { lastWatered: new Date() }
  });
}