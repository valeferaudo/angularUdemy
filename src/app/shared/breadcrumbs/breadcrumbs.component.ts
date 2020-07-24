import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo : string;
  public obsTitulo$ : Subscription;

  constructor(private router:Router) {

    this.obsTitulo$ = this.getArgumentosRuta()
                    .subscribe(data=>{
                            this.titulo=data.titulo;
                            document.title=`AdminPro-${this.titulo}`
                          })
   }
   ngOnDestroy(){
     this.obsTitulo$.unsubscribe();
   }

   getArgumentosRuta(){
    return this.router.events.pipe(filter(event => event instanceof ActivationEnd),
    filter((event: ActivationEnd)=>event.snapshot.firstChild===null),
    map((event:ActivationEnd)=> {return event.snapshot.data}));
   }

}
