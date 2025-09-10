// 指定したURLから画像を読み込み、CanvasImageSourceを返す関数
export const loadImage = (url: string): Promise<CanvasImageSource> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // CORS対策
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}