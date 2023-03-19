import { ElementStates } from "../../src/types/element-states";
import { reverseString } from "../../src/utils/string/string-reverse";
import { getFibonacciNumbers } from "../../src/utils/fibonacci/fibonacci";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";
import { defaultLinkedList, LinkedList } from "../../src/utils/list/list";
import { Queue } from "../../src/utils/queue/queue";
import { find } from "cypress/types/lodash";

const stateDefault = new RegExp(ElementStates.Default);
const stateModified = new RegExp(ElementStates.Modified);
const stateChanging = new RegExp(ElementStates.Changing);

// describe("Тестирование работоспособности приложения", () => {
//   it("Приложение поднялось", () => {
//     cy.visit("/");
//     cy.contains(/Вдохновлено школами/i);
//   });
// });

// ------------------------------------------------------------------------------------

// describe("Тестирование переходов по страницам", () => {
//   it("открывается страница Строка", () => {
//     cy.visit("/recursion");
//     cy.contains(/строка/i);
//   });

//   it("открывается страница Последовательность Фибоначчи", () => {
//     cy.visit("/fibonacci");
//     cy.contains(/Последовательность Фибоначчи/i);
//   });

//   it("открывается страница Сортировка массива", () => {
//     cy.visit("/sorting");
//     cy.contains(/Сортировка массива/i);
//   });

//   it("открывается страница Стек", () => {
//     cy.visit("/stack");
//     cy.contains(/Стек/i);
//   });

//   it("открывается страница Очередь", () => {
//     cy.visit("/queue");
//     cy.contains(/Очередь/i);
//   });

//   it("открывается страница Связный список", () => {
//     cy.visit("/list");
//     cy.contains(/Связный список/i);
//   });
// });

// ------------------------------------------------------------------------------------

// describe("Функционал страницы Строка", () => {
//   beforeEach(function () {
//     cy.visit("/recursion");
//     cy.get("input").as("input");
//     cy.contains("Развернуть").as("button");
//   });

//   it("Кнопка добавления недоступна если в инпуте пусто", () => {
//     cy.get("@input").should("have.value", "");
//     cy.get("@button").should("have.attr", "disabled");
//   });

//   it("Анимация разворота строки корректно выполняется", () => {
//     const testData = "РаЗвОрОТ".toUpperCase();
//     const { res, actionDataLog } = reverseString(testData);
//     cy.get("@input").type(`${testData}`);

//     cy.get("#animaionContainer")
//       .children()
//       .each(($el, index) => {
//         cy.wrap($el)
//           .find("[data-testid=circle-id]")
//           .should("have.text", testData[index]);
//         cy.wrap($el)
//           .find("[data-testid=circle-id]")
//           .invoke("attr", "class")
//           .should("match", stateDefault);
//       });

//     cy.get("@button").click();
//     cy.wait(SHORT_DELAY_IN_MS);

//     for (let i = 0; i < actionDataLog.length; i++) {
//       const actionIndex = actionDataLog[i].actionIndex;

//       actionIndex.forEach((position) => {
//         cy.get("#animaionContainer")
//           .children()
//           .its(position)
//           .find("[data-testid=letter-id]")
//           .should("have.text", testData[position]);

//         cy.get("#animaionContainer")
//           .children()
//           .its(position)
//           .find("[data-testid=circle-id]")
//           .invoke("attr", "class")
//           .should("match", stateChanging);
//       });

//       cy.wait(DELAY_IN_MS);

//       actionIndex.forEach((position) => {
//         cy.get("#animaionContainer")
//           .children()
//           .its(position)
//           .find("[data-testid=letter-id]")
//           .should("have.text", res[position]);

//         cy.get("#animaionContainer")
//           .children()
//           .its(position)
//           .find("[data-testid=circle-id]")
//           .invoke("attr", "class")
//           .should("match", stateModified);
//       });
//     }
//   });
// });

// ------------------------------------------------------------------------------------

// describe("Функционал страницы Фибоначчи", () => {
//   beforeEach(function () {
//     cy.visit("/fibonacci");
//     cy.get("input").as("input");
//     cy.contains("Рассчитать").as("button");
//   });

//   it("Кнопка добавления недоступна если в инпуте пусто", () => {
//     cy.get("@input").should("have.value", "");
//     cy.get("@button").should("have.attr", "disabled");
//   });

//   it("Анимация генерации чисел корректно выполняется", () => {
//     const testData = 19;
//     const res = getFibonacciNumbers(testData);
//     cy.get("@input").type(`${testData}`);
//     cy.get("#animaionContainer").children().should("have.length", 0);

//     cy.get("@button").click();

//     for (let i = 0; i < res.length; i++) {
//       cy.get("#animaionContainer")
//         .children()
//         .last()
//         .find("[data-testid=letter-id]")
//         .should("have.text", String(res[i]));

