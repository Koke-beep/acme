import { Directive, ElementRef,HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[appMaskDirective]'
})
export class MaskDirective{
  @HostListener('input', ['$event']) onchange(event: InputEvent){
    if(
      (event.target as HTMLInputElement).value.match('[0-9]{4}-[0-9]{4}')
      && event.inputType !== 'deleteContentBackward'
    ){
      this.removeLastLetter(this.control.value)
    }else if(event.inputType === 'insertText'){
      this.matchMask(this.control.value)
    }
  }

  constructor(private control: NgControl, private el: ElementRef, private _renderer: Renderer2) { }

  //TODO: In a future I implement @Input with regExp expression for make this directive more reusable
  matchMask(value: string, regExp = null){

  // TECHNICAL DEBT: this funcion can be simplified
  const transformedText = value.split('').reduce((text, letter, index) =>{
    if(index === 3 && !value.match('-')){
      return text.concat(`${letter}-`)
    }else{
      return text.concat(letter)
    }
  }, '')

    this.control.control?.setValue(transformedText)
    let input = this.el.nativeElement
    this._renderer.setValue(input, transformedText)
  }

  removeLastLetter(value: string){
    console.log("work")
    const text = value.slice(0,-1)
    let input = this.el.nativeElement
    this.control.control?.setValue(text)
    this._renderer.setValue(input, text)
  }
}
