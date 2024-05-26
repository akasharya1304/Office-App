import { prisma } from "./database.server";

export async function addBill(billData,userId) {
  try {
    return await prisma.bill.create({
      data: {
        fileName: billData.fileName,
        fileSize: +billData.fileSize,
        base64: billData.base64,
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function addManyBill(billData,userId) {
  try {
    let updatedData = []
    billData.forEach(ele => {
      updatedData.push({
        fileName: ele.fileName,
        fileSize: +ele.fileSize,
        base64: ele.base64,
        User: {connect: { id: userId}}
      })
    })
    return await prisma.bill.createMany({
      data: updatedData,
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getBill(userId) {
  if(!userId){
    throw new Error('failed to get bills list');
  }
  try {
    const billData =  await prisma.bill.findMany({
      where: {userId},
      orderBy: { createdAt : 'desc'},
    })
    return billData
  } catch (error) {
    throw new Error('failed to get bills list');
  }
}

export async function getBillById(id) {
  try {
    const billData =  await prisma.bill.findFirst({
      where: {id}
    })
    return billData
  } catch (error) {
    throw new Error('failed to get bills');
  }
}

export async function getBillUpdateById(id, billData) {
  try {
    await prisma.bill.update({
      where: {id},
      data: {
        fileName: billData.fileName,
        fileSize: +billData.fileSize,
        base64: billData.base64,
      },
    })
  } catch (error) {
    throw new Error('failed to update bills');
  }
}

export async function getBillDeleteById(id) {
  try {
    await prisma.bill.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete bills');
  }
}
