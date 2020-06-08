function humanizeDate(date) {
  var split = date.split('-');
  
  split.reverse();

  return split.join('.');
}

export default humanizeDate;
