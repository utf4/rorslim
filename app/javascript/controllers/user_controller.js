import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["container", "firstName", "lastName", "phoneNumber", "emailAddress", "submitButton"]

    connect() {
        this.submitButtonTarget.disabled = true
        // console.log('ok')
    }

    toggleValidation(element) {
        if (element.value === '' || element.value.length > 25) {
            element.style.borderColor = 'red'
            element.parentElement.lastElementChild.classList.remove('hidden')
        } else {
            element.parentElement.lastElementChild.classList.add('hidden')
            element.style.borderColor = 'green'
        }
    }

    reformatPhoneNumber(element) {
        let value = element.value.replace(/\D[^\.]/g, "");
        this.phoneNumberTarget.value = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
    }

    emailValidator(email) {
        return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.emailAddressTarget.value)
    }


    validateFirstName() {
        let element = this.firstNameTarget
        this.toggleValidation(element)
        this.validateAllFields()
    }

    validateLastName() {
        let element = this.lastNameTarget
        this.toggleValidation(element)
        this.validateAllFields()
    }

    validatePhoneNumber() {
        let element = this.phoneNumberTarget
        if (element.value !== '') {
            this.reformatPhoneNumber(element)
        }
        this.validateAllFields()
    }

    validateEmailAddress() {
        let element = this.emailAddressTarget
        if (element.value !== '') {
            const result = this.emailValidator(element.value)
            if (result) {
                element.parentElement.lastElementChild.classList.add('hidden')
                element.style.borderColor = 'green'
            } else {
                element.parentElement.lastElementChild.classList.remove('hidden')
                element.style.borderColor = 'red'
            }
        }
        this.validateAllFields()
    }

    validateAllFields() {
        if (this.firstNameTarget.value !== '' && this.lastNameTarget.value !== '' && this.phoneNumberTarget.value !== '' && this.emailValidator(this.emailAddressTarget.value) === true) {
            this.submitButtonTarget.disabled = false
            this.submitButtonTarget.classList.remove('bg-grey')
        } else {
            this.submitButtonTarget.disabled = true
            this.submitButtonTarget.classList.add('bg-grey')
        }
    }
}
