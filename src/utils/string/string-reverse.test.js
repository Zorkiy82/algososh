import { reverseString } from "./string-reverse";

describe("Тесты функции разворота строки", () => {
  it("#1 с чётным количеством символов", () => {
    expect(reverseString("1234").res).toBe("4321");
  });

  it("#2 с нечетным количеством символов", () => {
    expect(reverseString("123").res).toBe("321");
  });

  it("#3 с одним символом", () => {
    expect(reverseString("1").res).toBe("1");
  });

  it("#4 пустая строка", () => {
    expect(reverseString("").res).toBe("");
  });
});
