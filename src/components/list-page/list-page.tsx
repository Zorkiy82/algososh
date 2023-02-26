import React, { useEffect, useState } from "react";
import { LinkedList } from "../../utils/list/list";
import { TItemsData } from "../../utils/types";
import { randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState<number | string>("");
  const [list, setList] = useState(new LinkedList<string>());
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);

  useEffect(()=>{
    const newArr = randomArr(0,9999,2,6);
    
    console.log(newArr);
    newArr.forEach(val=>{
      list.append(String(val));
    })
    const data = list.getItemsData();
    setItemsData(data);
  },[])

  function onChangeValue(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
  }

  function onChangeIndex(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputIndex(Number(evt.target.value));
  }

  return (
    <SolutionLayout title="Связный список">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeValue}
            placeholder="Введите значение"
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            disabled={isLoading}
            extraClass={styles.input}
          />

          <Button
            onClick={() => undefined}
            linkedList="small"
            text="Добавить в head"
            // disabled={isLoading || list.getSize() >= 11}
          />

          <Button
            onClick={() => undefined}
            linkedList="small"
            text="Добавить в tail"
            // disabled={isLoading || list.getSize() === 0}
          />

          <Button
            onClick={() => undefined}
            linkedList="small"
            text="Удалить из head"
            // disabled={isLoading || list.getSize() === 0}
          />

          <Button
            onClick={() => undefined}
            linkedList="small"
            text="Удалить из tail"
            // disabled={isLoading || list.getSize() === 0}
          />
        </div>

        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeIndex}
            placeholder="Введите индекс"
            value={inputIndex}
            type="number"
            max={6}
            min={0}
            isLimitText={true}
            disabled={isLoading}
            extraClass={styles.input}
          />

          <Button
            onClick={() => undefined}
            linkedList="big"
            text="Добавить по индексу"
            // disabled={isLoading || list.getSize() >= 11}
          />

          <Button
            onClick={() => undefined}
            linkedList="big"
            text="Удалить по индексу"
            // disabled={isLoading || list.getSize() === 0}
          />
        </div>

        <div className={styles.animaionContainer}>
          {Boolean(itemsData.length) &&
            itemsData.map((elem, index) => (
              <Circle
                letter={String(elem.value)}
                index={index}
                key={index}
                state={elem.state}
                tail={index === itemsData.length - 1 ? "tail" : <Circle isSmall={true} letter="?" />}
                head={index === 0 ? "head" : <Circle isSmall={true} letter="?" />}
              />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
