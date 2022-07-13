Project stacks:
------------

 * bcryptjs - 2.4.3
 * dotenv - 16.0.1
 * express - 4.18.1
 * express-validator - 6.14.2
 * jsonwebtoken - 8.5.1
 * mongoose - 6.4.4

Project setup stpes:
------------

 * step 1: clone project `git clone `[https://github.com/RuttvikKheni/task-ams.git](https://github.com/RuttvikKheni/task-ams.git)
 * step 2: cd project_folder `cd ./task-ams`
 * step 2: add mongodb connection strirng and jwt token decode string in .env file.
 * stpe 3: Install node modules and run app `npm i && npm run start:dev`
    > Server mostly started at 3000 port in your local.
 * step 4: Import postmen collection and can test APIs.
    > Postmen collection file `AMS.postman_collection_v2.json`.


Project Description:
------------

I created server using express and and use mongodb for manage data.

All module routing is in `./routers/index.js` file and module's routing is in `./routers/[module_name].router.js` file.

All route's controllers is in `./controllers/[module_name].controller.js`.

Created one Oauth middleware for authendicate request as per route access and requested user. Middleware is in `./middlewares/loginOauth.middleware.js`.

Project estimation:
------------

 * 9 hours


Project penddings:
------------

 * comments in code for describe module and route.