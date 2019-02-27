# Light Admin

**Light Admin** is an a lightweight bootstrap 3.x admin panel template.

### Color themes
* Default (purple)
* Blue
* Red
* Turquoise
* Yellow

### Pages
* Dashboard
* Charts
* Tables
* Forms
* General UI Elements
* Panels
* Tabs and Accordions
* Buttons
* Modals
* Notifications
* Typography
* Icons
* Grid
* Blank page
* 404 Page
* Login
* Sign Up
* Forgot Password
* Profile
* Calendar

### Widgets
* Scroll-to-top button
* Chat
* Todo-list

## Credits

### Core components
* Bootstrap 3.3.7 - https://getbootstrap.com
* jQuery 3.3.1 - https://jquery.com/
* OverlayScrollbars - https://kingsora.github.io/OverlayScrollbars
* Themify Icons - https://themify.me/themify-icons

### Plugins
* Datatables - https://datatables.net
* Chart.js - https://www.chartjs.org
* Select2 - https://select2.org
* Awesome bootstrap checkbox - https://github.com/flatlogic/awesome-bootstrap-checkbox
* Moment - https://momentjs.com
* Bootstrap Datetimepicker - https://eonasdan.github.io/bootstrap-datetimepicker/
* Bootstrap Notify - http://bootstrap-notify.remabledesigns.com/
* Fullcalendar - https://fullcalendar.io/

## Directory Structure

```
light-admin.zip
   ├── dist         # Complete distribution with all demo content
   ├── docs         # Documentation
   └── src          # Sources
     ├── less       # LESS source files
     └── js         # JavaScript source files
```

## Getting Started

### Basic Setup
   
This is the quickest way to setup the template, you just have to copy the `dist/assets` directory and `blank.html` into your project root directory and start working on the `blank.html` file.

**Important!**
Using this method you'll need to add your custom styles in a different css file, to avoid losing changes when you update the template.
   
Be sure to include the essentials scripts in your document to get things work properly. After that you're ready to start building.

This method is perfect if you think you are not going to make several changes to the original version and use it "as is", otherwise we suggest to use one of the following methods.

### Using GULP

#### Install Node & Gulp

1. Be sure to have the latest version of [Node.js](https://nodejs.org/) installed & running in your computer. We are going to use [npm](https://www.npmjs.com/) that comes with Node.js installation.
2. In your terminal go to the root directory with `cd` command and then enter the following commads to install the project dependencies:
```
npm install
```

To update dependencies, run `npm update` and then run `gulp copy` to copy the updated dependencies into the `dist/assets/vendor` directory.

#### Available Tasks

After install dependencies now you can run the automated taks, here are the available commands: 

* `gulp` The default task will compile the LESS and JS into the `dist` directory and minify the output, and it will copy all vendor libraries from `node_modules` into the `dist/assets/vendor` directory.
* `gulp dev` The dev task will serve up a local version of the template and will watch the LESS and JS files for changes and reload the browser window automatically.


* `gulp less` Less compiler task.
* `gulp js` Copy JS into the dist directory.
* `gulp minify-css` A CSS minifier task.
* `gulp minify-js` A JS minifer task,
* `gulp copy` Copy vendor libraries to dist directory

## Changelog

##### Version 1.0.0 - 17 Dec 2018
* Initial Release