import { prisma } from "./database.server";
import { getBuyer, } from "./master/buyerMaster.server";
import { getItemGood } from "./master/itemsGoodsMaster.server";
import { getState} from "./master/stateMaster.server";
import { getUserDetail } from "./master/userDetailMaster.server";


export async function getAllMasterData(userId) {
  try {
    const userDetail = await getUserDetail(userId);
    const buyer = await getBuyer(userId);
    const state = await getState(userId)
    const itemsGoods = await getItemGood(userId);
    // console.log('state', state,buyer)
    buyer.forEach(ele => {
      let stateData = state.find(d => d.id === ele.state)
      delete stateData.userId
      ele.state = stateData
    });
    const allMasters = {
      userDetail,
      buyer,
      itemsGoods,
    };
    return allMasters;
  } catch (error) {
    throw new Error("failed to get all masters");
  }
}

export async function addBillGeneration(billData,userId) {
  try {
    // console.log('billData', billData)
    return await prisma.billGeneration.create({
      data: {
        invoice_no: billData.invoice_no,
        invoice_date: billData.invoice_date,
        buyer: billData.buyer,
        buyer_order_no: billData.buyer_order_no,
        buyer_order_date: billData.buyer_order_date,
        desc_of_goods: billData.desc_of_goods,
        output_cgst: billData.output_cgst,
        output_sgst: billData.output_sgst,
        round_off: billData.round_off,
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllBillGenerated(userId) {
  if(!userId){
    throw new Error('failed to get bill generated list');
  }
  try {
    const billData =  await prisma.billGeneration.findMany({
      where: {userId},
      orderBy: { invoice_no : 'asc'},
    })
    return billData
  } catch (error) {
    throw new Error('failed to get bill generated list catch block');
  }
}

export async function getBillGeneratedById(id) {
  try {
    const billData =  await prisma.billGeneration.findFirst({
      where: {id}
    })
    const buyerData =  await prisma.buyer.findFirst({
      where: {id: billData.buyer }
    })
    const stateData = await prisma.state.findFirst({
      where: {id: buyerData.state}
    })
    delete stateData.userId
    buyerData.state = stateData
    delete buyerData.userId
    billData.buyer = buyerData

    return billData
  } catch (error) {
    throw new Error('failed to get buyers');
  }
}

export async function updateBillGenerationById(billData,id) {
  try {
    // console.log('billDataUpdate', billData, id)
    return await prisma.billGeneration.update({
      where: {id},
      data: {
        invoice_no: billData.invoice_no,
        invoice_date: billData.invoice_date,
        buyer: billData.buyer,
        buyer_order_no: billData.buyer_order_no,
        buyer_order_date: billData.buyer_order_date,
        desc_of_goods: billData.desc_of_goods,
        output_cgst: billData.output_cgst,
        output_sgst: billData.output_sgst,
        round_off: billData.round_off,
        modified_at: new Date()
      },
    })
  } catch (error) {
    throw new Error('failed to update bill generation data', error);
  }
}

export async function deleteBillGenerationById(id) {
  try {
    await prisma.billGeneration.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete buyers');
  }
}
