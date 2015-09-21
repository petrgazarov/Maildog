# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
petr_user = User.create(
  username: "petr",
  first_name: "Petr",
  last_name: "Gazarov",
  job_title: 'Software Developer',
  gender: "M",
  password: "password"
)

barack_user = User.create(
  username: "barack",
  first_name: "Barack",
  last_name: "Obama",
  job_title: "Politician",
  gender: "M",
  password: "password"
)

petr = petr_user.contacts.create(
  email: "petr@maildog.xyz",
  first_name: "Petr",
  last_name: "Gazarov",
  job_title: 'Software Developer',
  gender: "M"
)

barack = petr_user.contacts.create(
  email: "barack@maildog.xyz",
  first_name: "Barack",
  last_name: "Obama",
  job_title: "Politician",
  gender: "M"
)

hillary = petr_user.contacts.create(
  email: "hillary@maildog.xyz",
  first_name: "Hillary",
  last_name: "Clinton",
  job_title: "Politician",
  gender: "F"
)

nikita = petr_user.contacts.create(
  email: "nikita@maildog.xyz",
  first_name: "Nikita",
  last_name: "Gazarov",
  job_title: "Software Developer",
  gender: "M"
)

tommy = petr_user.contacts.create(
  email: "tommy@maildog.xyz",
  first_name: "Tommy",
  last_name: "Duek",
  job_title: "Instructor",
  gender: "M"
)

practice_email = petr_user.emails.create(
  subject: "What is best practice?",
  body: "A best practice is a technique or methodology that, \n"\
        "through experience and research, has proven to reliably \n"\
        "lead to a desired result. A commitment to using the best practices \n"\
        "in any field is a commitment to using all the knowledge and \n"\
        "technology at one's disposal to ensure success. The term is used \n"\
        "frequently in the fields of health care, government administration, \n"\
        "the education system, project management, hardware and software \n"\
        "product development, and elsewhere.",
  date: 'Thu, 17 Sep 2015',
  sender: petr,
  time: '2000-01-01 09:07:48 UTC'
)

hillary_email = petr_user.emails.create(
  subject: "hi",
  body: "Friend -- \n"\
        "When I take the stage in Las Vegas at the first Democratic \n"\
        "debate of this election, it will mean so much to know that a \n"\
        "few of my best supporters are in the audience cheering me on.\n\n"\
        "Today the campaign is launching a contest -- and if you win, you \n"\
        "could fly out and meet me at the debate next month. Add your name \n"\
        "to enter right now:\n\n"\
        "https://www.hillaryclinton.com/meet-hillary-at-the-debate/\n\n"\
        "Thanks,\n"\
        "Hillary",
  sender: hillary,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 09:16:34 UTC'
)

atom_message_1 = petr_user.emails.create(
  subject: "Atom editor",
  body: "You should check this out! --\n"\
        "GitHub recently released the awesome Atom text editor, \n"\
        "and although many of the keyboard shortcuts will be familiar \n"\
        "to Sublime Text users, there are many subtle differences.",
  sender: nikita,
  date: 'Thu, 19 Sep 2015',
  time: '2000-01-01 09:27:51 UTC'
)

atom_message_2 = petr_user.emails.create(
  subject: "Atom editor",
  body: "Yeah, it's great. I've used it on a number of projects\n"\
        "Petr",
  sender: petr,
  date: 'Thu, 20 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: atom_message_1,
  parent_email: atom_message_1
)

atom_message_3 = petr_user.emails.create(
  subject: "Atom editor",
  body: "Send me the link to your chess game\n"\
        "Nikita",
  sender: nikita,
  date: 'Thu, 21 Sep 2015',
  time: '2000-01-01 8:44:22 UTC',
  original_email: atom_message_1,
  parent_email: atom_message_2
)

atom_message_4 = petr_user.emails.create(
  subject: "Atom editor",
  body: "https://github.com/petrgazarov/Chess",
  sender: petr,
  date: 'Thu, 21 Sep 2015',
  time: '2000-01-01 8:44:22 UTC',
  original_email: atom_message_1,
  parent_email: atom_message_3
)

barack_email_1 = petr_user.emails.create(
  subject: "Have a good weekend!",
  body: "Hi Barack,\n"\
        "Have a good weekend, man!\n"\
        "Cheers, Petr",
  sender: petr,
  date: 'Thu, 18 Sep 2015',
  time: '2000-01-01 10:44:22 UTC'
)

barack_email_2 = petr_user.emails.create(
  subject: "Have a good weekend!",
  body: "Thanks!\n"\
        "Barack",
  sender: barack,
  date: 'Thu, 18 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: barack_email_1,
  parent_email: barack_email_1
)

practice_email.addressees.create(
  addressee: petr,
  email_type: "to"
)

hillary_email.addressees.create(
  addressee: petr,
  email_type: "to"
)

atom_message_1.addressees.create(
  addressee: petr,
  email_type: "to"
)

atom_message_2.addressees.create(
  addressee: nikita,
  email_type: "to"
)

atom_message_3.addressees.create(
  addressee: petr,
  email_type: "to"
)

atom_message_4.addressees.create(
  addressee: nikita,
  email_type: "to"
)

barack_email_1.addressees.create(
  addressee: barack,
  email_type: "to"
)

barack_email_2.addressees.create(
  addressee: petr,
  email_type: "to"
)
