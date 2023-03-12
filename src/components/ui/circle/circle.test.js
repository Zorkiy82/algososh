import { render, screen, fireEvent } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тесты компонента Circle", () => {
  it("Кейс #1 (без буквы и вообще без пропов) корректно отрисовывается", () => {
    render(<Circle />);
    const element = screen.getByTestId("element-id");
    const letter = screen.getByTestId("letter-id");
    const head = screen.getByTestId("head-id");
    const tail = screen.getByTestId("tail-id");
    const index = screen.getByTestId("index-id");
    const circle = screen.getByTestId("circle-id");
    expect(letter).toHaveTextContent("");
    expect(head).toHaveTextContent("");
    expect(tail).toHaveTextContent("");
    expect(index).toHaveTextContent("");
    expect(circle.classList.contains("small")).toBe(false);
    expect(circle.classList.contains(ElementStates.Default)).toBe(true);
    expect(circle.classList.contains(ElementStates.Modified)).toBe(false);
    expect(circle.classList.contains(ElementStates.Changing)).toBe(false);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #2 (с буквами) корректно отрисовывается", () => {
    render(<Circle letter="aBcdD" />);
    const element = screen.getByTestId("element-id");
    const letter = screen.getByTestId("letter-id");
    expect(letter).toHaveTextContent(/aBcdD/i);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #3 (с head) корректно отрисовывается", () => {
    render(<Circle head={"head"} />);
    const element = screen.getByTestId("element-id");
    const head = screen.getByTestId("head-id");
    expect(head).toHaveTextContent("head");
    expect(element).toMatchSnapshot();
  });

  it("Кейс #4 (с react-элементом в head) корректно отрисовывается", () => {
    const { rerender } = render(<Circle />);
    const element = screen.getByTestId("element-id");
    let heads = screen.queryAllByTestId("head-id");
    expect(heads).toHaveLength(1);
    expect(heads[0].childElementCount).toBe(0);
    expect(element).toMatchSnapshot();

    rerender(<Circle head={<Circle />} />);
    heads = screen.queryAllByTestId("head-id");
    expect(heads).toHaveLength(2);
    expect(heads[0].childElementCount).toBe(1);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #5 (с tail) корректно отрисовывается", () => {
    render(<Circle tail={"tail"} />);
    const element = screen.getByTestId("element-id");
    const tail = screen.getByTestId("tail-id");
    expect(tail).toHaveTextContent("tail");
    expect(element).toMatchSnapshot();
  });

  it("Кейс #6 (с react-элементом в tail) корректно отрисовывается", () => {
    const { rerender } = render(<Circle />);
    const element = screen.getByTestId("element-id");
    let tails = screen.queryAllByTestId("tail-id");
    expect(tails).toHaveLength(1);
    expect(tails[0].childElementCount).toBe(0);
    expect(element).toMatchSnapshot();

    rerender(<Circle tail={<Circle />} />);
    tails = screen.queryAllByTestId("tail-id");
    expect(tails).toHaveLength(2);
    expect(tails[0].childElementCount).toBe(1);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #7 (с index) корректно отрисовывается", () => {
    render(<Circle index={1} />);
    const element = screen.getByTestId("element-id");
    const index = screen.getByTestId("index-id");
    expect(index).toHaveTextContent("1");
    expect(element).toMatchSnapshot();
  });

  it("Кейс #8 (с пропом isSmall ===  true) корректно отрисовывается", () => {
    render(<Circle isSmall={true} />);
    const element = screen.getByTestId("element-id");
    const circle = screen.getByTestId("circle-id");
    expect(circle.classList.contains("small")).toBe(true);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #9 (в состоянии default) корректно отрисовывается", () => {
    render(<Circle state={ElementStates.Default} />);
    const element = screen.getByTestId("element-id");
    const circle = screen.getByTestId("circle-id");
    expect(circle.classList.contains(ElementStates.Default)).toBe(true);
    expect(circle.classList.contains(ElementStates.Modified)).toBe(false);
    expect(circle.classList.contains(ElementStates.Changing)).toBe(false);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #10 (в состоянии changing) корректно отрисовывается", () => {
    render(<Circle state={ElementStates.Changing} />);
    const element = screen.getByTestId("element-id");
    const circle = screen.getByTestId("circle-id");
    expect(circle.classList.contains(ElementStates.Changing)).toBe(true);
    expect(circle.classList.contains(ElementStates.Default)).toBe(false);
    expect(circle.classList.contains(ElementStates.Modified)).toBe(false);
    expect(element).toMatchSnapshot();
  });

  it("Кейс #11 (в состоянии modified) корректно отрисовывается", () => {
    render(<Circle state={ElementStates.Modified} />);
    const element = screen.getByTestId("element-id");
    const circle = screen.getByTestId("circle-id");
    expect(circle.classList.contains(ElementStates.Modified)).toBe(true);
    expect(circle.classList.contains(ElementStates.Changing)).toBe(false);
    expect(circle.classList.contains(ElementStates.Default)).toBe(false);
    expect(element).toMatchSnapshot();
  });


});
