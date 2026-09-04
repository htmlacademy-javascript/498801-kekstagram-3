import { isEscapeKey, addHidden, removeHidden } from './utils.js';

function initModal (overlay, closeButton, callback) {

  const onCloseClick = () => {
    hideModal();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideModal();
    }
  };

  function hideModal () {
    document.body.classList.remove('modal-open');
    addHidden(overlay);
    closeButton.removeEventListener('click', onCloseClick);
    document.removeEventListener('keydown', onDocumentKeydown);

    if (typeof callback === 'function') {
      callback();
    }
  }

  const showModal = () => {
    document.body.classList.add('modal-open');
    removeHidden(overlay);
    closeButton.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  if(overlay.classList.contains('hidden')) {
    showModal();
  }
}

const resetValues = (callback) => {
  callback();
};

export { initModal, resetValues };
