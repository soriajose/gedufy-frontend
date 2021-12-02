import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {HttpClientModule} from '@angular/common/http';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule],
  providers: [
    InAppBrowser,
    SocialSharing,
    NativeStorage,
    SplashScreen,
    StatusBar,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
