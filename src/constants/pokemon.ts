export const getTypeColor = (name: string) => {
  switch (name) {
    case 'fire':
      return '#F7786B55';

    case 'water':
      return '#77C4FE55';

    case 'poison':
      return '#7C538C55';

    case 'grass':
      return '#4FC1A655';

    case 'electric':
      return '#FFCE4B55';

    case 'rock':
      return '#B1736C55';

    case 'dark':
      return '#56566955';

    case 'flying':
      return '#cdcde655';

    case 'dragon':
      return '#f7af5a55';

    case 'bug':
      return '#92df6855';

    case 'ground':
      return '#be744755';

    case 'psychic':
      return '#40548355';

    case 'fighting':
      return '#a2a29b55';

    case 'ghost':
      return '#9473b455';

    case 'ice':
      return '#a4def655';

    default:
      return '#c5c5c555';
  }
};
