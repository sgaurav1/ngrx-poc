import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

interface CmpData{
  cmpId: string,
  cmpName: string,
  cmpMessage: string
}
@Component({
  selector: 'app-component-ref',
  templateUrl: './component-ref.component.html',
  styleUrls: ['./component-ref.component.scss']
})

export class ComponentRefComponent implements OnInit {

  @Input() componentData!: any;
  @Output() getData = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
    console.log(this.componentData);
  }

  setData(value:string){
    console.log(value);
    this.getData.emit(value);
  }

}
