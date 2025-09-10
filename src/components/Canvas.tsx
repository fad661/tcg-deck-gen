import { useEffect, useMemo, useState, type FC } from "react";
import { parseQuantityAndName, replaceIdInText } from "../utils/text";
import { loadImage } from "../utils/image";
import { IMAGE_URL } from "../const/title";
import { HEIGHT, WIDTH } from "../const/card";

const Canvas: FC<{
  deckList: string;
}> = (props) => {
  const { deckList } = props;
  const [cards, setCards] = useState<{ qtx: number; image: CanvasImageSource }[]>([]);

  const [width, height] = useMemo(() => {
    return [10 * WIDTH, 5 * HEIGHT]
  }, [])

  useEffect(() => {
    const lines = deckList.split('\n');
    (async () => {
      const loadedCards = await Promise.all(lines.map(async (line) => {
        let [qtx, name] = parseQuantityAndName(line) ? parseQuantityAndName(line)! : [1, line];

        const image = await loadImage(replaceIdInText(IMAGE_URL.ONPIECE, name))
        return {
          qtx,
          image,
        }
      }))
      setCards(loadedCards);
    })()
  }, [deckList]);

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas && cards) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cards.reduce((acc, card) => {
          for (let i = 0; i < card.qtx; i++) {
            const x = (acc % 10) * WIDTH;
            const y = Math.floor(acc / 10) * HEIGHT;
            ctx.drawImage(card.image, x, y, WIDTH, HEIGHT);
            acc++;
          }
          return acc;
        }, 0)
      }
    }

  }, [cards]);

  const handleClick = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const imageDataURL = canvas.toDataURL('image/jpeg', .6);

    const now = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);

    const link = document.createElement('a');
    link.download = `deck_${now}.jpg`;
    link.href = imageDataURL;
    link.click();
  }
  
  return (
    <div style={{ position: 'relative'}}>
      <div style={{ transform: 'scale(0.2)', transformOrigin: 'top left' }} >
        <canvas id="canvas" width={width} height={height}></canvas>
      </div>
      <button style={{ position: 'absolute', top: 10, left: 10}} onClick={() => handleClick()}>Download</button>
    </div>
  );
}

export default Canvas