//       cy.wait(DELAY_IN_MS);
//     }
//   });
// });

// ------------------------------------------------------------------------------------

// describe("Функционал страницы Стек", () => {
//   beforeEach(function () {
//     cy.visit("/stack");
//     cy.get("input").as("input");
//     cy.contains("Добавить").as("button");
//     cy.contains("Удалить").as("delButton");
//     cy.contains("Очистить").as("clrButton");
//   });

//   it("Кнопка добавления недоступна если в инпуте пусто", () => {
//     cy.get("@input").should("have.value", "");
//     cy.get("@button").should("have.attr", "disabled");
//   });

//   it("Анимация добавления элемента в стек корректно выполняется", () => {
//     const testData = "el1".toLocaleUpperCase();
//     cy.get("@input").type(`${testData}`);
//     cy.get("@button").click();

//     cy.get("#animaionContainer")
//       .children()
//       .last()
//       .find("[data-testid=letter-id]")
//       .should("have.text", testData);

//     cy.get("#animaionContainer")
//       .children()
//       .last()
//       .find("[data-testid=circle-id]")
//       .invoke("attr", "class")
//       .should("match", stateChanging);

//     cy.wait(SHORT_DELAY_IN_MS);

//     cy.get("#animaionContainer")
//       .children()
//       .last()
//       .find("[data-testid=letter-id]")
//       .should("have.text", testData);

//     cy.get("#animaionContainer")
//       .children()
//       .last()
//       .find("[data-testid=circle-id]")
//       .invoke("attr", "class")
//       .should("match", stateDefault);
//   });

//   it("Анимация удаления элемента из стека корректно выполняется", () => {
//     const testData = "el1".toLocaleUpperCase();
//     cy.get("@input").type(`${testData}`);
//     cy.get("@button").click();
//     cy.get("#animaionContainer").children().should("have.length", 1);

//     cy.get("@delButton").click();

//     cy.get("#animaionContainer")
//       .children()
//       .last()
//       .find("[data-testid=letter-id]")
//       .should("have.text", testData);

//     cy.get("#animaionContainer")
//       .children()
//       .last()
//       .find("[data-testid=circle-id]")
//       .invoke("attr", "class")
//       .should("match", stateChanging);

//     cy.wait(SHORT_DELAY_IN_MS);

//     cy.get("#animaionContainer").children().should("have.length", 0);
//   });

//   it("Анимация очистки стека корректно выполняется", () => {
//     const testData = ["el0", "el1", "el2", "el3", "el4"].map((val) =>
//       val.toUpperCase()
//     );

//     for (let i = 0; i < testData.length; i++) {
//       cy.get("@input").type(`${testData[i]}`);
//       cy.get("@button").click();
//       cy.get("#animaionContainer")
//         .children()
//         .should("have.length", i + 1);
//       cy.wait(SHORT_DELAY_IN_MS);
//     }

//     cy.get("@clrButton").click();

//     cy.get("#animaionContainer")
//       .children()
//       .each(($el) => {
//         cy.wrap($el)
//           .find("[data-testid=circle-id]")
//           .invoke("attr", "class")
//           .should("match", stateChanging);
//       });

//     cy.wait(SHORT_DELAY_IN_MS);

//     cy.get("#animaionContainer").children().should("have.length", 0);
//   });
// });

// ------------------------------------------------------------------------------------

