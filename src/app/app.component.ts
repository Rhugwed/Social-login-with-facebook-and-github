import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  

  title = 'angular-fblogin';
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService) { }
  
  

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {

    const oauthScript = document.createElement('script');
    oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';

    document.body.appendChild(oauthScript);  

    if (localStorage.fbToken) {
      this.loggedIn = true;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
    
  }
  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    
    _window().OAuth.initialize('xMYnAMBuy67teQWE4m01YxFOkcg');

    // Popup Github and ask for authorization
    _window().OAuth.popup('github').then((provider) => {

      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        
        console.log('data: ', data);
        alert('Welcome ' + 'Login Successful!!');
      });

      // You can also call Github's API using .get()
      provider.get('/user').then((data) => {
        console.log('self data:', data);
      });
    });
  }
}
