function checkLength (line, length) {
  return line.length <= length;
}


function checkPalindrome (line) {
  const normalizedLine = line.toLowerCase().replaceAll(' ', '');
  let reversedLine = '';

  for(let i = normalizedLine.length - 1; i >= 0; i--) {
    reversedLine += normalizedLine[i];
  }

  return normalizedLine === reversedLine;
}


function retrieve (line) {
  line = line.toString();
  let numberLine = '';

  for(let i = 0; i < line.length; i++) {
    if(!isNaN(line[i]) && line[i] !== ' ') {
      numberLine += line[i];
    }
  }

  if (numberLine.length === 0) {
    return NaN;
  } else {
    return Number(numberLine);
  }
}
