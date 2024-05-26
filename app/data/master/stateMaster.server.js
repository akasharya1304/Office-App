import { prisma } from "../database.server";

export async function addState(stateData,userId) {
  try {
    return await prisma.state.create({
      data: {
        state_name: stateData.state_name,
        state_code: stateData.state_code,
        is_active: Boolean(stateData.is_active),
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getState(userId) {
  if(!userId){
    throw new Error('failed to get states list');
  }
  try {
    const stateData =  await prisma.state.findMany({
      where: {userId},
      orderBy: { state_name : 'asc'},
    })
    return stateData
  } catch (error) {
    throw new Error('failed to get states list');
  }
}

export async function getActiveState(userId) {
  if(!userId){
    throw new Error('failed to get states list');
  }
  try {
    const stateData =  await prisma.state.findMany({
      where: {
        userId,
        AND: {
          is_active: true
        }
      },
      orderBy: { state_name : 'asc'},
    })
    return stateData
  } catch (error) {
    throw new Error('failed to get states list');
  }
}

export async function getStateById(id) {
  try {
    const stateData =  await prisma.state.findFirst({
      where: {id}
    })
    return stateData
  } catch (error) {
    throw new Error('failed to get states');
  }
}

export async function getStateUpdateById(stateData, id) {
  try {
    await prisma.state.update({
      where: {id},
      data: {
        state_name: stateData.state_name,
        state_code: stateData.state_code,
        is_active: Boolean(stateData.is_active),
        modified_at: new Date()
      },
    })
  } catch (error) {
    throw new Error('failed to update states');
  }
}

export async function getStateDeleteById(id) {
  try {
    await prisma.state.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete states');
  }
}
