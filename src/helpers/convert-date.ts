export default (date: string) => {
  const split: string[] = date.split(date.includes('-') ? '-' : '.');
  split.reverse();
  return split.join(date.includes('-') ? '.' : '-');
}