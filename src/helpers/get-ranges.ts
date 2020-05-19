function getRanges(array: number[]) {
  var ranges = [], start, end;
  for (var i = 0; i < array.length; i++) {
    start = array[i];
    end = start;
    while (array[i + 1] - array[i] == 1) {
      end = array[i + 1];
      i++;
    }
    ranges.push(start == end ? start + '' : `${start}-${end}`);
  }
  return ranges;
}

export default getRanges;
