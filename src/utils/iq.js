export function generateIQ() {
  const r = Math.random() * 100

  if (r <= 0.04) return randBetween(1, 19)
  if (r <= 0.34) return randBetween(20, 34)
  if (r <= 0.74) return randBetween(35, 49)
  if (r <= 3.24) return randBetween(50, 69)
  if (r <= 17.24) return randBetween(70, 84)
  if (r <= 85.24) return randBetween(85, 115)
  if (r <= 99.24) return randBetween(116, 129)
  return randBetween(130, 150)
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
/* Nach Normalverteilung: https://www.neuronation.com/science/de/iq-verteilung/ */