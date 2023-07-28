import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

const LOCAL_STORAGE_KEY = "feedback-form-state";
const userFeedbackData = {
    email: '',
    message: '',
};

if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
    input.value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).email;
    textarea.value = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY)
    ).message;
    userFeedbackData.email = input.value;
    userFeedbackData.message = textarea.value;
};


form.addEventListener('input', throttle(onSavingFeedback, 500));
form.addEventListener('submit', onResetForm);

function onSavingFeedback(evt) {
    userFeedbackData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userFeedbackData));
};

function onResetForm(evt) {
    evt.preventDefault();

    const {
        elements: { email, message }
    } = evt.currentTarget;
    
    if (email.value === "" || message.value === "") {
        return alert("Please fill in all the fields!");
    } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        evt.currentTarget.reset();
        console.log(userFeedbackData);
        userFeedbackData.email = '';
        userFeedbackData.message = '';
    }
}

