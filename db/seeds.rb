# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Time.zone = "Eastern Time (US & Canada)"

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

nikita = petr_user.contacts.create(
  email: "nikita@maildog.xyz",
  first_name: "Nikita",
  last_name: "Gazarov",
  job_title: "Software Developer",
  gender: "M"
)

thread1 = EmailThread.new(subject: "What is best practice?", owner: petr)
thread3 = EmailThread.new(subject: "Atom editor", owner: petr)
thread4 = EmailThread.new(subject: "Have a good weekend!", owner: petr)

practice_email = petr.received_emails.create(
  thread: thread1,
  subject: "What is best practice?",
  body: "A best practice is a technique or methodology that, \n"\
        "through experience and research, has proven to reliably \n"\
        "lead to a desired result. A commitment to using the best practices \n"\
        "in any field is a commitment to using all the knowledge and \n"\
        "technology at one's disposal to ensure success. The term is used \n"\
        "frequently in the fields of health care, government administration, \n"\
        "the education system, project management, hardware and software \n"\
        "product development, and elsewhere.",
  sender: petr,
  time: DateTime.new(2015,9,11,9,27,51).in_time_zone
)

atom_message_1 = petr.received_emails.create(
  thread: thread3,
  subject: "Atom editor",
  body: "You should check this out! --\n"\
        "GitHub recently released the awesome Atom text editor, \n"\
        "and although many of the keyboard shortcuts will be familiar \n"\
        "to Sublime Text users, there are many subtle differences.",
  sender: nikita,
  time: DateTime.new(2015,9,12,9,27,51).in_time_zone
)

atom_message_2 = nikita.received_emails.create(
  thread: thread3,
  subject: "Atom editor",
  body: "Yeah, it's great. I've used it on a number of projects\n"\
        "Petr",
  sender: petr,
  time: DateTime.new(2015,9,13,9,27,51).in_time_zone,
  original_email: atom_message_1,
  parent_email: atom_message_1
)

atom_message_3 = petr.received_emails.create(
  thread: thread3,
  subject: "Atom editor",
  body: "Send me the link to your chess game\n"\
        "Nikita",
  sender: nikita,
  time: DateTime.new(2015,9,14,11,27,51).in_time_zone,
  original_email: atom_message_1,
  parent_email: atom_message_2
)

atom_message_4 = nikita.received_emails.create(
  thread: thread3,
  subject: "Atom editor",
  body: "https://github.com/petrgazarov/Chess",
  sender: petr,
  time: DateTime.new(2015,9,15,1,27,51).in_time_zone,
  original_email: atom_message_1,
  parent_email: atom_message_3
)

barack_email_1 = barack.received_emails.create(
  thread: thread4,
  subject: "Have a good weekend!",
  body:
"Hi Barack,\n"\
"Have a good weekend, man!\n"\
"Cheers, Petr",

  sender: petr,
  time: DateTime.new(2015,9,13,12,27,51).in_time_zone
)

barack_email_2 = petr.received_emails.create(
  thread: thread4,
  subject: "Have a good weekend!",
  body:
"Thanks! What are you doing this weekend?\n"\
"Wanna come along to see the commander-in-chief at the White House?\n"\
"Barack",

  sender: barack,
  time: DateTime.new(2015,9,15,22,27,51).in_time_zone,
  original_email: barack_email_1,
  parent_email: barack_email_1
)

barack_email_3 = barack.received_emails.create(
  thread: thread4,
  subject: "Have a good weekend!",
  body:
"Ahh, I wish I could. I got to finish my final project at App Academy.\n"\
"Thanks for your kind offer!\n"\
"Petr",

  sender: petr,
  time: DateTime.new(2015,9,19,9,34,51).in_time_zone,
  original_email: barack_email_1,
  parent_email: barack_email_2
)

barack_email_4 = petr.received_emails.create(
  thread: thread4,
  subject: "Have a good weekend!",
  body:
"Alright then. I'm going to try to set up a meeting with Tiger Woods.\n"\
"Farewell!\n"\
"Barack",

  sender: barack,
  time: DateTime.new(2015,9,28,9,30,51).in_time_zone,
  original_email: barack_email_1,
  parent_email: barack_email_3
)

barack_email_5 = barack.received_emails.create(
  thread: thread4,
  subject: "Have a good weekend!",
  body:
"Barack, are you mad at me?! Barack!!!",

  sender: petr,
  time: DateTime.new(2015,9,29,9,27,51).in_time_zone,
  original_email: barack_email_1,
  parent_email: barack_email_4
)

# BARACKS SEEDS

hillary = barack_user.contacts.create(
  email: "hillary@maildog.xyz",
  first_name: "Hillary",
  last_name: "Clinton",
  photo_src_path: nil,
  gender: "F"
)

rando_john = barack_user.contacts.create(
  email: "rando_john@maildog.xyz",
  first_name: "Rando",
  last_name: "John",
  photo_src_path: nil,
  gender: "M"
)

michelle = barack_user.contacts.create(
  email: "michelle@maildog.xyz",
  first_name: "Michelle",
  last_name: "Obama",
  photo_src_path: nil,
  gender: "F"
)

malia = barack_user.contacts.create(
  email: "malia@maildog.xyz",
  first_name: "Malia",
  last_name: "Obama",
  photo_src_path: nil,
  gender: "F"
)

joe_biden = barack_user.contacts.create(
  email: "joe.biden@maildog.xyz",
  first_name: "Joe",
  last_name: "Biden",
  photo_src_path: nil,
  gender: "M"
)

john_kerry = barack_user.contacts.create(
  email: "john.kerry@maildog.xyz",
  first_name: "John",
  last_name: "Kerry",
  photo_src_path: nil,
  gender: "M"
)

b_thread1 = EmailThread.new(subject: "hi", owner: barack)


hillary_email = petr.received_emails.create(
  thread: b_thread1,
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
  time: DateTime.new(2015,10,1,9,27,51).in_time_zone
)
