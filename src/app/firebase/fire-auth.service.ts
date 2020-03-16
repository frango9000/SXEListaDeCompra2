import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  public email = '';
  public name = '';
  public authUser = null;

  constructor(public fireAuth: AngularFireAuth) {
  }

  user: Observable<User | null> = this.fireAuth.authState.pipe(map(authState => {
    console.log('authState: ', authState);
    if (authState) {
      this.authUser = authState;
      return authState;
    } else {
      return null;
    }
  }));


  register(email: string, name: string, pass: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, pass)
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
    return this.fireAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(response => {
        console.log('User login: email: ', response);
        this.authUser = response.user;
        this.email = this.authUser.email;
        this.name = this.authUser.displayName;
      });
    // .catch(error => {
    //   console.log('Error iniciando sesion', error);
    //   return throwError(error);
    // });
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }
}
