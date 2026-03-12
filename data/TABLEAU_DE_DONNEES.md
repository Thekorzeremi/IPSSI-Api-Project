# Tableau de données
## USERS
- id AUTO_INCREMENT
- username STRING
- password STRING
- created_at DATETIME IMMUTABLE
- updated_at DATETIME
- roles ARRAY
- score INT
- settings :
  - newsletter BOOL

## ARTICLES
- id AUTO_INCREMENT
- title STRING
- created_at DATETIME IMMUTABLE
- updated_at DATETIME
- author STRING
- image STRING
- content STRING
- score INT
- comments :
  - id AUTO_INCREMENT
  - author STRING
  - content STRING
  - created_at DATETIME IMMUTABLE
  - updated_at DATETIME
  - score INT

## LOGS
- id AUTO_INCREMENT
- created_at DATETIME IMMUTABLE
- message STRING
- url STRING

## THREADS
- id AUTO_INCREMENT
- title STRING
- created_at DATETIME IMMUTABLE
- last_message_at DATETIME
- author STRING
- score INT
- messages :
  - id AUTO_INCREMENT
  - author STRING
  - content STRING
  - created_at DATETIME IMMUTABLE
  - updated_at DATETIME
  - score INT