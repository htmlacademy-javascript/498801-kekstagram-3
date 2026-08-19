
const OBJECT_AMOUNT = 25;
const AVATAR_AMOUNT = 6;
const MAXIMUM_COMMENT_NUMBER = 30;

const NAMES = ['Александр', 'Алексей', 'Анатолий', 'Андрей', 'Антон', 'Артём', 'Борис', 'Вадим', 'Валентин', 'Валерий', 'Василий', 'Виктор', 'Владимир', 'Владислав', 'Вячеслав', 'Геннадий', 'Георгий', 'Григорий', 'Даниил', 'Денис', 'Дмитрий', 'Евгений', 'Егор', 'Иван', 'Игорь', 'Илья', 'Константин', 'Леонид', 'Максим', 'Михаил'];

const SENTENSES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTIONS = ['Красивый закат над морем', 'Горы покрытые снегом', 'Цветущее поле тюльпанов', 'Городской пейзаж ночью', 'Лес осенью с золотыми листьями', 'Белый песчаный пляж', 'Водопад в джунглях', 'Пустыня с дюнами', 'Озеро в окружении гор', 'Солнечный свет сквозь облака', 'Дорога в тумане', 'Замок на холме', 'Ночное небо с звездами', 'Дельфины в океане', 'Радуга после дождя', 'Старый маяк на скале', 'Цветущий сад вишни', 'Туманное утро в деревне', 'Снежные вершины гор', 'Берег с волнами', 'Поле подсолнухов', 'Осенний парк со скамейкой', 'Летнее небо с облаками', 'Маленький ручей в лесу', 'Панорама города с высоты'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}
const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => {
  const commentId = generateCommentId();
  const avatarNumber = getRandomInteger(1, AVATAR_AMOUNT);
  const messageNumber = getRandomInteger(0, SENTENSES.length - 1);
  const nameNumber = getRandomInteger(0, NAMES.length - 1);

  return {
    id: commentId,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: SENTENSES[messageNumber],
    name: NAMES[nameNumber]
  };
};

const generatePhotoInfo = () => {
  const photoId = generatePhotoId();
  const commentsAmount = getRandomInteger(0, MAXIMUM_COMMENT_NUMBER);

  return {
    id: photoId,
    url: `img/${photoId}.jpg`,
    description: DESCRIPTIONS[photoId - 1],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: commentsAmount}, createComment)
  };
};


const generateObjects = () => Array.from({length: OBJECT_AMOUNT}, generatePhotoInfo);
generateObjects();
