import { prisma } from "../database.server";

export async function addUserDetail(userDetailData,userId) {
  try {
    return await prisma.userDetail.create({
      data: {
        company_name: userDetailData.company_name,
        address_1: userDetailData.address_1,
        address_2: userDetailData.address_2,
        contact_no_1: userDetailData.contact_no_1,
        contact_no_2: userDetailData.contact_no_2,
        gstin_uin: userDetailData.gstin_uin,
        state: userDetailData.state,
        phone_no: userDetailData.phone_no,
        email: userDetailData.email,
        bank_name: userDetailData.bank_name,
        bank_account_no: userDetailData.bank_account_no,
        branch: userDetailData.branch,
        ifsc: userDetailData.ifsc,
        pan_no: userDetailData.pan_no,
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserDetail(userId) {
  if(!userId){
    throw new Error('failed to get userDetails list');
  }
  try {
    const userDetailData =  await prisma.userDetail.findFirst({
      where: {userId},
    })
    const stateData = await prisma.state.findFirst({
      where: {id: userDetailData.state}
    })
    delete stateData.userId
    userDetailData.state = stateData
    
    return userDetailData
  } catch (error) {
    throw new Error('failed to get userDetails list');
  }
}

export async function getUserDetailUpdateById(userDetailData, id) {
  try {
    await prisma.userDetail.update({
      where: {id},
      data: {
        company_name: userDetailData.company_name,
        address_1: userDetailData.address_1,
        address_2: userDetailData.address_2,
        contact_no_1: userDetailData.contact_no_1,
        contact_no_2: userDetailData.contact_no_2,
        gstin_uin: userDetailData.gstin_uin,
        state: userDetailData.state,
        phone_no: userDetailData.phone_no,
        email: userDetailData.email,
        bank_name: userDetailData.bank_name,
        bank_account_no: userDetailData.bank_account_no,
        branch: userDetailData.branch,
        ifsc: userDetailData.ifsc,
        pan_no: userDetailData.pan_no,
        modified_at: new Date()
      },
    })
  } catch (error) {
    throw new Error('failed to update userDetails');
  }
}

export async function getUserDetailDeleteById(id) {
  try {
    await prisma.userDetail.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete userDetails');
  }
}
