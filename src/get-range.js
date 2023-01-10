function getRange(n) {
  const rangeSeparator = '–';
  const groupSeparator = ', ';
  // flatten + remove duplicates + sort numbers
  const arr = [...new Set(n.flat().sort((a, b) => a - b))];
  const ranges = arr.reduce((a, i, index) => {
    if (typeof i === 'string') {
      a.push([i]);
      return a;
    }
    // check if number is in sequence, and if so, update end of range
    if (arr[index - 1] + 1 === i) {
      a[a.length - 1][1] = i;
      return a;
    }
    // add a new range group
    a.push([i]);
    return a;
  }, []);

  return ranges.map((range) => range.join(rangeSeparator)).join(groupSeparator);
}

export default getRange;

// console.log(getRange([1, 2, 3, 4, 5]));
// console.log(getRange([1, 2, 3]));
// console.log(getRange([[1], [2, 3]]));

// console.log(getRange([10, 12, 14, 11]));
// console.log(getRange([11, 11, 12, 10]));
// console.log(getRange([11, 10, 12, 14, 14, 14, 14]));

// console.log(getRange([1, 2, 3, 10, 12, 14, 11]));
// console.log(getRange([1, 3, 7, 8, 9, 11]));
