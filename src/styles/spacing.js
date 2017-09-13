const spacingFactor = 5
export const spacing = {
  space0: `${computeGoldenRatio(spacingFactor, 0)}px`,  // 5
  space1: `${computeGoldenRatio(spacingFactor, 1)}px`,  // 8
  space2: `${computeGoldenRatio(spacingFactor, 2)}px`,  // 13
  space3: `${computeGoldenRatio(spacingFactor, 3)}px`,  // 21
  space4: `${computeGoldenRatio(spacingFactor, 4)}px`,  // 34
  space5: `${computeGoldenRatio(spacingFactor, 5)}px`  // 55
}

function computeGoldenRatio (spacingFactor, exp) {
  return Math.round(spacingFactor * Math.pow(1.618, exp))
}
