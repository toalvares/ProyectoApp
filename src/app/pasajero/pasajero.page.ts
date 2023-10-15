import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ViajesService } from '../viajes.service';
import { Platform } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage {
  
  viajes: any[] = [];

  constructor(private platform:Platform, private zone: NgZone) {}

  @ViewChild('map') mapElement: ElementRef | undefined;
  public map: any;
  public start: any = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";
  public end: any = "Pomaire";
  public latitude: any;
  public longitude: any;
  public directionsService: any;
  public directionsDisplay: any;
  public autocompleteItems: any;

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.initMap()
    })
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response: any, status: string) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // async getLocation() {
  //   const position = await Geolocation.getCurrentPosition();
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;
  //   this.initMap();
  // } 

  updateSearchResults() {
    let GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end == '') {
      this.autocompleteItems = [];
      return;
    }
    GoogleAutocomplete!.getPlacePredictions({ input: this.end },
      (predictions: any, status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction: any) => {
            this.autocompleteItems!.push(prediction);
          });
        });
      });
  }
  selectSearchResult(item: any) {
    this.end = item.description
    this.autocompleteItems = []
    this.initMap()
  }


  
}


  // ionViewWillEnter() {
  //   // Obtener la lista de viajes disponibles del servicio
  //   this.viajes = this.viajesService.obtenerViajes();
  // }

  // contactarConductor(telefono: string) {
  //   // Aquí puedes implementar la lógica para contactar al conductor
  //   // Puedes abrir una aplicación de llamadas o enviar un mensaje, por ejemplo
  //   console.log('Contactando al conductor con el teléfono:', telefono);
  // }





