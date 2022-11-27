import { Directive, ElementRef,HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[appMaskDirective]'
})
export class MaskDirective{
  @HostListener('input', ['$event']) onchange(event: InputEvent){
    if(event.inputType === 'insertText'){
      this.matchMask(this.control.value)
    }
  }

  constructor(private control: NgControl, private el: ElementRef, private rend: Renderer2) { }

  //TODO: In a future I implement @Input with regExp expression for make this directive more reusable
  matchMask(value: string, regExp = null){
    const transformedText = value.split('').reduce((text, letter, index) =>{
      if(index === 3){
        return text.concat(`${letter}-`)
      }else{
        return text.concat(letter)
      }
    }, '')

    this.control.control?.setValue(transformedText)
    let input = this.el.nativeElement
    input.value = transformedText
  }
}
