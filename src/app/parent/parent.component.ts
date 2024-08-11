import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent implements OnInit, OnChanges, OnDestroy {
  public serverElements: object;
  value = 'ramesh';
  name = 'alex';
  username = 'suresh';
  localReferance: 'hello';
  localReferancenNgModel: 'helloTwo';
  checkTwoWayInParent: string;
  @Input() hello: string;
  @Output() serverCreated1 = new EventEmitter<'hello'>();

  valueOutput: string;
  childData = {
    data: '',
    name: '',
    content: '',
  };

  Parentmessage = new FormGroup({
    PUserName: new FormControl(''),
    PMessage: new FormControl(''),
    localReferance: new FormControl(''),
  });

  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }
  getdata(value: string) {
    console.log('🚀 ~ ParentComponent ~ getdata ~ value:', value);
  }

  ngOnInit() {
    console.log('inside app-Parent====>');
    console.log('🚀 ~ ParentComponent ~ value:', this.value);
    console.log('valueOutput', this.valueOutput);
    console.log('localReferancenNgModel', this.localReferancenNgModel);
    this.checkTwoWayInParent = 'alexx';
    console.log(
      '🚀 ~ ParentComponent ~ ngOnInit ~ Two-way Data binding value',
      this.checkTwoWayInParent
    );
  }
  ngOnDestroy() {
    console.log('hello destroy');
  }
  oncheckTwoWAy() {
    console.log(
      '🚀 ~ ParentComponent ~ Two-way Data binding value',
      this.checkTwoWayInParent
    );
  }

  handleChange(event: Event) {
    // console.log("🚀 ~ ParentComponent ~ handleChange ~ event:", event.target as HTMLInputElement).value
    const inputvalue = (event.target as HTMLInputElement).value;
    console.log(
      '🚀 ~ ParentComponent ~ handleChange ~ inputvalue:',
      inputvalue
    );
  }

  afterServerAdded(serverData: {
    data: string;
    name: string;
    content: string;
  }) {
    console.log('Data from child-Inside parent', serverData);
    this.childData = serverData;
  }

  onClickSubmit() {
    console.log('this.Parentmessage.value', this.Parentmessage.value);
    this.serverElements = {
      data: 'Parents',
      name: this.Parentmessage.value.PUserName,
      content: this.Parentmessage.value.PMessage,
    };
  }

  localReferanceCheck(localReferance) {
    //we can access this value through a function parameter only => can't access this value directly via TS file
    console.log('localReferance', localReferance.value);
  }

  checkOnChange() {
    this.serverElements[0].name = this.Parentmessage.value.PUserName;
    console.log('this.serverElements[0].data', this.serverElements[0].name);
  }

  changeMethod(localReferance) {}
}
