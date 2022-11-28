import { IForm } from "src/app/models/form.model";
import { Validators } from '@angular/forms'

const regExpWeb = '^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$'
const regExpPhone = '[0-9]{3} [0-9]{3} [0-9]{3}'
const regExpZip = '[0-9]{4}-[0-9]{3}'

export const createUserForm: IForm[] = [
  {
    control: 'email',
    value: '',
    label: 'email',
    validators: [Validators.required,Validators.email],
    mask: '',
    placeholder: 'example@gmail.com',
  },

  {
    control: 'zip',
    value: '',
    label: 'zip',
    validators: [Validators.required,Validators.pattern(regExpZip)],
    mask: 'zipMask',
    placeholder: '____-___',
  },
  {
    control: 'geo',
    value: '',
    label: 'geo',
    validators: [Validators.required],
    mask: '',
    placeholder: 'latitude / longitude',
  },
  {
    control: 'telephoneNumber',
    value: '',
    label: 'telephone',
    validators: [Validators.required,Validators.pattern(regExpPhone)],
    mask: '',
    placeholder: '',
  },
  {
    control: 'website',
    value: '',
    label: 'website',
    validators: [Validators.required, Validators.pattern(regExpWeb)],
    mask: '',
    placeholder: 'http://websiteExample.com',
  }
]
