export const setRollupTokenIcon = (value: string) => {
  switch (value) {
    case 'CGT':
      return '/gelato.png'

    default:
      return '/ethereum.svg'
  }
};