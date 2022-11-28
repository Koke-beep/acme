import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IForm } from 'src/app/models/form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formData!:IForm[]
  form!: FormGroup

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.generateForm()
  }

  generateForm() {
    const form = this._fb.group({})
    this.formData.forEach(({control, value, validators}) => {
      form.addControl(control, new FormControl(value,))
      if(validators){
        form.get(control)?.setValidators([...validators])
      }
    })
    return form
  }


  isRequired(controlNanme: string): boolean {
    const control = this.form.get(controlNanme)
    if(control?.invalid && (control?.dirty || control?.touched)) {
      return true
    }
    return false
  }

  submitForm(): boolean {
    this.form.markAllAsTouched()
    if(this.form.invalid){
      return false
    }
    return true
  }
}
