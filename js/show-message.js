let isMessageOpen = false;

const showMessage = (status) => {
  const template = document.getElementById(status);
  const clone = template.content.cloneNode(true);
  const message = clone.children[0];
  const messageInner = message.querySelector(`.${status}__inner`)
  document.body.append(message);

  isMessageOpen = true;

  const onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
      evt.stopPropagation();
    }
  };

  const onOutsideClick = (evt) => {
    if (!messageInner.contains(evt.target)) {
      closeMessage();
    }
  };

  function closeMessage () {
    isMessageOpen = false;
    message.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  const closeButton = message.querySelector(`.${status}__button`);
  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);
};

export { showMessage, isMessageOpen };
