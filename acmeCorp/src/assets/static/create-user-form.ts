import { IForm } from "src/app/models/form.model";
import { Validators } from '@angular/forms'

const regExpEmail = '[0-9]{3}-[0-9]{1}'
const regExpPhone = '[0-9]{3} [0-9]{3} [0-9]{3}'
export const createUserForm: IForm[] = [
  {
    control: 'email',
    value: '',
    label: 'email',
    validators: [Validators.required,Validators.email],
    placeholder: '',
  },

  {
    control: 'zip',
    value: '',
    label: 'zip',
    validators: [Validators.required,Validators.pattern(regExpEmail)],
    placeholder: '____-___',
  },
  {
    control: 'geo',
    value: '',
    label: 'geo',
    validators: [Validators.required],
    placeholder: 'Limit to 5 decimals',
  },
  {
    control: 'telephoneNumber',
    value: '+34',
    label: 'telephone',
    validators: [Validators.required,Validators.pattern(regExpPhone)],
    placeholder: '',
  },
  {
    control: 'website',
    value: '',
    label: 'website',
    validators: [Validators.required],
    placeholder: '',
  }
]
