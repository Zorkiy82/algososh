import { ElementStates } from "../../src/types/element-states";
import { reverseString } from "../../src/utils/string/string-reverse";

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
    const testData = "01234";
    const { res, actionDataLog } = reverseString(testData);
    cy.get("@input").type(`${testData}`);
    // cy.get("@button").click();

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

    for (let i = 0; i < testData.length; i++) {
      cy.get("#animaionContainer")
        .children()
        .its(i)
        .find("[data-testid=letter-id]")
        .should("have.text", testData[i]);
      // cy.wait(1000);
    }
  });
});
