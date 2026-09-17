const ERROR_DELAY = 5000;
const templateElement = document.getElementById('data-error');

const printError = () => {
  const clone = templateElement.content.cloneNode(true);
  const errorElement = clone.children[0];

  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, ERROR_DELAY);
};

export { printError };
