import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {auth, User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  userDetails = {
    uid: null,
    displayName: null,
    email: null,
    emailVerified: null,
    isAnonymous: null,
    creationTime: null,
    lastSignInTime: null,
    photoURL: null,
    providerId: null,
    providerData: null,
  };

  constructor(public angularFireAuth: AngularFireAuth) {
  }

  authState: Observable<User | null> = this.angularFireAuth.authState.pipe(map(authState => {
    // console.log('authState: ', authState);
    if (authState) {
      this.userDetails.uid = authState.uid;
      this.userDetails.displayName = authState.displayName;
      this.userDetails.email = authState.email;
      this.userDetails.emailVerified = authState.emailVerified;
      this.userDetails.isAnonymous = authState.isAnonymous;
      this.userDetails.creationTime = authState.metadata.creationTime;
      this.userDetails.lastSignInTime = authState.metadata.lastSignInTime;
      this.userDetails.photoURL = authState.photoURL;
      this.userDetails.providerId = authState.providerId;
      this.userDetails.providerData = authState.providerData;
      return authState;
    } else {
      this.userDetails.uid = null;
      this.userDetails.displayName = null;
      this.userDetails.email = null;
      this.userDetails.emailVerified = null;
      this.userDetails.isAnonymous = null;
      this.userDetails.creationTime = null;
      this.userDetails.lastSignInTime = null;
      this.userDetails.photoURL = null;
      this.userDetails.providerId = null;
      this.userDetails.providerData = null;
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

  googleLogin() {
    return this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
