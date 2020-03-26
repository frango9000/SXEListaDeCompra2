import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserInfo} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(public angularFireAuth: AngularFireAuth) {
  }

  userState: BehaviorSubject<UserDetails | null> = new BehaviorSubject<UserDetails | null>(null);

  authState: Observable<User | null> = this.angularFireAuth.authState.pipe(
    tap(authState => {
      if (authState) {
        this.userState.next({
          uid: authState.uid,
          displayName: authState.displayName,
          email: authState.email,
          emailVerified: authState.emailVerified,
          isAnonymous: authState.isAnonymous,
          creationTime: authState.metadata.creationTime,
          lastSignInTime: authState.metadata.lastSignInTime,
          photoURL: authState.photoURL,
          providerId: authState.providerId,
          providerData: authState.providerData,
        });
      } else {
        this.userState.next(null);
      }
    })
  );


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

export interface UserDetails {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  creationTime: string | undefined;
  lastSignInTime: string | undefined;
  photoURL: string | null;
  providerId: string;
  providerData: (UserInfo | null)[];
}
