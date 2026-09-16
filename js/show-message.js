let isMessageOpen = false;

const showMessage = (status) => {
  const templateElement = document.getElementById(status);
  const cloneElement = templateElement.content.cloneNode(true);
  const messageElement = cloneElement.children[0];
  const messageInnerElement = messageElement.querySelector(`.${status}__inner`);
  const closeButtonElement = messageElement.querySelector(`.${status}__button`);
  document.body.append(messageElement);

  isMessageOpen = true;

  const onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
      evt.stopPropagation();
    }
  };

  const onOutsideClick = (evt) => {
    if (!messageInnerElement.contains(evt.target)) {
      closeMessage();
    }
  };

  const onMessageButtonClick = () => {
    closeMessage();
  };

  function closeMessage () {
    isMessageOpen = false;
    messageElement.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  closeButtonElement.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);
};

const getMessageVisibility = () => isMessageOpen;

export { showMessage, getMessageVisibility };
