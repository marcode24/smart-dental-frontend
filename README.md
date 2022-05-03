# Smart Dental Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6

## Get started

### Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Angular CLI](https://angular.io/cli)

### Clone the repo

```shell
git clone https://github.com/marcode24/smart-dental-frontend
cd smart-dental-frontend
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works.

```shell
npm install
ng serve -o
```

Shut it down manually with `Ctrl+C`

## Environments

| Name       | URL                                      | PORT |
| ---------- | ---------------------------------------- | ---- |
| Localhost  | [localhost](http://localhost:4200)       | 4200 |
| Production | [www.domain.com](https://www.domain.com) |

## Folder Structure

    .
    ├── src
    │ ├── app                 # Source code application
    │ │ │── auth              # Module for auth feature
    │ │ ├── core              # Module as Singleton
    │ │ │ ├── components
    │ │ │ ├── enums
    │ │ │ ├── guards
    │ │ │ ├── interceptors
    │ │ │ ├── interfaces
    │ │ │ ├── models
    │ │ │ ├── services
    │ │ │ └── utils
    │ │ ├── features          # Module for features which compose the application
    │ │ ├── shared            # Module for components shared between application modules
    │ │ │ ├── components
    │ ├── assets              # Styles, images, icons, fonts etc
    │ ├── environments        # Config by environment (localhost and production)
    │ └── styles              # Global styles
    └── README.md
