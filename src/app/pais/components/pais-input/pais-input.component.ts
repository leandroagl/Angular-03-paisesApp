import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  // Emitir evento
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); // Evento para mostrar sugerencias cuando se deja de escribir

  // Evento input de placeholder, setear en el html con corchetes para enviar esta propiedad
  @Input() placeholder: string = '';

  // Declacarcion de subject, observacle que viene por defecto en rxjs
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  // Se dispara una unica vez, cuando el componente esta inicializado
  ngOnInit(){
    this.debouncer
    .pipe(debounceTime(300))    // operador de rxjs, para esperar 300mseg para escribir la respuesta
    .subscribe(valor => {
      this.onDebounce.emit(valor);
    });
  }



  buscar(){
    this.onEnter.emit(this.termino)
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);

  }
}
