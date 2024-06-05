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
- .env File ka Use:
  Yeh sabse simple aur recommended method hai. .env file me environment variables define kar ke aur dotenv package ka use karke aap har baar jab apni application run karenge to yeh variables load ho jayenge. ise hum aage padhege.

- VS Code Integrated Terminal me Persist karna:
  VS Code me aap workspace settings ya terminal profile settings me bhi environment variables set kar sakte hain. pr ye recommended method nhi hai. isliye hum sirf aage .env se hi permanent env variable ko set karege.

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

## day 6
### Data Association
`MongoDB me data association ka matlab hai alag-alag collections ke beech relationship establish karna. Iske do main methods hain: embedding aur referencing.`

1. Mongoose ek ODM (Object Data Modeling) library hai jo hume JavaScript objects ko MongoDB documents me map karne ki suvidha deti hai.

2. for example -> 100 user hai aur inn 100 users ke 1000 posts hai ab hume nhi pta hai ki konsa post kis user ka hai ya kis user ne konsa post likha hai, mtlb ye kah skte hai ki user aur post ko ek dusre ke baare me pta nhi hai. lekin user ko pta hona chahiye ki usne kitne aur konse post lekhe hai to iske liye hi relationships ko concept kaam aata hai.

3. Relationships manage karne ke do tareeke hain: Embedding aur Referencing. Dono ka apna-apna use case hota hai.

#### Embedding(Denormalization)
`for example humare paas ek user model hai jisme ek posts field hai aur usi field me har ek post ka data rakha gya hai aur koi alag se file/model banane ki jarurat nhi padti hai embedding ke case me.`

`hum ek hi model me user se related information aur post se related information ke liye alag alag schema banate hai aur phir post schema ko user schema me embed kr dete hai.`

```
const mongoose = require('mongoose');

// Post schema
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [postSchema] // Embedding posts within user document
});

const User = mongoose.model('User', userSchema);
```

- Advantages of This Approach:
  1. Simpler Model: Aapko sirf ek user model maintain karna hota hai jisme posts embedded hain.
  2. Faster Reads: Ek hi document me sab data hone se reads faster hoti hain.
  3. Simpler Queries: Related data ko retrieve karna simple hota hai.

- Disadvantages of This Approach:
  1. Document Size Limit: Agar ek user ke posts bohot zyada ho gaye to MongoDB document size limit (16MB) cross kar sakti hai.
  2. Update Complexity: Agar posts frequently update hote hain to updating nested arrays thoda complex ho sakta hai.
  3. Data Redundancy: Same data multiple documents me store hone se storage inefficient ho sakti hai.

`Embedding ka use tabhi karein jab aapko related data ko frequently ek saath access karna ho aur aapka data ka size manageable ho. Ye approach simpler aur faster queries provide karta hai, lekin aapko document size aur update complexities ko dhyan me rakhna padta hai.`

#### Referencing (Normalization)
`for example humare paas ek user model hai jisme ek posts field hai, yaha hum post field ke liye ek alag se post schema banayege aur wahi hum posts ko likhege.`

`ab kis user ne konsa post likha hai ya konsa post kis user ka hai isske liye hum jab hum post ya user create krte hai to inke sath ek _id key banti hai aur isi ki madad se hum post ka reference user ke posts field me likhte hai aur isi tarah post ke ander ek user field hogi jisme hum user ki _id ko likhte hai, aur aisa krne se post kisne likha hai uss user ke baare me pta chalta hai aur user ko bhi pta hota hai ki usne konsa ya kitne posts likhe hai.`

- Advantages of Referencing:
1. Data Independence: Different collections me data store hone se aap inhe independently manage kar sakte hain.
2. Avoid Document Size Limit: Large datasets ke liye document size limit ka issue nahi hota.
3. Flexibility: Related data ko references ke through manage karna flexible hota hai.

- Disadvantages of Referencing:
1. Slower Reads: Multiple collections se data retrieve karne ke liye joins required hote hain, jo reads ko slow kar sakte hain.
2. Complex Queries: Queries thodi complex ho sakti hain kyunki aapko populate aur joins use karne padte hain.
3. Data Consistency: References maintain karna data consistency ensure karne ke liye zaruri hota hai.

`Referencing ka use tab karein jab aapke data ka size large ho aur aapko related data ko independently manage karna ho. Ye approach flexibility aur scalability provide karta hai lekin reads thodi slow ho sakti hain aur queries complex ho sakti hain.`

### problem when you trying to login -->
- `question:` Jab bhi mai naya user create krne ke baad uss user ko login krne ki kosis krta hu to browser me "data and hash arguments required" msg milta hai, user login nhi ho pata hai, aur jab mai bcrypt ko compare krte samay hash ko check krta hu to jo hashed password database se aana chahiye wo nhi aata hai mtlb terminal me undefined print ho rha hai, aur yadi mai userSchema me password field se "select: false" ko remove kr du tb user login ho jata hai, to question ye hai ki "select: false" ko use krte hue user login kaise kare?

