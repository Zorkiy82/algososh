import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Тесты компонента Button", () => {
  function onClick() {
    alert("it work");
  }
  window.alert = jest.fn();

  it("Кейс #1 (без текста / без diasbled / без лоадера) корректно отрисовывается + вызывается колбек при клике на кнопку", () => {
    render(<Button onClick={onClick} />);
    const btn = screen.getByTestId("button-id");
    expect(btn).toHaveTextContent("");
    expect(btn).toMatchSnapshot();

    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith("it work");
  });

  it("Кейс #2 (c текстом) корректно отрисовывается + вызывается колбек при клике на кнопку", () => {
    render(<Button text="Test" onClick={onClick} />);
    const btn = screen.getByTestId("button-id");
    expect(btn).toHaveTextContent("Test");
    expect(btn).toMatchSnapshot();

    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith("it work");    
  });

  it("Кейс #3 (c diasbled) корректно отрисовывается + НЕ вызывается колбек при клике на кнопку", () => {
    const { rerender } = render(<Button onClick={onClick} />);
    const btn = screen.getByTestId("button-id");
    expect(btn).not.toHaveAttribute("disabled");
    expect(btn).toMatchSnapshot();

    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith("it work");

    rerender(<Button onClick={onClick} disabled />);
    expect(btn).toHaveAttribute("disabled");
    expect(btn).toMatchSnapshot();

    fireEvent.click(btn);
    expect(window.alert).toBeCalledTimes(1);
  });

  it("Кейс #4 (кнопка с лоадером) корректно отрисовывается + НЕ вызывается колбек при клике на кнопку", () => {
    const { rerender } = render(<Button onClick={onClick} />);
    const btn = screen.getByTestId("button-id");    
    expect(screen.queryByTestId("loader-id")).toBeNull();
    expect(btn).toMatchSnapshot();

    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith("it work");

    rerender(<Button  isLoader={true} onClick={onClick} />);
    expect(screen.queryByTestId("loader-id")).toBeInTheDocument();
    expect(btn).toMatchSnapshot();

    fireEvent.click(btn);
    expect(window.alert).toBeCalledTimes(1);
  });
});
