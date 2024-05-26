import moment from "moment";
import { ToWords } from "to-words";

const DateFormat = (input) => {
  if (input) {
    return moment(input).format("DD MMM YYYY");
  }
  return "---"
};

const checkAlphabet = (input) => {
  const regex = /^[a-zA-Z \s]{1,}$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};

const checkNumeric = (input) => {
  const regex = /^[0-9]+$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};

const checkWord = (input) => {
  const regex = /^[a-zA-Z0-9\s]+[a-zA-Z0-9&.,/_()-\s]+$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};


const checkEmail = (input) => {
  const regex = /^([a-zA-Z0-9.]+)@([a-zA-Z]+).([a-zA-Z]+)/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};

const checkGstin = (input) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};

const checkPanNo = (input) => {
  let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};

const checkIFSC = (input) => {
  let regex = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
};

const checkContactNo = (input) => {
  const regex = /^[0-9]+$/;
  if (
    !regex.test(input) ||
    input?.length !== 10 ||
    input < 4999999999 ||
    input > 9999999999
  ) {
    return false;
  } else {
    return true;
  }
};

const checkPhoneNo = (input) => {
  const regex = /^[a-zA-Z0-9&.,()-\s]+$/;
  if (regex.test(input)) {
    return true ;
  } else {
    return false;
  }
};

const numbertoCurrency = (number) => {
  const toWords = new ToWords();
  let words = toWords.convert(number, { currency: true });
  return words
}

const checkInvalidValue = (input) => {
  if ([null, "null", undefined, 'undefined', NaN, "NaN", "", 'NA'].includes(input)) {
    return true;
  }
  return false;
}

const currencyWithComma = (input, dot='') => {
  if(input){
    if(dot === ''){
    const [integerPart, decimalPart] = input?.toString()?.split('.');
    console.log(integerPart, decimalPart)
    const formattedIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${formattedIntegerPart}.${decimalPart}`;
    }
    else if(dot === 'no-dot'){
      const [integerPart] = input?.toString()?.split('.');
      console.log(integerPart)
      const formattedIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return `${formattedIntegerPart}`;
    }
  }
}

export {
  DateFormat,
  checkAlphabet,
  checkNumeric,
  checkWord,
  checkEmail,
  checkGstin,
  checkPanNo,
  checkIFSC,
  checkContactNo,
  checkPhoneNo,
  numbertoCurrency,
  checkInvalidValue,
  currencyWithComma
};
