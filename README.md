# iadb
Integrated Archaeological Database backend

* This app is built with Node/Express. It connects to MongoDB Atlas using Mongoose.
* MongoDB has been used due to support for geospatial queries. Depsite this, documents are related by ID, meaning they behave similarly to a relational database. Different schema fields have been in use for some time, meaning they are unlikely to change much.
* It's deployed using Render for convenience.
* All database interactions are separated into `repositories`. This means the database can easily be changed (for example, from MongoDB to Postgres), and unit tests can be set up easily.
* Express Rate Limit restricts the number of requests an IP can make for security.