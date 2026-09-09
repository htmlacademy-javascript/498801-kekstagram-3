const template = document.getElementById('data-error');

const printError = () => {
  const clone = template.content.cloneNode(true);
  const errorElement = clone.children[0];

  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export { printError };
