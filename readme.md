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

## day 3 ( DEBUG & set env variables )
### DEBUG

`debug ka use hum isliye karte hain taaki hume har jagah console.log na karna pade. kyuki console.log ke apne nuksan hai yadi hum log krke chhod dete hai to wo browser pr dekha ja skta hai, jo hum nhi chahte hai.`

1. install
   ```
   npm i debug
   ```

2. require debug where you want to use this.
3. hum debug ko kuchh aise set krte hai
   ```
   const dbgr = require("debug")("development:mongoose");
   ```
   I `require("debug")` 
   - iski madad se debug ko require kr rhe hai. 
   - Jab aap debug ko require karte hain, to aapko ek function milta hai jo aapko namespaces create karne mein help karta hai.

   II `("development:mongoose")` 
   - debug function call karke ek specific namespace banaya ja raha hai. Is example mein namespace hai "development:mongoose".
   - Namespace ka matlab hai ki aap apni application ke different parts ke liye different identifiers bana sakte hain. Isse aap selectively debug messages dekh sakte hain.
   - "development:mongoose" namespace yeh batata hai ki yeh debugging messages development environment ke mongoose related operations ke liye hain.
   - app "development:mongoose" iski jagah kuchh bhi likh skte hai ye sirf ek value hai, jise hum env variables ki madad se set krte hai.

   III `const dbgr`
   - dbgr ek constant variable hai jo debug("development:mongoose") ke return value ko store kar raha hai.
   - Is variable ko use karke aap apni application ke specific parts me debugging messages likh sakte hain.

4. Benefits
   - Aap specific namespaces ko target kar sakte hain aur unke debugging messages dekh sakte hain.
   - Code clean aur organized rehta hai.
   - Production me unwanted console.log statements avoid kar sakte hain.

### Environment Variables ka use karke debug value set karna
1. Why:
   - `Selective Debugging:` Environment variables ka use karke aap specific debugging namespaces ko enable/disable kar sakte hain bina code ko change kiye.
   - `Production Safety:` Aap production environment me unnecessary debugging messages ko avoid kar sakte hain.
   - `Flexibility:` Alag-alag environments (development, testing, production) ke liye different debug settings configure kar sakte hain.

2. How:
Env variables set krne ke do tareeke hai --> 
   - .env file ki madad se.
   - DEBUG=development:mongoose environment variable set kar raha hai jisse development:mongoose namespace enable ho jata hai.

`Abhi hum 2nd method dekhege`
Aap environment variables ko apne operating system ke level pe bhi set kar sakte hain. Yeh permanent nahi hote, sirf current session ke liye active rehte hain.

- Linux/Mac/base terminal:
  ```
  // Set command
  export DEBUG=development:mongoose
  ```

  ```
  // Verify command
  echo $DEBUG
  ```

- Windows (Command Prompt(cmd)):
  ```
  // Set command
  set DEBUG=development:mongoose
  ```

  ```
  // Verify command
  echo %DEBUG%
  ```

- VS Code Terminal (PowerShell):
    ```
  // Set command
  $env:DEBUG="development:mongoose"
  ```

  ```
  // Verify command
  echo $env:DEBUG
  ```

`Yaha "DEBUG" ek variable hai jiski value "development:mongoose" hai.`

`Agar aap chahte hai ki DEBUG varibale ki value "development:" se start hone wale sabhi values ho to aap "development:mongoose" me mongoose ki jagah pr "*" laga skte hai.`

` jab aap command line pe environment variables set karte hain to woh session-specific hote hain, yaani jab aap terminal ya VS Code close kar dete hain to woh environment variables delete ho jate hain. Agar aap chahte hain ki environment variables persist (permanent) rahen har session ke liye, to aapko kuch additional steps lene padenge.`

## day 4 ( create user, login user... )
1. create post method for /register route.
2. create user
3. incrypt password (bcrypt)
4. set token (jwt)
5. create post method for /login route.
6. create isLoggedIn function.
7. logout route

## day 5
1. create profile page
2. when you trying to login, if you loggedIn successfully then redirect the profile page
3. create profile route using get method
4. in userSchema(go to user-model.js file) in password field add
   ```
   select: false
   ```
   jab bhi hum user ko login karege to humara password field show nhi hoga.
5. create hisab-model and hisab-router
6. require hisab-router in app.js