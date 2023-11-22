let activeButton = null;

export function createTabs(list) {
  let ulElement = document.createElement('ul');

  ulElement.classList.add('tabs');
  list.forEach(function (category) {
    let liElement = document.createElement('li');
    let buttonElement = document.createElement('button');

    buttonElement.id = `${category.id}`;
    buttonElement.classList.add('tabButton');
    buttonElement.setAttribute('type', 'button');
    buttonElement.appendChild(document.createTextNode(category.name));


    liElement.appendChild(buttonElement);
    ulElement.appendChild(liElement);
  });
  let tabsContainer = document.getElementById('tabsContainer');
  tabsContainer.appendChild(ulElement);
}

export function changeColor(buttonIndex) {
  const buttons = document.getElementsByClassName("tabButton");

  // Si ya hay un botón activo, se le quita la clase "active"
  if (activeButton !== null) {
    activeButton.classList.remove("active");
  }

  // Se activa el nuevo botón seleccionado
  activeButton = buttons[buttonIndex];
  activeButton.classList.add("active");
}

//Codigo nuevo
