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

thread1 = Thread.new(subject: "What is best practice?")
thread2 = Thread.new(subject: "hi")
thread3 = Thread.new(subject: "Atom editor")
thread4 = Thread.new(subject: "Have a good weekend!")

practice_email = petr.received_emails.create(
  thread: thread1,
  body: "A best practice is a technique or methodology that, \n"\
        "through experience and research, has proven to reliably \n"\
        "lead to a desired result. A commitment to using the best practices \n"\
        "in any field is a commitment to using all the knowledge and \n"\
        "technology at one's disposal to ensure success. The term is used \n"\
        "frequently in the fields of health care, government administration, \n"\
        "the education system, project management, hardware and software \n"\
        "product development, and elsewhere.",
  sender: petr,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 09:07:48 UTC'
)

hillary_email = petr.received_emails.create(
  thread: thread2,
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

atom_message_1 = petr.received_emails.create(
  thread: thread3,
  body: "You should check this out! --\n"\
        "GitHub recently released the awesome Atom text editor, \n"\
        "and although many of the keyboard shortcuts will be familiar \n"\
        "to Sublime Text users, there are many subtle differences.",
  sender: nikita,
  date: 'Thu, 11 Sep 2015',
  time: '2000-01-01 09:27:51 UTC'
)

atom_message_2 = nikita.received_emails.create(
  thread: thread3,
  body: "Yeah, it's great. I've used it on a number of projects\n"\
        "Petr",
  sender: petr,
  date: 'Thu, 12 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: atom_message_1,
  parent_email: atom_message_1
)

atom_message_3 = petr.received_emails.create(
  thread: thread3,
  body: "Send me the link to your chess game\n"\
        "Nikita",
  sender: nikita,
  date: 'Thu, 12 Sep 2015',
  time: '2000-01-01 11:50:22 UTC',
  original_email: atom_message_1,
  parent_email: atom_message_2
)

atom_message_4 = nikita.received_emails.create(
  thread: thread3,
  body: "https://github.com/petrgazarov/Chess",
  sender: petr,
  date: 'Thu, 13 Sep 2015',
  time: '2000-01-01 8:44:22 UTC',
  original_email: atom_message_1,
  parent_email: atom_message_3
)

barack_email_1 = barack.received_emails.create(
  thread: thread4,
  body: "Hi Barack,\n"\
        "Have a good weekend, man!\n"\
        "Cheers, Petr",
  sender: petr,
  date: 'Thu, 17 Sep 2015',
  time: '2000-01-01 10:44:22 UTC'
)

barack_email_2 = petr.received_emails.create(
  thread: thread4,
  body: "Thanks! What are you doing this weekend?\n"\
        "Wanna come along to see the commander-in-chief at the White House?\n"\
        "Barack",
  sender: barack,
  date: 'Thu, 18 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: barack_email_1,
  parent_email: barack_email_1
)

barack_email_3 = barack.received_emails.create(
  thread: thread4,
  body: "Ahh, I wish I could. I got to finish my final project at App Academy.\n"\
        "Thanks for your kind offer!\n"\
        "Petr",
  sender: petr,
  date: 'Thu, 19 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: barack_email_1,
  parent_email: barack_email_2
)

barack_email_4 = petr.received_emails.create(
  thread: thread4,
  body: "Alright then. I'm going to try to set up a meeting with Tiger Woods.\n"\
        "Farewell!\n"\
        "Barack",
  sender: barack,
  date: 'Thu, 20 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: barack_email_1,
  parent_email: barack_email_3
)

barack_email_5 = barack.received_emails.create(
  thread: thread4,
  body: "Barack, are you mad at me?! Barack!!!",
  sender: petr,
  date: 'Thu, 21 Sep 2015',
  time: '2000-01-01 10:44:22 UTC',
  original_email: barack_email_1,
  parent_email: barack_email_4
)