describe("Функционал страницы Очередь", () => {
  beforeEach(function () {
    cy.visit("/queue");
    cy.get("input").as("input");
    cy.contains("Добавить").as("button");
    cy.contains("Удалить").as("delButton");
    cy.contains("Очистить").as("clrButton");
  });

  // it("Кнопка добавления недоступна если в инпуте пусто", () => {
  //   cy.get("@input").should("have.value", "");
  //   cy.get("@button").should("have.attr", "disabled");
  // });

  // it("Анимация добавления элемента в очередь корректно выполняется", () => {
  //   const queue = new Queue<string>(7);
  //   const testData = ["el0", "el1", "el2", "el3", "el4", "el5", "el6"].map(
  //     (val) => val.toLocaleUpperCase()
  //   );
  //   for (let i = 0; i < testData.length; i++) {
  //     const tail = queue.getTail();
  //     const length = queue.getLength();
  //     queue.enqueue(testData[i]);
  //     cy.get("@input").type(`${testData[i]}`);
  //     cy.get("@button").click();
  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(tail)
  //       .find("[data-testid=circle-id]")
  //       .invoke("attr", "class")
  //       .should("match", stateChanging);

  //     if (length) {
  //       cy.get("#animaionContainer")
  //         .children()
  //         .its(tail)
  //         .find("[data-testid=tail-id]")
  //         .should("have.text", "tail");
  //     } else {
  //       cy.get("#animaionContainer")
  //         .children()
  //         .its(tail)
  //         .find("[data-testid=tail-id]")
  //         .should("have.text", "");
  //     }

  //     cy.wait(SHORT_DELAY_IN_MS);

  //     cy.get("#animaionContainer")
  //       .find("[data-testid=letter-id]")
  //       .filter(":contains('EL')")
  //       .should("have.length", queue.getLength());

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(tail)
  //       .find("[data-testid=letter-id]")
  //       .should("have.text", testData[i]);

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(tail)
  //       .find("[data-testid=circle-id]")
  //       .invoke("attr", "class")
  //       .should("match", stateDefault);

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(tail)
  //       .find("[data-testid=tail-id]")
  //       .should("not.have.text", "tail");

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(queue.getTail())
  //       .find("[data-testid=tail-id]")
  //       .should("have.text", "tail");
  //   }
  // });

  // it("Анимация удаления элемента из очереди корректно выполняется", () => {
  //   const queue = new Queue<string>(7);
  //   const testData = ["el0", "el1", "el2", "el3", "el4", "el5", "el6"].map(
  //     (val) => val.toLocaleUpperCase()
  //   );

  //   for (let i = 0; i < testData.length; i++) {
  //     cy.get("@input").type(`${testData[i]}`);
  //     cy.get("@button").click();
  //     queue.enqueue(testData[i]);
  //     cy.wait(SHORT_DELAY_IN_MS);
  //   }

  //   for (let i = 0; i < testData.length; i++) {
  //     const head = queue.getHead();
  //     const length = queue.getLength();
  //     cy.get("@delButton").click();
  //     queue.dequeue();

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(head)
  //       .find("[data-testid=circle-id]")
  //       .invoke("attr", "class")
  //       .should("match", stateChanging);

  //     if (length) {
  //       cy.get("#animaionContainer")
  //         .children()
  //         .its(head)
  //         .find("[data-testid=head-id]")
  //         .should("have.text", "head");
  //     } else {
  //       cy.get("#animaionContainer")
  //         .children()
  //         .its(head)
  //         .find("[data-testid=head-id]")
  //         .should("have.text", "");
  //     }
  //     cy.wait(SHORT_DELAY_IN_MS);

  //     cy.get("#animaionContainer")
  //       .find("[data-testid=letter-id]")
  //       .filter(":contains('EL')")
  //       .should("have.length", queue.getLength());

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(head)
  //       .find("[data-testid=letter-id]")
  //       .should("have.text", "");

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(head)
  //       .find("[data-testid=circle-id]")
  //       .invoke("attr", "class")
  //       .should("match", stateDefault);

  //     cy.get("#animaionContainer")
  //       .children()
  //       .its(head)
  //       .find("[data-testid=head-id]")
  //       .should("have.text", "");

  //     if (queue.getLength()) {
  //       cy.get("#animaionContainer")
  //         .children()
  //         .its(queue.getHead())
  //         .find("[data-testid=head-id]")
  //         .should("have.text", "head");
  //     } else {
  //       cy.get("#animaionContainer")
  //         .find("[data-testid=head-id]")
  //         .filter(":contains('head')")
  //         .should("have.length", 0);
  //     }
  //   }
  // });
  // it("Анимация очистки очереди корректно выполняется", () => {
  //   const queue = new Queue<string>(7);
  //   const testData = ["el0", "el1", "el2"].map((val) =>
  //     val.toLocaleUpperCase()
  //   );

  //   for (let i = 0; i < testData.length; i++) {
  //     cy.get("@input").type(`${testData[i]}`);
  //     cy.get("@button").click();
  //     queue.enqueue(testData[i]);
  //     cy.wait(SHORT_DELAY_IN_MS);
  //   }

  //   cy.get("@clrButton").click();

  //   cy.get("#animaionContainer")
  //     .children()
  //     .each(($el) => {
  //       cy.wrap($el)
  //         .find("[data-testid=circle-id]")
  //         .invoke("attr", "class")
  //         .should("match", stateChanging);
  //     });

  //     cy.get("#animaionContainer")
  //     .find("[data-testid=letter-id]")
  //     .filter(":contains('EL')")
  //     .should("have.length", queue.getLength());

  //     queue.clear();

  //   cy.wait(SHORT_DELAY_IN_MS);

  //   cy.get("#animaionContainer")
  //     .children()
  //     .each(($el) => {
  //       cy.wrap($el)
  //         .find("[data-testid=circle-id]")
  //         .invoke("attr", "class")
  //         .should("match", stateDefault);
  //     });

  //   cy.get("#animaionContainer")
  //     .find("[data-testid=head-id]")
  //     .filter(":contains('head')")
  //     .should("have.length", 0);

  //   cy.get("#animaionContainer")
  //     .find("[data-testid=tail-id]")
  //     .filter(":contains('tail')")
  //     .should("have.length", 0);

  //   cy.get("#animaionContainer")
  //     .find("[data-testid=letter-id]")
  //     .filter(":contains('EL')")
  //     .should("have.length", queue.getLength());
  // });
});

