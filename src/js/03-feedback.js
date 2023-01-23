import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
let formData = {};
const previousFormData = localStorage.getItem('feedback-form-state');
const onFormInput = function (event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = function (event) {
  event.preventDefault();
  console.log(formData);
  formRef.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
  console.log();
};

if (previousFormData) {
  const previousFormDataParsed = JSON.parse(previousFormData);

  Object.keys(previousFormDataParsed).forEach(key => {
    formRef.querySelector(`[name="${key}"]`).value =
      previousFormDataParsed[key];
    formData[key] = previousFormDataParsed[key];
  });
  // formRef.querySelector(`name="${previousFormDataParsed}"`)
}

formRef.addEventListener('input', throttle(onFormInput, 500));

formRef.addEventListener('submit', onFormSubmit);
