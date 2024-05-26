import { prisma } from "../database.server";

export async function addItemGood(itemGoodData,userId) {
  try {
    return await prisma.itemGood.create({
      data: {
        item_name: itemGoodData.item_name,
        hsn_sac: +itemGoodData.hsn_sac,
        cgst: +itemGoodData.cgst,
        sgst: +itemGoodData.sgst,
        is_active: Boolean(itemGoodData.is_active),
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItemGood(userId) {
  if(!userId){
    throw new Error('failed to get itemGoods list');
  }
  try {
    const itemGoodData =  await prisma.itemGood.findMany({
      where: {userId},
      orderBy: { item_name : 'asc'},
    })
    return itemGoodData
  } catch (error) {
    throw new Error('failed to get itemGoods list');
  }
}

export async function getActiveItemGood(userId) {
  if(!userId){
    throw new Error('failed to get itemGoods list');
  }
  try {
    const itemGoodData =  await prisma.itemGood.findMany({
      where: {
        userId,
        AND: {
          is_active: true
        }
      },
      orderBy: { item_name : 'asc'},
    })
    return itemGoodData
  } catch (error) {
    throw new Error('failed to get itemGoods list');
  }
}

export async function getItemGoodById(id) {
  try {
    const itemGoodData = await prisma.itemGood.findFirst({
      where: {id}
    })
    return itemGoodData
  } catch (error) {
    throw new Error('failed to get itemGoods');
  }
}

export async function getItemGoodUpdateById(itemGoodData, id) {
  try {
    await prisma.itemGood.update({
      where: {id},
      data: {
        item_name: itemGoodData.item_name,
        hsn_sac: +itemGoodData.hsn_sac,
        cgst: +itemGoodData.cgst,
        sgst: +itemGoodData.sgst,
        is_active: Boolean(itemGoodData.is_active),
        modified_at: new Date()
      },
    })
  } catch (error) {
    throw new Error('failed to update itemGoods');
  }
}

export async function getItemGoodDeleteById(id) {
  try {
    await prisma.itemGood.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete itemGoods');
  }
}
