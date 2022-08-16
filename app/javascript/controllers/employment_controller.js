import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["employer", "employerValidationText"]

    connect() {
    }

    toggleValidation(element) {
        if (element.value === '' || element.value.length > 25) {
            element.style.borderColor = 'red'
            this.employerValidationTextTarget.classList.remove('hidden')
        } else {
            this.employerValidationTextTarget.classList.add('hidden')
            element.style.borderColor = 'green'
        }
    }

    validateEmployer() {
        let element = this.employerTarget
        this.toggleValidation(element)
    }
}
