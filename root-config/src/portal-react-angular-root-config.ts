import { LifeCycles, registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import<LifeCycles>(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@portal-react-angular/react-app",
  app: () => System.import<LifeCycles>("@portal-react-angular/react-app"),
  activeWhen: "/",
});

registerApplication({
  name: "@portal-react-angular/angular-app",
  app: () => System.import<LifeCycles>("@portal-react-angular/angular-app"),
  activeWhen: ["/event"],
  customProps: { domElement: document.getElementById("angular") },
});

start();
