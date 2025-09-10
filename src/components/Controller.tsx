import type { FC } from "react";
import { GAME_TITLE } from "../const/title";

const Controller: FC<{
  title: string;
  setTitle: (title: string) => void;
}> = (props) => {
  return (
    <div>
      <h2>TCG Deck Gen v2</h2>
      <div>
        <select onSelect={(selected) => props.setTitle(selected.currentTarget.value)}>
          {Object.keys(GAME_TITLE).map((key) => (
            <option key={key} value={key} selected={key === props.title}>{GAME_TITLE[key as keyof typeof GAME_TITLE]}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Controller