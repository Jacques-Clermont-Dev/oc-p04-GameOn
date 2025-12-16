// #region 1. NAV (burger menu)
function editNav() {
  const topNav = document.getElementById('myTopnav')
  if (topNav.className === 'topnav') {
    topNav.className += ' responsive'
  } else {
    topNav.className = 'topnav'
  }
}
// #endregion

// #region 2. DOM SELECTORS
const modalOverlay = document.querySelector('.bground')
const modalOpenButtons = document.querySelectorAll('.modal-btn')

const closeBtn = document.querySelector('.close')
const closeBtnThanks = document.querySelector('#close-btn-thks')
const closeBtnThanksCross = document.querySelector('.close_bis')

const thanksContainer = document.getElementById('thanksContainer')

const inputFirst = document.getElementById('first')
const inputLast = document.getElementById('last')
const inputEmail = document.getElementById('email')
const inputBirthdate = document.getElementById('birthdate')
const inputQuantity = document.getElementById('quantity')
// #endregion

// #region 3. MODAL OPEN / CLOSE
function launchModal() {
  modalOverlay.style.display = 'block'
}

function closeModal() {
  modalOverlay.style.display = 'none'
}

modalOpenButtons.forEach((btn) => btn.addEventListener('click', launchModal))
closeBtn.addEventListener('click', closeModal)
// #endregion

// #region 4. RESET + CLOSE AFTER SUCCESS
function emptyAndClose() {
  inputFirst.value = ''
  inputLast.value = ''
  inputEmail.value = ''
  inputBirthdate.value = null
  inputQuantity.value = ''

  thanksContainer.classList.add('hidden')
  closeModal()
}

closeBtnThanks.addEventListener('click', emptyAndClose)
closeBtnThanksCross.addEventListener('click', emptyAndClose)
// #endregion

// #region 5. VALIDATION HELPERS (your current behavior)
function validateName(name, id) {
  if (name.length >= 2) {
    return true
  } else {
    const divError = document.createElement('div')
    divError.id = `ID_${id}`
    divError.className = 'error-message'
    divError.textContent = 'ce champ doit contenir 2 caractères minimum'

    if (id === 'first') {
      const nodeParent = document.querySelectorAll('.formData')[0]
      nodeParent.appendChild(divError)
    } else if (id === 'last') {
      const nodeParent = document.querySelectorAll('.formData')[1]
      nodeParent.appendChild(divError)
    }
  }
}

function validateEmail(email) {
  const emailRegExp = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+')
  if (emailRegExp.test(email)) {
    return true
  } else {
    const divError = document.createElement('div')
    divError.id = 'ID_email'
    divError.className = 'error-message'
    divError.textContent = 'Veuillez saisir un email valide'

    const nodeParent = document.querySelectorAll('.formData')[2]
    nodeParent.appendChild(divError)
  }
}

function validateBirthdate(birthdate) {
  // Date du jour au format YYYY-MM-DD
  const dateNow = new Date()
  const day = String(dateNow.getDate()).padStart(2, '0')
  const month = String(dateNow.getMonth() + 1).padStart(2, '0')
  const year = dateNow.getFullYear()
  const todayFormatted = `${year}-${month}-${day}`

  if (birthdate === '') {
    const divError = document.createElement('div')
    divError.id = 'ID_birthdate'
    divError.className = 'error-message'
    divError.textContent = 'Veuillez saisir une date valide'

    const nodeParent = document.querySelectorAll('.formData')[3]
    nodeParent.appendChild(divError)
  } else if (birthdate >= todayFormatted) {
    const divError = document.createElement('div')
    divError.id = 'ID_birthdate'
    divError.className = 'error-message'
    divError.textContent = 'La date de naissance doit être inférieure à la date du jour'

    const nodeParent = document.querySelectorAll('.formData')[3]
    nodeParent.appendChild(divError)
  }
  return true
}

function validateNumber(number) {
  const numberRegExp = new RegExp('[0-9]+')
  if (numberRegExp.test(number)) {
    return true
  } else {
    const divError = document.createElement('div')
    divError.id = 'ID_quantity'
    divError.className = 'error-message'
    divError.textContent = 'Veuillez saisir un nombre entier'

    const nodeParent = document.querySelectorAll('.formData')[4]
    nodeParent.appendChild(divError)
  }
}

function validateChoice(choice) {
  if (choice === null) {
    const divError = document.createElement('div')
    divError.id = 'ID_choice'
    divError.className = 'error-message'
    divError.textContent = 'Veuillez choisir un tournoi'

    const nodeParent = document.querySelectorAll('.formData')[5]
    nodeParent.appendChild(divError)
  }
  return true
}

function validateTerms(termsAccepted) {
  if (termsAccepted === false) {
    const divError = document.createElement('div')
    divError.id = 'ID_Terms'
    divError.className = 'error-message'
    divError.textContent = "Veuillez accepter les conditions d'utilisation"

    const nodeParent = document.querySelectorAll('.formData')[6]
    nodeParent.appendChild(divError)
  }
  return true
}
// #endregion

// #region 6. CLEAR PREVIOUS ERRORS
function removeErrorById(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.parentNode.removeChild(el)
}

function clearAllErrors() {
  removeErrorById('ID_first')
  removeErrorById('ID_last')
  removeErrorById('ID_email')
  removeErrorById('ID_birthdate')
  removeErrorById('ID_quantity')
  removeErrorById('ID_choice')
  removeErrorById('ID_Terms')
}
// #endregion

// #region 7. FORM VALIDATION (current logic)
function validateButton(
  firstValue,
  firstId,
  lastValue,
  lastId,
  email,
  birthdate,
  quantity,
  choice,
  terms,
) {
  clearAllErrors()

  const firstStatus = validateName(firstValue, firstId)
  const lastStatus = validateName(lastValue, lastId)
  const emailStatus = validateEmail(email)
  const birthdateStatus = validateBirthdate(birthdate)
  const quantityStatus = validateNumber(quantity)
  const choiceStatus = validateChoice(choice)
  validateTerms(terms)

  if (
    firstStatus &&
    lastStatus &&
    emailStatus &&
    birthdateStatus &&
    quantityStatus &&
    choiceStatus &&
    terms
  ) {
    return true
  }
  return false
}
// #endregion

// #region 8. SUBMIT HANDLER
function validate(event) {
  event.preventDefault()

  const firstNameValue = inputFirst.value
  const lastNameValue = inputLast.value
  const emailValue = inputEmail.value
  const birthdateValue = inputBirthdate.value
  const quantityValue = inputQuantity.value

  const locationChecked = document.querySelector('input[name="location"]:checked')
  const termsAccepted = document.getElementById('checkbox1').checked

  if (
    validateButton(
      firstNameValue,
      inputFirst.id,
      lastNameValue,
      inputLast.id,
      emailValue,
      birthdateValue,
      quantityValue,
      locationChecked,
      termsAccepted,
    )
  ) {
    // show success message
    thanksContainer.classList.remove('hidden')
  } else {
    console.log('les conditions ne sont pas réunies, le bouton est désactivé')
  }
}
// #endregion
