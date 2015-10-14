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

petrs_barack = petr_user.contacts.create(
  email: "barack@maildog.xyz",
  first_name: "Barack",
  last_name: "Obama",
  job_title: "Politician",
  gender: "M"
)

barack = barack_user.contacts.create(
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

barack_email_1 = petrs_barack.received_emails.create(
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

  sender: petrs_barack,
  time: DateTime.new(2015,9,15,22,27,51).in_time_zone,
  original_email: barack_email_1,
  parent_email: barack_email_1
)

barack_email_3 = petrs_barack.received_emails.create(
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

  sender: petrs_barack,
  time: DateTime.new(2015,9,28,9,30,51).in_time_zone,
  original_email: barack_email_1,
  parent_email: barack_email_3
)

barack_email_5 = petrs_barack.received_emails.create(
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

john_boehner = barack_user.contacts.create(
  email: "john.boehner@maildog.xyz",
  first_name: "John",
  last_name: "Boehner",
  photo_src_path: nil,
  gender: "M"
)

osama_bin_laden = barack_user.contacts.create(
  email: "osama.bin.laden@maildog.xyz",
  first_name: "Osama",
  last_name: "Bin Laden",
  photo_src_path: nil,
  gender: "M"
)

vladimir_putin = barack_user.contacts.create(
  email: "vladimir.putin@maildog.xyz",
  first_name: "Vladimir",
  last_name: "Putin",
  photo_src_path: nil,
  gender: "M"
)

family_label = barack.labels.create!(name: "Family")

b_thread1 = EmailThread.create!(subject: "checking in", owner: barack)

hillary_checkin_1 = hillary.received_emails.create(
  thread: b_thread1,
  subject: "checking in",
  body:
"Hey Hill, I just wanted to check in. Is everything going alright?\n"\
"Love,\n"\
"Barack",

  sender: barack,
  time: DateTime.new(2015,10,1,9,27,51).in_time_zone
)

hillary_checkin_2 = barack.received_emails.create(
  thread: b_thread1,
  subject: "checking in",
  body:
"Hey Barack,\n"\
"Overwhelmed with the campaign, not easy. There are a dozen hungry republicans "\
"and I'm basically alone, Bernie and I.\n"\
"Hanging in there though.\n\n"\
"Hill",

  sender: hillary,
  time: DateTime.new(2015,10,1,9,27,51).in_time_zone,
  original_email: hillary_checkin_1,
  parent_email: hillary_checkin_1
)

hillary_checkin_3 = hillary.received_emails.create(
  thread: b_thread1,
  subject: "checking in",
  body:
"Yeah, things are tough right now, but you know, if you never run, you never win.\n"\
"Also, something I want to tell you: when going into the debate, you can blaim me "\
"for the current federal spending issues.",

  sender: barack,
  time: DateTime.new(2015,10,1,9,27,51).in_time_zone,
  original_email: hillary_checkin_1,
  parent_email: hillary_checkin_2
)

hillary_checkin_4 = barack.received_emails.create(
  thread: b_thread1,
  subject: "checking in",
  body:
"Thanks for the nice words, Barack, catch up in a few.",

  sender: hillary,
  time: DateTime.new(2015,10,1,9,27,51).in_time_zone,
  original_email: hillary_checkin_1,
  parent_email: hillary_checkin_3
)

b_thread2 = EmailThread.create!(subject: "hi", owner: barack)

barack.received_emails.create(
  thread: b_thread2,
  subject: "hi",
  body:
"Friend --\n\n"\
"When I take the stage in Las Vegas at the first Democratic debate of this "\
"election, it will mean so much to know that a few of my best supporters are "\
"in the audience cheering me on.\n\n"\
"Today the campaign is launching a contest -- and if you win, you could fly "\
"out and meet me at the debate next month. Add your name to enter right now:\n\n"\
"https://www.hillaryclinton.com/meet-hillary-at-the-debate/\n\n"\
"Thanks,\n\n"\
"Hillary",

  sender: hillary,
  trash: true,
  time: DateTime.new(2015,10,1,9,27,51).in_time_zone
)

b_thread3 = EmailThread.create!(
  subject: "I'm not watching tonight's debate", owner: barack
)

barack.received_emails.create(
  thread: b_thread3,
  subject: "I'm not watching tonight's debate",
  body:
"Friend --\n\n"\
"Right this minute, ten Republican men are on national TV, arguing over which "\
"one will do the best job of dragging our country backwards.\n\n"\
"I'm not watching, and I don't need to be.\n\n"\
"Donald Trump, Jeb Bush, Scott Walker, Marco Rubio -- they all have the "\
"same agenda. They are out of step with the kind of country Americans want "\
"for themselves and their children.\n\n"\
"I'm on the road tonight, but I wanted to take a moment to ask you to chip "\
"in $1 or more right now to fight for the vision you and I share:\n\n"\
"https://www.hillaryclinton.com/gop-debate/\n\n"\
"Thanks,\n\n"\
"Hillary",

  sender: hillary,
  time: DateTime.new(2015,8,6,11,03,21).in_time_zone
)

b_thread4 = EmailThread.create!(
  subject: "Here's the plan --", owner: barack
)

barack.received_emails.create(
  thread: b_thread4,
  subject: "Here's the plan --",
  body:
"Friend --\n\n"\
"Earlier this week, I rolled out one of the biggest plans of this campaign: "\
"the New College Compact.\n\n"\
"Access to higher education is critical to strengthening middle-class "\
"families. College needs to be affordable and available to everyone.\n\n"\
"The New College Compact helps everyone -- from students who are just "\
"starting out to those already struggling to pay back their loans.\n\n"\
"There’s a lot in this plan, so to figure out exactly how it could help you, "\
"answer a few short questions now:\n\n"\
"https://www.hillaryclinton.com/collegequiz/\n\n"\
"Thanks,\n\n"\
"Hillary",

  sender: hillary,
  time: DateTime.new(2015,8,13,4,13,21).in_time_zone
)

b_thread5 = EmailThread.create!(
  subject: "If you’re in, your name should be on this:", owner: barack
)

barack.received_emails.create(
  thread: b_thread5,
  subject: "If you’re in, your name should be on this:",
  body:
"Friend --\n\n"\
"I'm asking you to pitch in to help build this campaign today -- even if it's "\
"just $1 -- and put your name on our brand new Donor Wall here at campaign HQ.\n\n"\
"We’re building a wall because we want to have something tangible that shows "\
"what kind of campaign this is: an organization powered by hundreds of thousands of Americans.\n\n"\
"Are you in?\n\n"\
"https://www.hillaryclinton.com/get-on-the-wall/\n\n"\
"Thanks,\n\n"\
"Hillary",

  sender: hillary,
  trash: true,
  time: DateTime.new(2015,8,19,6,13,21).in_time_zone
)

b_thread6 = EmailThread.create!(
  subject: "dinner?", owner: barack
)

hillary_diner_email = barack.received_emails.create(
  thread: b_thread6,
  subject: "dinner?",
  body:
"Friend --\n\n"\
"I'd like to get to know you, and I can't think of a better way to do that "\
"than sitting down to dinner together.\n\n"\
"We don't have to talk politics or get too serious -- no homework assignments before "\
"this dinner. I just want to know what's on your mind, and I'd like to thank "\
"you for being a part of this team.\n\n"\
"The campaign will take care of your travel and accommodations, so you can "\
"relax and enjoy our time together.\n\n"\
"Chip in right now to be automatically entered for another chance to meet "\
"me on the campaign trail:\n\n"\
"https://www.hillaryclinton.com/enter-dinner-with-hillary/\n\n"\
"See you for dinner,\n\n"\
"Hillary",

  sender: hillary,
  time: DateTime.new(2015,8,25,6,44,21).in_time_zone
)

hillary.received_emails.create(
  thread: b_thread6,
  subject: "dinner?",
  body:
"Haha, Hillary, we've dined just the other day! Sure, why not.",

  sender: barack,
  time: DateTime.new(2015,8,26,1,25,21).in_time_zone,
  original_email: hillary_diner_email,
  parent_email: hillary_diner_email
)

b_thread7 = EmailThread.create!(subject: "From supporter", owner: barack)

barack.received_emails.create(
  thread: b_thread7,
  subject: "From supporter",
  body:
"Hi Barack, \n\n"\
"I'm Rando John, a random person from California. I just wanted to tell you "\
"personally how much I support you and like what you are trying to do.\n"\
"That's right, the republicans are giving you trouble, but isn't that how it "\
"is supposed to be? Anyways, you probably know that better than I do.\n"\
"Here is what I'm getting at: my wife and I are having an anniversary next weekend, "\
"Will you join us? I know you will be in Ttexas then, but there is a good Delta flight "\
"leaving Saturday at 11 in the morning, and it will get you here right in time.\n"\
"There is free alcohol and BBQ.\n\n"\
"With very best wishes,\n"\
"Rando",
  sender: rando_john,
  time: DateTime.new(2015,10,1,2,15,21).in_time_zone
)

b_thread8 = family_label.threads.new(subject: "Tonight", owner: barack)
b_thread8.save!

michelle_diner_email = michelle.received_emails.create(
  thread: b_thread8,
  subject: "Tonight",
  body:
"Hey honey, what are we having for diner tonight?",

  sender: barack,
  time: DateTime.new(2015,10,8,15,55,21).in_time_zone
)

michelle_diner_email_2 = barack.received_emails.create(
  thread: b_thread8,
  subject: "Tonight",
  body:
"My uncle made an awesome BBQ rack of lamb, it's DELICIOUS. You should have Joe "\
"come join us for dinner!\n"\
"Michelle",

  sender: michelle,
  starred: true,
  time: DateTime.new(2015,10,8,16,15,21).in_time_zone,
  original_email: michelle_diner_email,
  parent_email: michelle_diner_email
)

b_thread9 = family_label.threads.new(subject: "My first prom", owner: barack)
b_thread9.save!

malia_email = barack.received_emails.create(
  thread: b_thread9,
  subject: "My first prom",
  body:
"Daddy, I attended my first prom friday and it was Awesome!!\n"\
"When will you be home?\n\n"\
"Love,\n"\
"Malia",

  sender: malia,
  time: DateTime.new(2015,5,8,21,31,21).in_time_zone
)

malia.received_emails.create(
  thread: b_thread9,
  subject: "My first prom",
  body:
"I'm very glad for you, my dear.\n"\
"John Boehner and I are having a little argument here over federal spending, "\
"so I'm still in a meeting. I will do my best to make it home before midnight.\n\n"\
"Love,\n"\
"Dad",

  sender: barack,
  time: DateTime.new(2015,5,8,21,55,21).in_time_zone,
  original_email: malia_email,
  parent_email: malia_email
)
