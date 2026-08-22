const checkLength = (line, length) => line.length <= length;

checkLength('проверяемая строка', 20);


const checkPalindrome = (line) => {
  const normalizedLine = line.toLowerCase().replaceAll(' ', '');
  let reversedLine = '';

  for(let i = normalizedLine.length - 1; i >= 0; i--) {
    reversedLine += normalizedLine[i];
  }

  return normalizedLine === reversedLine;
};

checkPalindrome('Лёша на полке клопа нашёл ');


const retrieve = (line) => {
  const lineString = line.toString();
  let numberLine = '';

  for(let i = 0; i < lineString.length; i++) {
    if(!Number.isNaN(parseInt(lineString[i], 10))) {
      numberLine += lineString[i];
    }
  }

  return parseInt(numberLine, 10);
};

retrieve('1 кефир, 0.5 батона');


// Функция проверяет что встреча не выходит за рамки рабочего дня
const isWorkdayValid = (start, end, meetStart, meetDuration) => {
  const getMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return hours * 60 + +minutes;
  };

  const startTimeMinutes = getMinutes(start);
  const endTimeMinutes = getMinutes(end);
  const meetStartTimeMinutes = getMinutes(meetStart);
  const endMeet = meetStartTimeMinutes + meetDuration;

  // Встреча должна начинаться не раньше начала дня и заканчиваться не позже окончания дня
  return meetStartTimeMinutes >= startTimeMinutes && endMeet <= endTimeMinutes;
};

isWorkdayValid('08:00', '17:30', '17:00', 30);
