# Address API Specification

## Create Address API

Endpoint : `POST /api/contacts/:contactId/addresses`

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jl. Laksdya Leo",
  "city": "Ambon",
  "province": "Maluku",
  "country": "Indonesia",
  "postal_code": "95673"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Laksdya Leo",
    "city": "Ambon",
    "province": "Maluku",
    "country": "Indonesia",
    "postal_code": "95673"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : `PUT /api/contacts/:contactId/addresses/:addressId`

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jl. Laksdya Leo No.10",
  "city": "Ambon",
  "province": "Maluku",
  "country": "Indonesia",
  "postal_code": "95673"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Laksdya Leo No.10",
    "city": "Ambon",
    "province": "Maluku",
    "country": "Indonesia",
    "postal_code": "95673"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : `GET /api/contacts/:contactId/addresses/:addressId`

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Laksdya Leo",
    "city": "Ambon",
    "province": "Maluku",
    "country": "Indonesia",
    "postal_code": "95673"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Endpoint : `GET /api/contacts/:contactId/addresses`

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl. Laksdya Leo",
      "city": "Ambon",
      "province": "Maluku",
      "country": "Indonesia",
      "postal_code": "95673"
    },
    {
      "id": 2,
      "street": "Jl. Laksdya Leo",
      "city": "Ambon",
      "province": "Maluku",
      "country": "Indonesia",
      "postal_code": "95673"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : `DELETE /api/contacts/:contactId/addresses/:addressId`

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact or Address is not found"
}
```
