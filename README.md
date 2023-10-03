# iadb
Integrated Archaeological Database backend

* This app is built with Node/Express. It connects to Mongo Atlas (cloud database) using Mongoose.
* It's deployed using Fly.io for convenience (as the fontend will also be deployed here). The Dockerfile, .dockerignore and fly.toml are associated with Fly.io so to deploy elsewhere just delete them.
* All database interactions are separated into `repositories`. This means the database can easily be changed (for example, from Mongo to Postgres), and unit tests can be set up easily.

To reduce maintenance a minimum of external packages have been used. They are modular, meaning you could delete them and while the extra functionality would disappear, everything else would keep running: 
* `dotenv` manages environment variables. They are stored in `.env`, which is not uploaded publicly. If you need to know what the variables are, there's a list of what you need to ask for in `.env.dist` ;-)
* Express Rate Limit restricts the number of requests an IP can make for security.