const ERROR_DELAY = 5000;
const templateElement = document.getElementById('data-error');

const printError = () => {
  const cloneElement = templateElement.content.cloneNode(true);
  const errorElement = cloneElement.children[0];

  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, ERROR_DELAY);
};

export { printError };
