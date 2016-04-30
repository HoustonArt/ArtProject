import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  selector: '[boolean-hover-change]',
  host: {
    '(mouseEnter)':'onMouseEnter()',
    '(mouseLeave)':'onMouseLeave()'
  }
})
export class BooleanHoverChange {
  private _el: HTMLElement;
  @Input() bool: boolean;

  constructor(el: ElementRef){
    this._el = el.nativeElement;
  }

  onMouseEnter(){
    this.bool = true;
  }

  onMouseLeave(){
    this._el.style.visibility = 'hidden';
  }

}
