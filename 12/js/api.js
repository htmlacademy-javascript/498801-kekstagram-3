const GET_PICTURES_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const SEND_FORM_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const getPicturesData = () =>
  fetch(GET_PICTURES_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });


const sendPicturesData = (formData) =>
  fetch(SEND_FORM_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response;
    });

export { getPicturesData, sendPicturesData };
