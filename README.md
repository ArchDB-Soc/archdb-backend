# ArchDB (Archeological Database) backend

The Archaeological Database (ArchDB) enables archaeologists to record details from an excavation and to develop interpretations of what they have found.

Various universities and trusts have been using a previous version of similar software. This is likely to be deprecated by 2025. This project is to help them share resources and records to create an integrated database that unifies records into the same common structure, thus allowing for new possibilities in terms of data analysis and modelling.

As an open source project, we welcome contributions from other developers, data scientists and archeologists. Get credentials for ArchDB and see how to contribute [here](https://github.com/plabram/archdb-backend/blob/main/CONTRIBUTIONS.md).

Find the frontend here: [https://github.com/plabram/iadb](https://github.com/plabram/iadb-frontend)

## Notes:
* This app is primarily built with Node/Express/MongoDB/Mongoose, as well as associated packages.
* MongoDB has been used due to support for geospatial queries. Depsite this, documents are related by ID, meaning they behave similarly to a relational database. Different schema fields have been in use for some time, meaning they are unlikely to change much.
* All database interactions are separated into `repositories`.
* As well as a Mongo ID, schema Records has a friendlyId. This is so humans can easily recognise each Record.
* There are 3 main objects in the data model: Sites (grandparent), Sets (parent) and Records (child). The relationship between Sets and Records is flexible and the two can exist independently, however the relationship between Sites and other entities is strongly protected. As such, it's obligatory to add a Site to other records, and deleting a Site will delete all related records. This goes for front and backend.
