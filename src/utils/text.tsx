// {number}x{string}のテキストを[number, string]に分解する関数 
export const parseQuantityAndName = (text: string): [number, string] | null => {
  const match = text.match(/^(\d+)x(.+)$/);
  if (match) {
    const quantity = parseInt(match[1], 10);
    const name = match[2].trim();
    return [quantity, name];
  }
  return null;
}

// テキストの{ID}の部分を指定したIDに置換する関数
export const replaceIdInText = (text: string, id: string): string => {
  return text.replace('{ID}', id);
}