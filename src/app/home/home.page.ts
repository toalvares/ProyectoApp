import { Component } from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController, private anim: AnimationController) { }

  animarTransaccion(index: number) {
    const elemento = document.querySelectorAll(".Animacion")[index] as HTMLElement;

    if (elemento) {
      const animacion = this.anim.create()
        .addElement(elemento)
        .duration(600)
        .iterations(2)
        .keyframes([
          { offset: 0, transform: "translateX(-3px)" },
          { offset: .5, transform: "translateX(3px)" },
          { offset: 1, transform: "translateX(0px)" },
        ]);

      animacion.play(); // Ejecuta la animación
      
    }
  }

  navigateToPasajero() {
    this.navCtrl.navigateForward('/pasajero');
  }

  navigateToConductor() {
    this.navCtrl.navigateForward('/conductor');
  }

  
}

