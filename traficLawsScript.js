window.onload = function () {
  /////////определение необх переменных/////////
  let a = "";
  let b = "";
  let result = "";
  let operation = null;
  ///////////определение экрана(выходного элемента)/////////
  const outElement = document.getElementById("penalty_cards");
  ////////////поиск всех кнопок и запись их в одну переменную////////
  const buttons = document.querySelectorAll('[id ^="btn_digit_"]');

  ////////////////функция нажатия на кнопку -> параметр нажатая кнопка///////
  function onDigitButtonClicked(digit) {
    if (!operation) {
      if (digit !== "." || (digit === "." && !a.includes("."))) {
        a += digit;
        outElement.innerHTML = a;
      }
    } else {
      if (digit !== "." || (digit === "." && !b.includes(digit))) {
        b += digit;
        outElement.innerHTML = b;
      }
    }
  }

  /*проход по всем кнопкам которые записались в переменную
buttons и получение  то что лежит внутри них с  помощьюь innerHTML
а затем передаем полученный результата в функцию onDigitButtonClicked*/

  buttons.forEach((button) => {
    button.onclick = function () {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    };
  });
  ///////////////идут операции//////////////////
  document.getElementById("btn_multip").onclick = function () {
    if (a === "") return;
    operation = "x";
  };

  document.getElementById("btn_del").onclick = function () {
    if (a === "") return;
    operation = "/";
  };

  document.getElementById("btn_plus").onclick = function () {
    if (a === "") return;
    operation = "+";
  };

  document.getElementById("btn_minus").onclick = function () {
    if (a === "") return;
    operation = "-";
  };

  document.getElementById("btn_perc").onclick = function () {
    if (a === "") return;
    operation = "%";
  };

  document.getElementById("btn_pls_mns").onclick = function () {
    if (operation === null) {
      if (a !== "" && a !== "0") {
        a = parseFloat(a) * -1;
      }
    }
    outElement.innerHTML = a;
  };

  document.getElementById("btn_clear").onclick = function () {
    a = "";
    b = "";
    operation = null;
    outElement.innerHTML = 0;

    result = "";
  };

  document.getElementById("btn_bcksp").onclick = function () {
    a = a.slice(0, -1);

    if (a === "") {
      outElement.innerHTML = 0;
    } else {
      outElement.innerHTML = a;
    }
  };

  this.document.getElementById("btn_violation").onclick = function () {
    if (a === "") return;

    let checkSpeed = parseFloat(a);
    let fine = 0;
    switch (true) {
      case checkSpeed >= 20 && checkSpeed < 40:
        fine = 500;
        break;
      case checkSpeed >= 40 && checkSpeed < 60:
        fine = 2500;
        break;
      case checkSpeed >= 60 && checkSpeed < 80:
        fine = 50000;
        break;
      case checkSpeed >= 80:
        fine = 100000;
        break;
      default:
        break;
    }

    a = String(fine);
    outElement.innerHTML = "Штраф: " + a + " Руб.";
    if (fine < 20) {
      outElement.innerHTML = "Штраф: отсутствует";
    }
    if (fine > 50000) {
      const popUpElement = document.getElementById("ban_screen");
      popUpElement.showModal();
      document.getElementById("btn_close").onclick = function () {
        popUpElement.close();
      };
    }
  };

  document.getElementById("btn_=").onclick = function () {
    if (a === "" || b === "" || operation === null) return;

    switch (operation) {
      case "x":
        result = +a * +b;
        break;
      case "+":
        result = +a + +b;
        break;
      case "-":
        result = +a - +b;
        break;
      case "/":
        result = +a / +b;
        break;
      case "%":
        result = +a % +b;
        break;
      case "+/-":
        result = +a * -1;
        break;
      default:
        break;
    }

    a = result.toString();
    b = "";
    operation = null;
    outElement.innerHTML = a;
  };
};
