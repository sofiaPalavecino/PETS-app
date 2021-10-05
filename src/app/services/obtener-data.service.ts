import { Injectable } from '@angular/core';
import { Paseador } from "../shared/paseador";
import { Cuidador } from "../shared/cuidador.interface"
import { mascota } from "../shared/mascota.interface"
import { PlanPaseo } from "../shared/plan-paseo.interface";
import { PlanCuidador } from "../shared/plan-cuidador.interface";

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable} from 'rxjs';

import { AuthService } from "../services/auth.service";
import { ContratoPaseador } from '../shared/contrato-paseador.interface';
import { userProfile } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ObtenerDataService {

  constructor(private afs: AngularFirestore,private authSvc: AuthService) { }

  
  
  checkTrabajador(idUsuario:string,tipo:string):Observable<any>{
   
    if(tipo=="paseador"){
      return (this.afs.doc<Paseador>(`${tipo}/${idUsuario}`).get())
    }else{
      return (this.afs.doc<Cuidador>(`${tipo}/${idUsuario}`).get())
    }
    
  }

  
  getTrabajador(idUsuario:string,tipo:string):Observable<any>{
   
    if(tipo=="paseador"){
      return (this.afs.doc<Paseador>(`${tipo}/${idUsuario}`).valueChanges({idField:"docId"}))
    }else{
      return (this.afs.doc<Cuidador>(`${tipo}/${idUsuario}`).valueChanges({idField:"docId"}))
    }
    
  }

  getPlanes(idUsuario:string,tipo:string):Observable<any>{
   
    if(tipo=="paseador"){
      return this.afs.collection<PlanPaseo>(`${tipo}/${idUsuario}/plan${tipo}`).valueChanges({idField:"docId"});
    }
    else{
      console.log(`${tipo}/${idUsuario}/plan${tipo}`)
      return this.afs.collection<PlanCuidador>(`${tipo}/${idUsuario}/plan${tipo}`).valueChanges({idField:"docId"});
    }
  }

  getMascotas(idUsuario:string):Observable<any>{
    return this.afs.collection<mascota>(`users/${idUsuario}/mascota`).valueChanges({idField:"docId"});
  }

  getUser(idUsuario:string):Observable<any>{
    return this.afs.doc<userProfile>(`users/${idUsuario}`).valueChanges({idField:"docId"});
  }

  async getContratos(idUsuario:string,tipo:string):Promise<any>{
    console.log(idUsuario,tipo);
    return await 
    this.afs.firestore
    .collection(`contrato${tipo}`)
    .where(`id${tipo}`,"==",idUsuario)
    .get().then((querySnapshot)=>{
      let contratos:Array<any> = new Array<any>();
      querySnapshot.forEach(element => {
        contratos.push({
          cantMascotas:element.data()["cantMascotas"],
          estado:element.data()["estado"],
          idCliente:element.data()["idCliente"],
          idMascota:element.data()["idMascota"],
          dias:element.data()["dias"],
          idPaseador:element.data()["idPaseador"],
          planContratado:element.data()["planContratado"],
          fechaContratacion:element.data()["fechaContratacion"],
          docId:element.id
        })
      });
      return contratos;
    });
  }


}