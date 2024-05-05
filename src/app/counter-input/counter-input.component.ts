import { Component, Input, Renderer2,OnInit, ElementRef,forwardRef, ChangeDetectionStrategy,Directive } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrl: './counter-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CounterInputComponent),
    }
  ],

})
export class CounterInputComponent implements OnInit, ControlValueAccessor {
  disabled: false;

  counter = 0;
  private _renderer: Renderer2;
  private _elementRef: ElementRef;
  @Directive({
    selector: 'input[type="text"]',
  })

  @Input() max: String;
  value:any = "0";

  onChanged:any = () => {};
  onTouched:any = () => {};
  isDisabled: boolean;

  constructor(){
  }

  ngOnInit(): void{
    this.onChanged(this.value);
  }

  decrease(){
    if(this.value !== undefined && this.value > 0){
      this.value--
    }
    this.onChanged(this.value);
  }

  increase() {
    if (typeof this.max === 'undefined') {
      this.value++;
      this.onChanged(this.value);
    } else if (this.value < this.max) {
      this.value++;
      this.onChanged(this.value);
    }
  }
  
  quantityCount(value){
    const numberValue = value;
    this.onChanged(numberValue);
  }

  onChange(){
  }

  writeValue(angularProvidedFunction: any): void {
    this.value = angularProvidedFunction;
  }

  registerOnChange(angularProvidedFunction: any) {
    this.onChanged = angularProvidedFunction;
  }

  registerOnTouched(angularProvidedFunction: any): void {
    this.onTouched = angularProvidedFunction;
  }

  setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
  }
      
}
