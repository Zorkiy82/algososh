import { ElementStates } from "../../src/types/element-states";
import { reverseString } from "../../src/utils/string/string-reverse";
import { getFibonacciNumbers } from "../../src/utils/fibonacci/fibonacci";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

const stateDefault = new RegExp(ElementStates.Default);
const stateModified = new RegExp(ElementStates.Modified);
const stateChanging = new RegExp(ElementStates.Changing);

describe("Тестирование работоспособности приложения", () => {
  it("Приложение поднялось", () => {
    cy.visit("/");
    cy.contains(/Вдохновлено школами/i);
  });
});

describe("Тестирование переходов по страницам", () => {
  it("открывается страница Строка", () => {
    cy.visit("/recursion");
    cy.contains(/строка/i);
  });

  it("открывается страница Последовательность Фибоначчи", () => {
    cy.visit("/fibonacci");
    cy.contains(/Последовательность Фибоначчи/i);
  });

  it("открывается страница Сортировка массива", () => {
    cy.visit("/sorting");
    cy.contains(/Сортировка массива/i);
  });

  it("открывается страница Стек", () => {
    cy.visit("/stack");
    cy.contains(/Стек/i);
  });

  it("открывается страница Очередь", () => {
    cy.visit("/queue");
    cy.contains(/Очередь/i);
  });

  it("открывается страница Связный список", () => {
    cy.visit("/list");
    cy.contains(/Связный список/i);
  });
});

describe("Функционал страницы Строка", () => {
  beforeEach(function () {
    cy.visit("/recursion");
    cy.get("input").as("input");
    cy.contains("Развернуть").as("button");
  });

  it("Кнопка добавления недоступна если в инпуте пусто", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("have.attr", "disabled");
  });

  it("Анимация разворота строки корректно выполняется", () => {
    const testData = "РаЗвОрОТ".toUpperCase();
    const { res, actionDataLog } = reverseString(testData);
    cy.get("@input").type(`${testData}`);

    cy.get("#animaionContainer")
      .children()
      .each(($el, index) => {
        cy.wrap($el)
          .find("[data-testid=circle-id]")
          .should("have.text", testData[index]);
        cy.wrap($el)
          .find("[data-testid=circle-id]")
          .invoke("attr", "class")
          .should("match", stateDefault);
      });

    cy.get("@button").click();
    cy.wait(SHORT_DELAY_IN_MS);

    for (let i = 0; i < actionDataLog.length; i++) {
      const actionIndex = actionDataLog[i].actionIndex;

      actionIndex.forEach((position) => {
        cy.get("#animaionContainer")
          .children()
          .its(position)
          .find("[data-testid=letter-id]")
          .should("have.text", testData[position]);

        cy.get("#animaionContainer")
          .children()
          .its(position)
          .find("[data-testid=circle-id]")
          .invoke("attr", "class")
          .should("match", stateChanging);
      });

      cy.wait(DELAY_IN_MS);

      actionIndex.forEach((position) => {
        cy.get("#animaionContainer")
          .children()
          .its(position)
          .find("[data-testid=letter-id]")
          .should("have.text", res[position]);

        cy.get("#animaionContainer")
          .children()
          .its(position)
          .find("[data-testid=circle-id]")
          .invoke("attr", "class")
          .should("match", stateModified);
      });
    }
  });
});

describe("Функционал страницы Фибоначчи", () => {
  beforeEach(function () {
    cy.visit("/fibonacci");
    cy.get("input").as("input");
    cy.contains("Рассчитать").as("button");
  });

  it("Кнопка добавления недоступна если в инпуте пусто", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("have.attr", "disabled");
  });

  it("Анимация генерации чисел корректно выполняется", () => {
    const testData = 19;
    const res = getFibonacciNumbers(testData);
    cy.get("@input").type(`${testData}`);
    cy.get("#animaionContainer").children().should("have.length", 0);

    cy.get("@button").click();

    for (let i = 0; i < res.length; i++) {
      cy.get("#animaionContainer")
        .children()
        .last()
        .find("[data-testid=letter-id]")
        .should("have.text", String(res[i]));

        cy.wait(DELAY_IN_MS);

    }
  });
});
