import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  uid: string = null;

  constructor(public angularFireAuth: AngularFireAuth) {
  }

  user: Observable<User | null> = this.angularFireAuth.authState.pipe(map(authState => {
    // console.log('authState: ', authState);
    if (authState) {
      this.uid = authState.uid;
      return authState;
    } else {
      this.uid = null;
      return null;
    }
  }));


  register(email: string, name: string, pass: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(result => {
        console.log('Usuario creado: ', result);
        return result.user.updateProfile({
          displayName: name
        });
      });
    // .catch(error => {
    //   console.log('Error creando usuario', error);
    //   throwError(error);
    // });
  }

  login(email: string, pass: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(response => {
        console.log('User login: email: ', response);
      });
    // .catch(error => {
    //   console.log('Error iniciando sesion', error);
    //   return throwError(error);
    // });
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }
}
