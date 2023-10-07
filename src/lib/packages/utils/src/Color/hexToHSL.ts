import type { ColorTransferHSL } from "./types.js"

export const hexToHSL:ColorTransferHSL = (hex) => {

    const normalizedHex = hex.replace('#', '')

    // Convert hex to RGB first
    let r = 0
    let g = 0
    let b = 0
    
    if (normalizedHex.length === 3) {
      r = + ("0x" + normalizedHex[0] + normalizedHex[0]);
      g = + ("0x" + normalizedHex[1] + normalizedHex[1]);
      b = + ("0x" + normalizedHex[2] + normalizedHex[2]);
    } else if (normalizedHex.length === 6) {
      r = + ("0x" + normalizedHex[0] + normalizedHex[1]);
      g = + ("0x" + normalizedHex[2] + normalizedHex[3]);
      b = + ("0x" + normalizedHex[4] + normalizedHex[5]);
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r,g,b)
    const cmax = Math.max(r,g,b)
    const delta = cmax - cmin

    let h = 0
    let s = 0
    let l = 0
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        data: {
            h,
            s,
            l
        },
        color: `hsl(${h}, ${s}%, ${l}%)`
    };
  }
