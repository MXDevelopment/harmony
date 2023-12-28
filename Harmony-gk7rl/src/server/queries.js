import HttpError from '@wasp/core/HttpError.js'

export const getUserPlants = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) }

  const plants = await context.entities.Plant.findMany({
    where: {
      user: { id: context.user.id }
    }
  });

  return plants;
}