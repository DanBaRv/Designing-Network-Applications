someMassiv = [1, 2, 3, 4, 5];

function getSumAndMultOfArray(mas) {
  let sum = 0;
  let proizv = 1;
  mas.forEach((element) => {
    sum += element;
    proizv *= element;
  });
  console.log(`Сумма: ${sum}`);
  console.log(`Произведение: ${proizv}`);
}

const str = "1000000111100011111010111101111111";
mas = [];

function maxOfOnce(str) {
  let maxOne = 0;
  for (let num = 0; num <= str.length; num++) {
    if (str[num] === "1") {
      maxOne += 1;
    } else {
      mas.push(maxOne);
      maxOne = 0;
    }
  }

  let maximum = 0;
  mas.forEach((elem) => {
    if (elem > maximum) {
      maximum = elem;
    }
  });
  console.log(maximum);
}

const polindrom = "А роза упала на лапу Азора";

function isPalindromFirstAnswer(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    newStr += str[i].toLowerCase();
  }

  newStr = newStr.replaceAll(" ", "");

  let length = newStr.length;
  let check = "";
  let middle = Math.trunc(length / 2); //середина без дробной части

  for (let index = 0; index < middle; index++) {
    if (newStr[index] === newStr[length - 1]) {
      length -= 1;
      check += "1";
    } else {
      check += "0";
    }
  }
  if (check.includes("0")) {
    console.log("its not a polindrom");
  } else {
    console.log("its a polindrom");
  }
}

function isPalindromSecondAnswer(str) {
  let cleaned = String(str).toLowerCase().replaceAll(" ", "");
  let reversed = cleaned.split("").reverse().join("");
  if (cleaned === reversed) {
    console.log("its a polindrom");
  } else {
    console.log("its not a polindrom");
  }
  //все в массив -> переворот -> строка
}

console.log("----1.4 задание----");
getSumAndMultOfArray(someMassiv);
console.log("----2.3 задание----");
maxOfOnce(str);
console.log("----3.8 задание 1 решение----");
isPalindromFirstAnswer(polindrom);
console.log("----3.8 задание 2 решение----");
isPalindromSecondAnswer(polindrom);
