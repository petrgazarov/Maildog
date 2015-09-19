# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(
  username: "petr",
  first_name: "Petr",
  last_name: "Gazarov",
  photo_src_path: nil,
  job_title: 'Software Developer',
  gender: "M",
  password: "password",
  session_token: "72qkiE8VghE34z8j3OAzeA"
)

User.create(
  username: "simba",
  email: "simba@maildog.xyz",
  first_name: "simba",
  last_name: "simbaUserLastName",
  password: "password",
  session_token: "PM4h4QRhSGBqrU1nxXVTdQ"
)

Email.create(
  subject: "What is best practice?",
  body: "A best practice is a technique or methodology that, through experience and research, has proven to reliably lead to a desired result. A commitment to using the best practices in any field is a commitment to using all the knowledge and technology at one's disposal to ensure success. The term is used frequently in the fields of health care, government administration, the education system, project management, hardware and software product development, and elsewhere.",
  sender_id: User.all.sample.id,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 09:07:48 UTC',
  original_email_id: nil,
  parent_email_id: nil
)

Email.create(
  subject: "Jimmy Hendrix",
  body: "The American musician Jimi Hendrix died in London on September 18, 1970, aged 27. In the days leading up to his death, he was in poor health, affected by exhaustion and possibly influenza, and frustrated by his personal relationships. ",
  sender_id: User.all.sample.id,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 09:09:18 UTC',
  original_email_id: nil,
  parent_email_id: nil
)

Email.create(
  subject: "About Rosamund Pike",
  body: "Rosamund Mary Ellen Pike[1][2] (born 27 January 1979) is an English actress. Her first screen credit was in 1998 for the television film A Rather English Marriage and she came to attention when she was cast at age 21 as Bond girl Miranda Frost in Die Another Day (2002). ",
  sender_id: User.all.sample.id,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 09:16:34 UTC',
  original_email_id: nil,
  parent_email_id: nil
)

Email.create(
  subject: "Github rocks!",
  body:
   "GitHub recently released the awesome Atom text editor, and although many of the keyboard shortcuts will be familiar to Sublime Text users, there are many subtle differences.",
  sender_id: User.all.sample.id,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 09:27:51 UTC',
  original_email_id: nil,
  parent_email_id: nil
)

Email.create(
  subject: "Hello World",
  body: "Just saying...",
  sender_id: User.all.sample.id,
  date: 'Thu, 19 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email_id: nil,
  parent_email_id: nil
)

Email.create(
  subject: "Good Saturday",
  body: "Have a good saturday! ^_^",
  sender_id: User.all.sample.id,
  date: 'Thu, 18 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email_id: nil,
  parent_email_id: nil
)
