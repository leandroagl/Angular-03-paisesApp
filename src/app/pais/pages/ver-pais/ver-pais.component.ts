import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators'; // Permite recibir un observable y regresar otro observable
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ) { }

  ngOnInit(): void {

    // metodo para obtener el ID en referencia a un pais
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.paisService.getPaisPorAlpha(id)),
      tap(console.log)
    )
    .subscribe ( pais => this.pais = pais);

// metodo para obtener parametro segun el link, id definido en app-routing
  /*   this.activatedRoute.params.subscribe( ({ id }) => {
      console.log(id)

      this.paisService.getPaisPorAlpha(id).subscribe(pais => {
        console.log(pais);
      })
    }) */


  }

}