// ---------------------------------------------------------------------------

describe("Функционал страницы Список", () => {
  beforeEach(function () {
    cy.visit("/list");
    cy.get("input").first().as("valueInput");
    cy.get("input").last().as("indexInput");
    cy.contains("Добавить в head").as("addHeadButton");
    cy.contains("Добавить в tail").as("addTailButton");
    cy.contains("Добавить по индексу").as("addIndexButton");
    cy.contains("Удалить из head").as("delHeadButton");
    cy.contains("Удалить из tail").as("delTailButton");
    cy.contains("Удалить по индексу").as("delIndexButton");
  });

  it("Кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже, если в инпутах пусто", () => {
    cy.get("@valueInput").should("have.value", "");
    cy.get("@indexInput").should("have.value", "");
    cy.get("@addHeadButton").should("have.attr", "disabled");
    cy.get("@addTailButton").should("have.attr", "disabled");
    cy.get("@addIndexButton").should("have.attr", "disabled");
    cy.get("@delIndexButton").should("have.attr", "disabled");
  });

  it("Дефолтный список отрисовывается корректно", () => {
    cy.get("#animaionContainer")
      .find("[data-testid=arrowContainer-id]")
      .should("have.length", defaultLinkedList.length - 1);

    cy.get("#animaionContainer")
      .find("[data-testid=element-id]")
      .should("have.length", defaultLinkedList.length);

    cy.get("#animaionContainer")
      .find("[data-testid=element-id]")
      .each(($el, index) => {
        cy.wrap($el)
          .find("[data-testid=circle-id]")
          .invoke("attr", "class")
          .should("match", stateDefault);

        cy.wrap($el)
          .find("[data-testid=letter-id]")
          .should("have.text", defaultLinkedList[index]);

        cy.wrap($el)
          .find("[data-testid=index-id]")
          .should("have.text", String(index));

        if (index === 0) {
          cy.wrap($el)
            .find("[data-testid=head-id]")
            .should("have.text", "head");
        } else {
          cy.wrap($el).find("[data-testid=head-id]").should("have.text", "");
        }

        if (index === defaultLinkedList.length - 1) {
          cy.wrap($el)
            .find("[data-testid=tail-id]")
            .should("have.text", "tail");
        } else {
          cy.wrap($el).find("[data-testid=tail-id]").should("have.text", "");
        }
      });
  });

  it("Анимация добавления элемента в head корректно выполняется", () => {
    const testData = "t1".toUpperCase();
    const list = new LinkedList<string>(
      defaultLinkedList.map((val) => val.toUpperCase())
    );
    cy.get("#animaionContainer")
      .children()
      .first()
      .children("[data-testid=element-id]")
      .as("firstElem");

    cy.get("@valueInput").type(testData);
    cy.get("@addHeadButton").click();

    list.prepend(testData);
    const listArr = list.toArray();

    cy.get("@firstElem")
      .children("[data-testid=head-id]")
      .find("[data-testid=circle-id]")
      .invoke("attr", "class")
      .should("match", stateChanging);

    cy.get("@firstElem")
      .children("[data-testid=head-id]")
      .find("[data-testid=letter-id]")
      .should("have.text", testData);

    cy.get("@firstElem")
      .find("[data-testid=circle-id]")
      .should("have.length", 2);

    cy.get("@firstElem")
      .children("[data-testid=circle-id]")
      .invoke("attr", "class")
      .should("match", stateDefault);

    cy.wait(DELAY_IN_MS);

    cy.get("@firstElem")
      .children("[data-testid=circle-id]")
      .invoke("attr", "class")
      .should("match", stateModified);

    cy.get("@firstElem")
      .children("[data-testid=circle-id]")
      .find("[data-testid=letter-id]")
      .should("have.text", testData);

    cy.get("@firstElem")
      .children("[data-testid=head-id]")
      .should("have.text", "head");

    cy.wait(DELAY_IN_MS);

    cy.get("#animaionContainer")
      .find("[data-testid=element-id]")
      .should("have.length", list.getSize());

    cy.get("#animaionContainer")
      .find("[data-testid=element-id]")
      .each(($el, index) => {
        cy.wrap($el)
          .find("[data-testid=circle-id]")
          .invoke("attr", "class")
          .should("match", stateDefault);

        cy.wrap($el)
          .find("[data-testid=letter-id]")
          .should("have.text", listArr[index].value);
      });
  });
});