- `answer:` login route me jab aap user find krte hai tb usi samay niche likhe code ko user ko find krne wali line ke last me likh de. 
  ```
  .select('+password');
  ```
  example
  ```
  let user = await userModel.findOne({email}).select('+password');
  ```

## day 7
1. create login-middleware.js file in middleware folder and move here isLoggedIn middleware and exports.
2. in hisab-router and index router require isLoggedIn middleware.
3. create new hisab(method post).

## day 8
1. create new hisab aur hisab ko pata hona chahiye ki usey kis user ne banaya hai aur user ko bhi pata hona chahiye ki usne kya hisab banaya hai.
2. hisab ko user ke baare me pata ho iske liye ->
   ```
   user: req.user.id
   ```
   jo ki hisab me likha gaya hai.
3. ab user ne konsa hisab banaya hai wo user ko pata hona chahiye iske liye ->
   ```
    let user = await userModel.find({email: req.user.email});
    user.hisab.push(hisab._id);
    await user.save();
   ```
isme hum phle isLoggedIn ki madad se req.user.email se user ka data nikalte hai jise user variable me store kr lete hai.
iske baad uss user ke hisab array me humne jo abhi naya hisab banaya hai usey uski id ko push kr dete hai, mtlb hisab data ka reference user ke paas bhej dete hai.
aur kyuki mongoose by default se kabhi nhi sochta hai ki hum direct schema me kuchh push kr skte hai wo sochta hai ki hum humesha data update krne ke liye findOneAndUpdate ka hi use karege isliye hume alag se user.save() likhne ki jarurat padti hai.
4. find loggedIn user
```
router.get("/profile", isLoggedIn, async (req, res) => {
    console.log(req.user);
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("hisab");

    res.render("profile", { user });
});
```
yaha .populate("hisab") ka mtlb hai ki jo bhi id hisab array ke ander likhi ho usey populate kr do mtlb uska data show kr do na ki id ko dikhao.
5. add timestamps at hisab-model 
   ```
   const hisabSchema = mongoose.Schema({
    // data
   }, { timestamps: true });
   ```
aisa karne se hisab kab bana tha aur kab update hua tha ye dono pata chalege.

## day 9
### dotenv
`dotenv package ka use environment variables ko manage karne ke liye hota hai. Yeh environment variables ko .env file se load karta hai aur aapke Node.js application ke process environment me add karta hai.`

1. installation
   ```
   npm install dotenv
   ```
2. Create a .env file
   ```
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/mydatabase
   SECRET_KEY=supersecretkey
   ```
3. Load the .env file in your application
   ```
   // Import dotenv package
   require('dotenv').config();
   ```
4. Access environment variables in your application
   ```
   require('dotenv').config();

   // Access environment variables
   const PORT = process.env.PORT || 3000;
   const dbURL = process.env.DATABASE_URL;
   const secretKey = process.env.SECRET_KEY;
   ```
#### `Benefits:`
- Security: Sensitive information (jaise API keys, database credentials) ko codebase me hardcode karne ki jagah .env file me store karte hain.
- Configuration: Different environments (development, testing, production) ke liye alag-alag configuration rakhi ja sakti hai.
- Maintainability: Code me configuration values hardcode na karne se code zyada maintainable aur portable hota hai.

### create new middleware function in login-middleware.js redirectIfLogin
`iska use ye hoga ki yadi user already login hai to uske browser pr token to save hoga hi to hum usi ki madad se usey direct hi profile page pr bhej dege.`
1. create
   ```
   const redirectIfLogin = (req, res, next) => {
    if(req.cookies.token) {
        res.redirect("/profile");
    } else next();
   }
   ```
2. export
   ```
   module.exports.isLoggedIn = isLoggedIn;
   module.exports.redirectIfLogin = redirectIfLogin;
   ```
3. import -> jise use krna hai usey import kare.
   ```
   const { isLoggedIn } = require("../middlewares/login-middleware");
   ```
4. use
   ```
   router.get("/", redirectIfLogin, (req, res) => {
    res.render("index");
   });
   ```
5. jo env set kiye hai unke naam/key ko .env.example me likh de.

### add logout button in "./views/partials/header.ejs"

### problem -> 
`mujhe home, create new hisab aur logout ye sab jab mai login page register page me bhi dekh skta hu lekin mai aisa nhi chahta hu to iske liye mai register aur login page ko render krte samay unke sath "linksNotAllowed: false" bhi bhej dunga aur ejs me condition laga duga`
```
<% var linksNotAllowed = typeof linksNotAllowed !== 'undefined' ? linksNotAllowed : true %>
<% if(linksNotAllowed) { %>
    <ul class="flex gap-6">
        <li><a href="">Home</a></li>
        <li><a href="">Create New Hisab</a></li>
        <li><a class="text-red-600" href="/logout">Logout</a></li>
    </ul>
<% } %>
```

## day 10
in place of res.send(errors) in simple formate, instead of this you can use connect-flash.
   - to use connect-flash =>
     > express-session in app.js
     > connect-flash in app.js
     > send error/warning... in ejs
     > and redirect page
