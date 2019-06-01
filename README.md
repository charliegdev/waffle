# Waffle

<!-- TOC -->

- [Functionalities](#functionalities)
  - [Add](#add)
  - [Delete](#delete)
  - [Move Task to Another Column](#move-task-to-another-column)
  - [Data Preservation](#data-preservation)
- [Upcoming Functionalities](#upcoming-functionalities)
- [Tech](#tech)
- [Naming](#naming)

<!-- /TOC -->

Waffle is a Kanban board web app, implemented as a client-side React-Redux application.

The application is still under active development; new functions are constantly being built.

## Functionalities

### Add

![new-task](screenshots/new-task.gif)

### Delete

![delete-task](screenshots/delete.gif)

### Move Task to Another Column

![move-task](screenshots/move.gif)

### Data Preservation

Data is saved, so nothing is lost after refresh or server restart:

![save-tasks](screenshots/save.gif)

## Upcoming Functionalities

Since the project is still in a very early stage, lots of functionalities are awaiting design and implementation, including these, in the order of priority:

1. Reordering tasks
1. Clicking on the task to open a modal dialog
1. User login/logout
1. Guest mode
1. Support for multiple projects
1. Email notification
1. A decoupling between projects and users, so:
   - A project can have multiple users
   - A user can own, view and subscribe to multiple projects

Besides new features, new tests should be written as well:

1. Redux unit tests
1. [Cypress integration tests](https://www.cypress.io/)

## Tech

This section is about the technology used to develop the application.

- [React](https://reactjs.org/) as the view library.
- [Redux](https://redux.js.org/) as the state container.
- [Segment Evergreen](https://evergreen.segment.com/) & [Blueprint](https://blueprintjs.com/) as the React component libraries. All the components in Waffle are built based on Evergreen UI and Blueprint.
- [CSS Module](https://github.com/css-modules/css-modules) & [SCSS](https://sass-lang.com/) as the styling solution.
- [JSDoc and VS Code TypeScript service](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html) as an opt-in static type checker.
- [JSON Server](https://www.google.com/search?client=firefox-b-d&q=JSON+Server) as a temporary REST API server.
- Other libraries:
  - axios
  - React Router DOM
  - ESLint
  - Jest

I plan to use these technologies in future developments:

1. [Cypress](https://www.cypress.io/) in integration testing. At this point, the application is big enough to have meaningful automated integration test, so I think it's a great idea to start writing tests alongside development, instead of waiting for the application to get much larger and introduce regression bugs without knowing.
1. One of [Python Flask](http://flask.pocoo.org/) or [PHP Laravel](https://laravel.com/) is what I planned to use as the server technology. Right we I'm using JSON Server which is fine for storing, modifiying and retrieving tasks; however, to do anything substantial on the server side, I'll need a real server technology, and both Flask and Laravel are something I would like to try.

## Naming

Its name happens to clash with another [now-closed Kanban board app](https://www.cypress.io/) with the same name. When I thought of the name "Waffle", the aforementioned Waffle application was already closed and I wasn't aware of its existence. I don't have a plan to monetize from this product; but if I do one day, I will probably give the application an external product name to avoid potential legal hassle.
