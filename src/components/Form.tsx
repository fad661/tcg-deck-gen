import { useState, type FC } from "react";

export const Form: FC<{
  setDeckList: (deckList: string) => void;
}> = (props) => {

  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    props.setDeckList(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="deckList">Deck List</label>
        <textarea id="deckList" name="deckList" value={value} onInput={(event) => setValue(event.currentTarget.value)} />
      </div>
      <button type="submit">Generate Deck</button>
    </form>
  )
}

export default Form