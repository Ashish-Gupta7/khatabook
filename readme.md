## day 1
1. create MVC pattern folder and files.
2. in views folder -->
   - create partials folder (header and footer ejs code)
   - create index page(login page)
   - create register page
3. in app.js -->
   - require express, path.
   - set view engine
   - create middlewares --> public, code for form's data in readable form
   - get request --> render index and register page.
   - connect to the server on port "process.env.PORT || 3000"