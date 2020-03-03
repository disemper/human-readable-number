module.exports = function toReadable (number) {
  const numbers = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ];

  const decimals = [
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ];
  const large = [
    'thousand',
    'million',
    'billion',
  ];

  if(number == 0) return 'zero';
  if (number < 100) {
    return parseNum(number.toString()).replace(/\s+/g, ' ').trim();
  };

  let stringNum = '';
  let arrayNums = number.toString().split('');
  const firstNums = arrayNums.splice(0,(arrayNums.length%3));
  arrayNums = arrayNums.join('').match( /\d{1,3}/g );

  if(firstNums.length) {
    stringNum = parseNum(firstNums.join(''));
  }

  for (let i = 1; i <= arrayNums.length; i++) {
    let largeNum = large[arrayNums.length - i];
    if (i == 1 && firstNums.length == 0) {
      largeNum = '';
    }
    stringNum += ' ' + largeNum + ' ' + parseNum(arrayNums[i-1]);
  }

  return stringNum.replace(/\s+/g, ' ').trim();

  function parseNum(num) {
    let stringNum = '';
    num = num.split('');
    const cycle =  3 - num.length;
    for (let i = 0; i < cycle; i++) {
      num.unshift('');
    }

    if (num[0] > 0) {
      stringNum = numbers[+num[0]] + ' hundred';
    }
    if (num[1] < 2) {
      num[1] += num[2];
      stringNum += ' ' + numbers[+num[1]];
    } else {
      stringNum += ' ' + decimals[+num[1] - 2];

      if (num[2] > 0) {
        stringNum += ' ' + numbers[+num[2]];
      }
    }
    return stringNum;
  }
};
