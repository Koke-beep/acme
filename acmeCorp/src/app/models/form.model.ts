import { AbstractControl } from '@angular/forms'

export interface IForm {
  control: string
  value: string
  label: string
  validators: ((data: AbstractControl) => any)[]
  mask: string
  placeholder?: string
}
