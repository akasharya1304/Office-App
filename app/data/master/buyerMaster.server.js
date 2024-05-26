import { prisma } from "../database.server";

export async function addBuyer(buyerData,userId) {
  try {
    // console.log("B=", buyerData)
    return await prisma.buyer.create({
      data: {
        buyer_name: buyerData.buyer_name,
        gstin_uin: buyerData.gstin_uin,
        address: buyerData.address,
        state: buyerData.state,
        is_active: Boolean(buyerData.is_active),
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getBuyer(userId) {
  if(!userId){
    throw new Error('failed to get buyers list');
  }
  try {
    const buyerData =  await prisma.buyer.findMany({
      where: {userId},
      orderBy: { buyer_name : 'asc'},
    })
    return buyerData
  } catch (error) {
    throw new Error('failed to get buyers list');
  }
}

export async function getActiveBuyer(userId) {
  if(!userId){
    throw new Error('failed to get buyers list');
  }
  try {
    const buyerData =  await prisma.buyer.findMany({
      where: {
        userId,
        AND: {
          is_active: true
        }
      },
      orderBy: { buyer_name : 'asc'},
    })
    return buyerData
  } catch (error) {
    throw new Error('failed to get buyers list');
  }
}

export async function getBuyerById(id) {
  try {
    const buyerData =  await prisma.buyer.findFirst({
      where: {id}
    })
    const stateData = await prisma.state.findFirst({
      where: {id: buyerData.state}
    })
    delete stateData.userId
    buyerData.state = stateData

    return buyerData
  } catch (error) {
    throw new Error('failed to get buyers');
  }
}

export async function getBuyerUpdateById(buyerData, id) {
  try {
    await prisma.buyer.update({
      where: {id},
      data: {
        buyer_name: buyerData.buyer_name,
        gstin_uin: buyerData.gstin_uin,
        address: buyerData.address,
        state: buyerData.state,
        is_active: Boolean(buyerData.is_active),
        modified_at: new Date()
      },
    })
  } catch (error) {
    throw new Error('failed to update buyers');
  }
}

export async function getBuyerDeleteById(id) {
  try {
    await prisma.buyer.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete buyers');
  }
}
