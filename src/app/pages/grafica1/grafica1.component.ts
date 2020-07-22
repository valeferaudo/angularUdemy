import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1=['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
  public data1 = [[350, 450, 100]];

  public labels2=['Download Buys', 'In-Store Buys', 'Mail-Order Buys']
  public data2 = [[150, 450, 100]];
}
