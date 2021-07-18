const pageContainer = document.getElementById('page-container');

// -- create-element --
const verifyCreateElement = (createElementInput) => {
  if (listTags.some((tag) => tag === createElementInput.value)) {
    createElementInput.style.background = "white";
  } else {
    createElementInput.style.background = "#ffcccb";
  }
}
// -- -- --

// -- select-element --
const listPageContainerElements = ['div'];
const verifySelectElement = (selectElementInput) => {
  if (listPageContainerElements.some((tag) => tag === selectElementInput.value)) {
    selectElementInput.style.background = "white";
  } else {
    selectElementInput.style.background = "#ffcccb";
  }
}
// -- -- --

// -- select-index -- --
const listSelectIndex = [0];
const verifyIndexElement = (indexElementInput) => {
  if (listSelectIndex.some((index) => index === parseInt(indexElementInput.value))) {
    indexElementInput.style.background = "white";
  } else {
    indexElementInput.style.background = "#ffcccb";
  }
}
// -- -- --

// -- list-create-element --
const listTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'ol', 'ul', 'li', 'div', 'hr', 'address', 'aside', 'article', 'footer', 'header', 'main', 'nav', 'section', 'br', 'em', 'strong', 'img'];
const datalistCreateElement = document.getElementById('list-create-element');
listTags.forEach((tag) => {
  const option = document.createElement('option');
  option.value = tag;
  option.innerText = `<${tag}>`;
  datalistCreateElement.append(option)
});

// -- -- --

// -- add-id, add-class, add-inner-text, add-attribute --
const addIdInput = document.getElementById('add-id');
const addClassInput = document.getElementById('add-class');
const addInnerText = document.getElementById('add-inner-text');
const addAttribute = document.getElementById('add-attribute');
const datalistSelectId = document.getElementById('list-select-id');
const datalistSelectClass = document.getElementById('list-select-class');
const listIds = [];
const addToIdList = (idName) => {
  const option = document.createElement('option');
  option.value = idName;
  datalistSelectId.append(option)
}
const listClasses = [];
const addToClassList = (className) => {
  const option = document.createElement('option');
  option.value = className;
  datalistSelectClass.append(option)
}
let listAttributes = [];
const addToAttributeList = () => {
  listAttributes = addAttribute.value.split(' ');
}
// -- -- --

// -- list-select-element --
const datalistSelectElement = document.getElementById('list-select-element');
const addToDataListSelectElement = (tagName) => {
  const option = document.createElement('option');
  if (listTags.some((tag) => tag === tagName)) {
    option.value = tagName;
    option.innerText = `<${tagName}>`;
    datalistSelectElement.append(option)
  }
}
// -- -- --

// -- list-select-index --
const datalistSelectIndex = document.getElementById('list-select-index');
const addToDataListSelectIndex = (length) => {
  const option = document.createElement('option');
  for (let i = 0; i < length; i += 1) {
    if (listSelectIndex.every((index) => index !== i)) {
      option.value = i;
      datalistSelectIndex.append(option)
      listSelectIndex.push(i);
    }
  }
}

// -- -- --

// -- btn-add --
const buttonAdd = document.getElementById('btn-add');
const addToPage = () => {
  const createElementInput = document.getElementById('create-element');
  const selectElementInput = document.getElementById('select-element');
  if (listTags.some((tag) => tag === createElementInput.value)) {
    const createTag = document.createElement(createElementInput.value);
    if (listPageContainerElements.every((tag) => tag !== selectElementInput.value)) {
      alert('Tag a ser anexada invalida!');
      selectElementInput.style.background = "#ffcccb";
      return;
    }
    const inputSelectId = document.getElementById("select-id");
    const inputSelectClass = document.getElementById("select-class");
    let appendTag;
    if (inputSelectId.value === '' && inputSelectClass.value === '') {
      appendTag = document.querySelectorAll(selectElementInput.value);
    } else if (inputSelectClass.value === '') {
      appendTag = document.querySelectorAll(`${selectElementInput.value}#${inputSelectId.value}`);
    } else if (inputSelectId.value === '') {
      appendTag = document.querySelectorAll(`${selectElementInput.value}.${inputSelectClass.value.replace(/\s/g, '.')}`);
    } else {
      appendTag = document.querySelectorAll(`${selectElementInput.value}#${inputSelectId.value}.${inputSelectClass.value.replace(/\s/g, '.')}`);
    }
    if (appendTag === null) {
      alert('Tag a ser anexada nao encontrada!');
      return;
    }
    addToDataListSelectIndex(appendTag.length);
    const inputSelectIndex = document.getElementById('select-index');
    if (listSelectIndex.every((index) => index !== parseInt(inputSelectIndex.value))) {
      alert('Index do elemento a ser anexado nao encontrado!');
      inputSelectIndex.style.background = "#ffcccb";
      return;
    }
    if (addIdInput.value) createTag.setAttribute('id', addIdInput.value);
    if (addClassInput.value) createTag.setAttribute('class', addClassInput.value);
    addToAttributeList();
    listAttributes.forEach((par) => {
      const attribute = par.split('=');
      const regex = /"/g;
      createTag.setAttribute(attribute[0], attribute[1].replace(regex, ''));
      console.log(createTag);
    });
    createTag.innerText = addInnerText.value;
    const textCss = document.getElementById('text-css');
    createTag.style.cssText = textCss.value;
    appendTag[parseInt(inputSelectIndex.value)].append(createTag);
    const tagName = createTag.tagName.toLowerCase();
    if (listPageContainerElements.every((element) => element !== tagName)) {
      listPageContainerElements.push(tagName);
      addToDataListSelectElement(tagName);
    }
    if (listIds.every((id) => id !== addIdInput.value)) {
      listIds.push(addIdInput.value);
      addToIdList(addIdInput.value);
    }
    if (listClasses.every((Class) => Class !== addClassInput.value)) {
      listClasses.push(addClassInput.value);
      addToClassList(addClassInput.value);
    }
  } else {
    createElementInput.style.background = "#ffcccb";
    alert('Tag invalida!');
  }
};
// -- -- --
