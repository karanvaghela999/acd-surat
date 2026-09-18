export const WIDTH = 1200;
export const HEIGHT = 1500;
export const CAPTION = "I'm attending AWS Community Day Surat 2026 on October 3! See you there. #AWSCommunityDay #AWSSurat";
export const EVENT_URL = "https://acd26.awsugsurat.com/";

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not be loaded."));
    image.src = src;
  });
}

function drawContainedLogo(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const w = image.naturalWidth * scale;
  const h = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - w) / 2, y + (height - h) / 2, w, h);
}

// Convert once on upload. Pixel conversion also works on browsers without canvas filters.
export function monochrome(image: HTMLImageElement): HTMLCanvasElement {
  if (image.naturalWidth * image.naturalHeight > 60_000_000) {
    throw new Error("Please choose a photo smaller than 60 megapixels.");
  }
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 2400 / Math.max(image.naturalWidth, image.naturalHeight));
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Your browser could not open the photo editor.");
  ctx.fillStyle = "#dedede";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const gray = Math.round(pixels.data[i] * 0.2126 + pixels.data[i + 1] * 0.7152 + pixels.data[i + 2] * 0.0722);
    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = gray;
  }
  ctx.putImageData(pixels, 0, 0);
  return canvas;
}

export function drawBadge(canvas: HTMLCanvasElement, logos: HTMLImageElement[], photo: HTMLCanvasElement | null, zoom: number, x: number, y: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser does not support the badge editor.");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const slate = "#23303e";
  const sage = "#d1e5cd";
  const white = "#fafafa";
  ctx.fillStyle = slate; ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Fine orbital geometry echoes the site's cloud/community identity.
  ctx.save(); ctx.strokeStyle = "#d1e5cd"; ctx.globalAlpha = 0.12; ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath(); ctx.ellipse(950, 650, 460 + i * 38, 590 + i * 38, -.4, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();

  // Clip just the emblem's hexagonal perimeter, leaving no white logo tile.
  ctx.save(); ctx.beginPath();
  const emblem = [[256,26],[458,145],[458,370],[256,490],[46,370],[46,145]];
  emblem.forEach(([px, py], i) => {
    if (i === 0) ctx.moveTo(50 + px / 512 * 112, 42 + py / 512 * 112);
    else ctx.lineTo(50 + px / 512 * 112, 42 + py / 512 * 112);
  });
  ctx.closePath(); ctx.clip(); drawContainedLogo(ctx, logos[0], 50, 42, 112, 112); ctx.restore();
  ctx.fillStyle = white; ctx.font = "bold 24px Arial"; ctx.fillText("AWS User Groups", 180, 91);
  ctx.fillStyle = sage; ctx.font = "19px Arial"; ctx.fillText("S U R A T", 180, 121);
  drawContainedLogo(ctx, logos[1], 790, 43, 110, 110);
  ctx.fillStyle = white; ctx.font = "bold 24px Arial"; ctx.fillText("COMMUNITY DAY", 917, 90);
  ctx.fillStyle = sage; ctx.font = "18px Arial"; ctx.fillText("S U R A T  2 0 2 6", 917, 122);

  // Offset architectural edges form a distinctive, open portrait frame.
  ctx.fillStyle = sage;
  ctx.beginPath(); ctx.moveTo(178, 194); ctx.lineTo(1048, 194); ctx.lineTo(1160, 306);
  ctx.lineTo(1160, 1080); ctx.lineTo(1048, 1192); ctx.lineTo(178, 1192); ctx.closePath(); ctx.fill();
  const box = { x: 200, y: 214, width: 936, height: 936 };
  ctx.save(); ctx.beginPath(); ctx.moveTo(200, 214); ctx.lineTo(1036, 214); ctx.lineTo(1136, 314);
  ctx.lineTo(1136, 1050); ctx.lineTo(1036, 1150); ctx.lineTo(200, 1150); ctx.closePath(); ctx.clip();
  ctx.fillStyle = "#555e65"; ctx.fillRect(box.x, box.y, box.width, box.height);
  if (photo) {
    const scale = Math.max(box.width / photo.width, box.height / photo.height) * zoom;
    const w = photo.width * scale, h = photo.height * scale;
    ctx.drawImage(photo, box.x - (w - box.width) * x / 100, box.y - (h - box.height) * y / 100, w, h);
  } else {
    ctx.fillStyle = "#798187";
    ctx.beginPath(); ctx.arc(668, 565, 155, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(668, 1120, 340, 340, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = white; ctx.font = "21px Arial"; ctx.textAlign = "center";
    ctx.fillText("YOUR NEXT CONNECTION STARTS HERE.", 668, 828); ctx.textAlign = "left";
  }
  const shade = ctx.createLinearGradient(0, 860, 0, 1150);
  shade.addColorStop(0, "rgba(0,0,0,0)"); shade.addColorStop(1, "rgba(0,0,0,.65)");
  ctx.fillStyle = shade; ctx.fillRect(200, 860, 936, 290);
  ctx.fillStyle = white; ctx.font = "bold 26px Arial"; ctx.fillText("SEE YOU", 236, 1046);
  ctx.font = "bold 64px Arial"; ctx.fillText("IN SURAT.", 231, 1110);
  ctx.restore();

  // A vertical type rail balances the portrait without covering the face.
  ctx.save(); ctx.translate(112, 1010); ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = sage; ctx.font = "bold 72px Arial"; ctx.fillText("LET'S BUILD.", 0, 0);
  ctx.font = "18px Arial"; ctx.fillText("IDEAS. CONNECTIONS. WHAT COMES NEXT.", 0, 42); ctx.restore();
  ctx.strokeStyle = "#ff9900"; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.moveTo(68, 306); ctx.lineTo(130, 244); ctx.moveTo(68, 244); ctx.lineTo(130, 244); ctx.lineTo(130, 306); ctx.stroke();
  ctx.fillStyle = sage; ctx.font = "bold 22px Arial"; ctx.fillText("2026", 61, 1120);

  // The title overlaps the edge like an event poster, with a slate cutout behind it.
  ctx.fillStyle = slate; ctx.fillRect(42, 1168, 885, 218);
  ctx.fillStyle = sage; ctx.font = "bold 21px Arial"; ctx.fillText("I'M ATTENDING", 56, 1211);
  ctx.fillStyle = white; ctx.font = "bold 79px Arial"; ctx.fillText("AWS Community", 50, 1297);
  ctx.font = "bold 79px Arial"; ctx.fillText("Day Surat", 50, 1380);
  ctx.fillStyle = sage; ctx.textAlign = "right"; ctx.font = "bold 43px Arial"; ctx.fillText("03 OCT", 1148, 1295);
  ctx.font = "21px Arial"; ctx.fillText("LA FOUNTAIN", 1148, 1336); ctx.fillText("SURAT, GUJARAT", 1148, 1369);
  ctx.textAlign = "left";
  ctx.strokeStyle = "#5a6c86"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(54, 1411); ctx.lineTo(1148, 1411); ctx.stroke();
  ctx.fillStyle = sage; ctx.beginPath(); ctx.arc(64, 1453, 6, 0, Math.PI * 2); ctx.fill();
  ctx.font = "19px Arial"; ctx.fillText("ONE COMMUNITY. ENDLESS POSSIBILITIES.", 83, 1460);
  ctx.textAlign = "right"; ctx.fillText("#AWSCommunityDay", 1148, 1460); ctx.textAlign = "left";
}
