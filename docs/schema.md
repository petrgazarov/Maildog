# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique
first_name      | string    | not null
last_name       | string    | not null
photo_src_path  | string    |
job_title       | string    |
birth_day       | date      |
gender          | string    |   
password_digest | string    | not null
session_token   | string    | not null, unique

## emails
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    |
body         | text      |
sender_id    | integer   | not null, foreign key (references contacts)
starred      | boolean   | not null, default: false
checked      | boolean   | not null, default: false
date         | date      | not null
time         | time      | not null
parent_email | integer   | foreign key (references emails)

## email_to
column name    | data type | details
---------------|-----------|-----------------------
email_id       | integer   | not null, foreign key (references emails)
addressee_id   | integer   | not null, foreign key (references contacts)
addressee_kind | string    | not null, default: "to" (can contain "to", "cc" or "bcc")

## contacts
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
first_name      | string    |
last_name       | string    |
photo_src_path  | string    |
job_title       | string    |
birth_day       | date      |
gender          | string    |  
owner_id        | integer   | not null, foreign key (references users)

## labels
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
email_id    | integer   | not null, foreign key (references emails)
name        | string    | not null
color       | string    | not null

## email_label
column name | data type | details
------------|-----------|-----------------------
email_id    | integer   | not null, foreign key (references emails)
label_id    | integer   | not null, foreign key (references labels)

## folders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
author_id   | integer   | not null, foreign key (references users)

## email_folder
column name | data type | details
------------|-----------|-----------------------
email_id    | integer   | not null, foreign key (references emails)
folder_id   | integer   | not null, foreign key (references folders)

## chats
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
sender_id   | integer   | not null, foreign key (references contacts)
receiver_id | integer   | not null, foreign key (references contacts)
body        | text      | not null
date        | date      | not null
time        | time      | not null
