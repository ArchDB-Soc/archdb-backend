# iadb backend

The Integrated Archaeological Database (IADB) enables archaeologists to record details from an excavation and to develop interpretations of what they have found.

The Berkshire Archæological Society, the University of Reading and the York Archaeological Trust have been using IADB 2017. This is likely to be deprecated by 2025.

This project is to help them explore options for developing a new IADB from scratch. Right now it uses sample data.

Feedback is welcome, feel free to get in contact with suggestions.

Find the frontend here: [https://github.com/plabram/iadb](https://github.com/plabram/iadb-frontend)

* This app is built with Node/Express. It connects to MongoDB Atlas using Mongoose.
* MongoDB has been used due to support for geospatial queries. Depsite this, documents are related by ID, meaning they behave similarly to a relational database. Different schema fields have been in use for some time, meaning they are unlikely to change much.
* It's deployed using Render for convenience.
* All database interactions are separated into `repositories`. This means the database can easily be changed (for example, from MongoDB to Postgres), and unit tests can be set up easily.
* Express Rate Limit restricts the number of requests an IP can make for security.
* As well as a Mongo ID, schema Records has a friendlyId. This is so people can easily recognise each Record.
