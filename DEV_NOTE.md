API List

### Get Inbox

- Method: GET
- URL: /api/mail/:email
- Query:
  - email: string

### Get Email

- Method: GET
- URL: /api/mail/:email/:id
- Query:
  - email: string
  - id: string

### Send Email

- Method: POST
- URL: /api/mail/:email
- Body:
  - from: string
  - subject: string
  - body: string (html)

### Delete OLD Email

- Method: POST
- URL: /api/mail/archieve

