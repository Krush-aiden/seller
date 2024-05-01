import {
  AfterContentInit,
  Component,
  ContentChild,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  // encapsulation: ViewEncapsulation.None //it is used to used a Global Css change in any label or paragraph <p>
})
export class ChildComponent implements OnInit, OnChanges,OnDestroy,DoCheck, AfterContentInit {
  @Input('srvElement') element: { data: string; name: string; content: string };
  // @Input() value: string;
  @Input() onChangeReferanceValue: string; //we can use this to change a value from parent component & update it in the child directly
  @Input() ngModelReferanceValue: string;
  @ContentChild('afterContentInitValue') afterContentInitValue : any;

  @Output() serverCreated = new EventEmitter<{
    data: string;
    name: string;
    content: string;
  }>();
  currentValue;
  previousValue;
  interval: any;
  ngModelcurrentValuecheck: any;
  counter = 0;
  ViewChildValue;
  Childmessage = new FormGroup({
    PUserName: new FormControl(''),
    PMessage: new FormControl(''),
  });

  @ViewChild('viewChildContent', { static: true }) viewChildContent;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges', changes);
    this.currentValue = changes.onChangeReferanceValue?.currentValue;
    this.previousValue = changes.onChangeReferanceValue?.previousValue;    
  }

  ngDoCheck(){
    this.ngModelcurrentValuecheck = this.ngModelReferanceValue;
  }

  ngOnInit() {
  }

  afterServerAdded1(serverData: any) {
  }

  onClickChildSubmit() {
    this.serverCreated.emit({
      data: 'Child',
      name: this.Childmessage.value.PUserName
        ? this.Childmessage.value.PUserName
        : 'hello',
      content: this.Childmessage.value.PMessage
        ? this.Childmessage.value.PMessage
        : 'content',
    });
  }
  ngAfterContentInit(){
  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }

}
