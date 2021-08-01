const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expresions = {
  user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  pass: /^.{4,12}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/ // 7 a 14 numeros.
};

const fields = {
  user: false,
  name: false,
  pass: false,
  email: false,
  phone: false
}

const validForm = (e) => {
  switch (e.target.name) {
    case 'user':
      validInput(expresions.user, e.target, 'user');
      break;

    case 'name':
      validInput(expresions.name, e.target, 'name');
      break;

    case 'pass':
      validInput(expresions.pass, e.target, 'pass');
      validPass2(pass);
      break;

    case 'pass2':
      validPass2(e.target.value);
      break;

    case 'email':
      validInput(expresions.email, e.target, 'email');
      break;

    case 'phone':
      validInput(expresions.phone, e.target, 'phone');
      break;

    default:
      break;
  }
};

function validInput(expresion, input, field) {
  if (expresion.test(input.value)) {
    document.querySelector(`#form #${field}__group`).classList.remove('form__group-incorrect');
    document.querySelector(`#form #${field}__group`).classList.add('form__group');
    document.querySelector(`#form #${field}__group i`).classList.remove('fa-times-circle');
    document.querySelector(`#form #${field}__group .form__input-error`).classList.remove('form__input-error-active');
    fields[field] = true;
  } else {
    document.querySelector(`#form #${field}__group`).classList.remove('form__group');
    document.querySelector(`#form #${field}__group`).classList.add('form__group-incorrect');
    document.querySelector(`#form #${field}__group i`).classList.add('fa-times-circle');
    document.querySelector(`#form #${field}__group .form__input-error`).classList.add('form__input-error-active');
    fields[field] = false;
  }
}

function validPass2(pass2) {
  var pass = document.querySelector('#pass').value;
  if (pass == pass2) {
    document.querySelector('#form #pass2__group').classList.remove('form__group-incorrect');
    document.querySelector('#form #pass2__group').classList.add('form__group');
    document.querySelector('#form #pass2__group i').classList.remove('fa-times-circle');
    document.querySelector('#form #pass2__group .form__input-error').classList.remove('form__input-error-active');
    fields['pass'] = true;
  } else {
    document.querySelector('#form #pass2__group').classList.remove('form__group');
    document.querySelector('#form #pass2__group').classList.add('form__group-incorrect');
    document.querySelector('#form #pass2__group i').classList.add('fa-times-circle');
    document.querySelector('#form #pass2__group .form__input-error').classList.add('form__input-error-active');
    fields['pass'] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', (validForm));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let terms = document.getElementById('terms');

  if (fields.user && fields.name && fields.pass && fields.email && fields.phone && terms.checked) {
    form.reset();
    document.getElementById('form__error-message').classList.remove('form__error-message-active');
    document.getElementById('form__success-message').classList.add('form__success-message-active');
    setTimeout(() => {
      document.getElementById('form__success-message').classList.remove('form__success-message-active');
    }, 5000);
  } else {
    document.getElementById('form__error-message').classList.add('form__error-message-active');
  }
});
