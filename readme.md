## day 1
1. create MVC pattern folder and files.
2. inside .gitignore => 
   - node_modules
   - .env
   (Because i don't want to commit these files or folders)
3. in views folder -->
   - create partials folder (header and footer ejs code)
   - create index page(login page)
   - create register page
4. in app.js -->
   - require express, path.
   - set view engine
   - create middlewares --> public, code for form's data in readable form
   - get request --> render index and register page.
   - connect to the server on port "process.env.PORT || 3000"

## day 2
1. simpler pattern of user-model is converted into detailed pattern.
2. create index router and push all "/" router. require in app.js and set middleware for "/" router.
3. remove db connection from user-model and create mongoose-connection.js file in config folder.
4. connect mongodb with mongoose in mongoose-connection.js file and require in app.js