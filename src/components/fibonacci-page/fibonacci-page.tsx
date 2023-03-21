import React, { FormEvent, useEffect, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getFibonacciNumbers } from "../../utils/fibonacci/fibonacci";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [minNumber, maxNumber] = [0, 19];
  const [fiboSequence, setFiboSequence] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputNumber, setInputNumber] = useState<number | "">("");
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    if (counter > -1 && counter < 20) {
      setTimeout(() => {
        if (counter + 1 < fiboSequence.length) {
          setCounter(counter + 1);
        } else {
          setIsLoading(false);
          setCounter(20);
        }
      }, DELAY_IN_MS);
    }
  }, [counter]);

  function onClickHandler() {
    setFiboSequence(getFibonacciNumbers(Number(inputNumber)));
    setIsLoading(true);
    setCounter(0);
  }
  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    let index: number | "" =
      evt.target.value === "" ? "" : Number(evt.target.value);

    index = index < minNumber ? "" : index > maxNumber ? maxNumber : index;

    setInputNumber(index);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <Input
            value={inputNumber}
            onChange={onChange}
            type="number"
            placeholder={`Введите число от ${minNumber} до ${maxNumber}`}
            max={maxNumber}
            min={minNumber}
            isLimitText={true}
            disabled={isLoading}
          />

          <Button
            onClick={onClickHandler}
            isLoader={isLoading}
            text="Рассчитать"
            linkedList="small"
            disabled={inputNumber === ""}
          />
        </div>
        <div className={styles.animaionContainer} id="animaionContainer">
          {Boolean(fiboSequence.length) &&
            fiboSequence
              .filter((_, index) => index <= counter)
              .map((val, index) => (
                <Circle letter={String(val)} key={index} index={index} />
              ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
