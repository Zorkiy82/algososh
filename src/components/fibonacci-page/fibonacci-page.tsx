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
  const [fiboSequence, setFiboSequence] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    if (counter > -1) {
      setTimeout(() => {
        if (counter + 1 < fiboSequence.length) {
          setCounter(counter + 1);
        } else {
          setIsLoading(false);
        }
      }, DELAY_IN_MS);
    }
  }, [counter]);

  function onSubmitHandler(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    // @ts-ignore
    const value = Number(evt.target.querySelector("input").value);
    setFiboSequence(getFibonacciNumbers(value));
    setIsLoading(true);
    setCounter(0);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <SectionContainer>
        <form onSubmit={onSubmitHandler} className={styles.inputContainer}>
          <Input
            type="number"
            placeholder="Введите число от 0 до 19"
            max={19}
            min={0}
            isLimitText={true}
            disabled={isLoading}
            required
          />

          <Button
            isLoader={isLoading}
            type="submit"
            text="Рассчитать"
            style={{ width: "178px" }}
          />
        </form>
        <div className={styles.animaionContainer}>
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
