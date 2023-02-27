import throttle from "lodash.throttle";

const formElement = document.querySelector('.feedback-form');

const formData = {};
console.log(formData);

const STORAGE_KEY = 'feedback-form-state';

formElement.addEventListener('input', throttle(onFormImput), 500);
formElement.addEventListener('submit', onFormSubmit);

populateFormElement();

function onFormSubmit(evt) {
    evt.preventDefault();
    const {
        elements: { email, message }
    } = evt.target;

    if (email.value === "" || message.value === "") {
        return window.alert("Please fill in all the fields!");
    };
    console.log({ 'Email': email.value, 'Message': message.value });
    formElement.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onFormImput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
}

function populateFormElement() {

    if (localStorage.getItem(STORAGE_KEY) === null) {
        return;
    }
    const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

    Object.entries(savedForm).forEach(([name, value]) => {
        formData[name] = value;
        formElement.elements[name].value = value;
    });
}

