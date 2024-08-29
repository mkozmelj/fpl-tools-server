export function getColorBasedOnTeam(team: number): string {
  switch (team) {
    // Arsenal
    case 3:
      return '#EF0107';
    // Villa
    case 7:
      return '#95bfe5';
    // Bournemouth
    case 91:
      return '#DA291C';
    // Brendford
    case 94:
      return '#D20000';
    // Brighton
    case 36:
      return '#0057B8';
    // Chelsea
    case 8:
      return '#034694';
    // Crystal Palace
    case 31:
      return '#1B458F';
    // Everton
    case 11:
      return '#003399';
    // Fulham
    case 54:
      return '#000000';
    // Ipswich
    case 40:
      return '#3a64a3';
    // Leicester
    case 13:
      return '#003090';
    // Liverpool
    case 14:
      return '#c8102E';
    // Manchester City
    case 43:
      return '#6CABDD';
    // Manchester United
    case 1:
      return '#DA291C';
    // Newcastle United
    case 4:
      return '#241F20';
    // Nott'm Forrest
    case 17:
      return '#DD0000';
    // Southampton
    case 20:
      return '#d71920';
    // Spurs
    case 6:
      return '#132257';
    // West Ham
    case 21:
      return '#7A263A';
    // Wolves
    case 39:
      return '#FDB913';
    // Unknown
    default:
      return '#38003c';
  }
}
