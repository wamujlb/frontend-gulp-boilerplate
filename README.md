frontend-gulp-boilerplate
=========================

> An ES6 boilerplate with common frontend tasks using Gulp 4 as build system.

This is a work in progress. Feel free to contribute.


## Install
### Requirements

Node (use brew or install it from [here](http://nodejs.org/download/))

```bash
brew install node
```

Gulp ([Getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started))

```bash
npm install -g gulpjs/gulp-cli#4.0
```

### Clone this repository

*OSX & Linux*

```bash
git clone https://github.com/wamujlb/frontend-gulp-boilerplate
```

*Windows*

```bash
git clone https://github.com/wamujlb/frontend-gulp-boilerplate
```

### Start a new project

```bash
npm init
```

### Install an existing project

Then each time you clone the repo, use (yarn is better and faster):

```bash
yarn install / npm install
```

## Usage

### Tasks

#### Launch it

```bash
gulp dev
```
All the magic begins here:

* process `.html` from `.hbs` files
* process `.css` from `.scss`, `.sass` files
* process `.js` files
* create a server with BrowserSync and automatically run it
* watch changes in `/src` folder
* automatic reload on changes in `/src` folder

#### Make changes

 * Write your `.hbs` code in `/src/templates/` folder
 * Write your `.sass` or `.scss` code in `/src/sass/` folder
 * Write your `.js` code in `/src/js/` folder
 * Add images, fonts, icons, js libraries in `/src/assets` folder

## Licence

MIT
