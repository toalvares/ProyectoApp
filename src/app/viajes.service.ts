// viajes.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  private viajes: any[] = [];

  constructor() {}

  // Agregar un nuevo viaje a la lista
  agregarViaje(nuevoViaje: any) {
    this.viajes.push(nuevoViaje);
    console.log('Nuevo viaje agregado:', nuevoViaje);
  }
  
  // Obtener la lista de todos los viajes
  obtenerViajes() {
    return this.viajes;
  }

  // Obtener la lista de viajes disponibles
  getViajesDisponibles() {
    return this.viajes;
  }
}


