# Restfull API Contact Management (NodeJS, ExpressJS, PostgreSQL and Docker)
## User Management Requirement

1. User Data
   - Username
   - Password
   - Name

2. User API
   - Register User
   - Login User
   - Update User
   - Get User
   - Logout User

## Contact Management Requirement

1. Contact Data
   - First Name
   - Last Name
   - Email
   - Phone

2. Contact API
   - Create Contact
   - Update Contact
   - Get Contact
   - Search Contact
   - Remove Contact

3. Contact Address Data
   - Street
   - City
   - Province
   - Country
   - Postal Code

4. Address API
   - Create Address
   - Update Address
   - Get Address
   - List Address
   - Remove Address

## Clone Project

```
git clone https://github.com/mazufik/restful-api-contact-management.git

cd restful-api-contact-management

docker-compose up -d
```

## Setup Database
- Create new database example db_contact
- Rename file .env.example to be .env
- Setting database user, database password and database name on file .env

## Migrations Model
```
npx prisma migrate dev
```

## Run Project

```
npm run dev
```

## Run Unit Test
```
npm run test
```

## API Documentation
```
http://127.0.0.1:5000/api-doc
```
