import themes from 'devextreme/ui/themes';
import {provideHttpClient} from "@angular/common/http";
import {bootstrapApplication} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app-routing";


themes.initialized(() => {
  // platformBrowserDynamic().bootstrapModule(AppModule)
  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      provideHttpClient(),
      provideRouter(routes)
    ]
  }).catch(err => console.error(err));
});
