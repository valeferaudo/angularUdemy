import { Component, Input } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {
  @Input('titulo') titulo:string ="Sin titulo"

  @Input('labels') doughnutChartLabels: Label[] = ["label1-defecto","label2-defecto","label3-defecto"]
  @Input('data') doughnutChartData: MultiDataSet =[[50,50,50]]
  public colors : Color[] =[
    {backgroundColor:['#6857E6','#009FEE','F02059']}
  ]

}
