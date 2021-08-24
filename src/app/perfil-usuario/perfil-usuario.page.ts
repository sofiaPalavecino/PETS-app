import { Component, OnInit, Input, Renderer2, HostListener } from '@angular/core';
import {DomController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';




@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})


export class PerfilUsuarioPage {
  user:any;

  
  constructor(
    private afs: AngularFirestore, 
    private aServ:AuthService, 
    private userServ: UserService, 
    private popController: PopoverPerfilComponent) {
   
  }

  async ngOnInit(){
  }

<<<<<<< HEAD
  /*goToTarget(categoria:string){
    if(categoria=="Cuidados"){
      console.log("a")
    }
  }*/
=======
  goToTarget(categoria:string){
    if(categoria=="Cuidados"){
      console.log("a")
    }
  }
>>>>>>> 209f0c41e0f66c83c8e1142b7cbb4f138590e5f5


  
}
