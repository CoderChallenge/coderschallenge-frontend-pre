import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-loading',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() loading = false;
  @Input() btnClass: string;
  @Input() loadingText = 'Please wait';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
