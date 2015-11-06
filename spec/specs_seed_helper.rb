include IntegrationTestsHelpers

module SpecsSeedHelpers
  def seed_for_one_thread
    @barack_user, @barack = create_barack_user_and_contact

    @hillary = @barack_user.contacts.create(
      email: "hillary@maildog.xyz",
      first_name: "Hillary",
      last_name: "Clinton",
      photo_src_path: nil,
      gender: "F"
    )

    @b_thread1 = EmailThread.create!(subject: "checking in", owner: @barack)

    hillary_checkin_1 = @hillary.received_emails.create(
      thread: @b_thread1,
      subject: "checking in",
      body:
    "Hey Hill, I just wanted to check in. Is everything going alright?\n"\
    "Love,\n"\
    "Barack",

      sender: @barack,
      time: DateTime.new(2015,10,1,9,27,51).in_time_zone
    )

    hillary_checkin_2 = @barack.received_emails.create(
      thread: @b_thread1,
      subject: "checking in",
      body:
    "Hey Barack,\n"\
    "Overwhelmed with the campaign, not easy. There are a dozen hungry republicans "\
    "and I'm basically alone, Bernie and I.\n"\
    "Hanging in there though.\n\n"\
    "Hill",

      sender: @hillary,
      time: DateTime.new(2015,10,2,11,31,51).in_time_zone,
      original_email: hillary_checkin_1,
      parent_email: hillary_checkin_1
    )

    hillary_checkin_3 = @hillary.received_emails.create(
      thread: @b_thread1,
      subject: "checking in",
      body:
    "Yeah, things are tough right now, but you know, if you never run, you never win.\n"\
    "Also, something I want to tell you: when going into the debate, you can blaim me "\
    "for the current federal spending issues.",

      sender: @barack,
      time: DateTime.new(2015,10,2,12,27,51).in_time_zone,
      original_email: hillary_checkin_1,
      parent_email: hillary_checkin_2
    )

    hillary_checkin_4 = @barack.received_emails.create(
      thread: @b_thread1,
      subject: "checking in",
      body:
    "Thanks for the nice words, Barack, catch up in a few.",

      sender: @hillary,
      time: DateTime.new(2015,10,3,0,27,51).in_time_zone,
      original_email: hillary_checkin_1,
      parent_email: hillary_checkin_3
    )

    @b_thread1
  end

  def seed_for_two_threads
    seed_for_one_thread

    @b_thread2 = EmailThread.create!(subject: "hi", owner: @barack)

    @barack.received_emails.create(
      thread: @b_thread2,
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

      sender: @hillary,
      time: DateTime.new(2015,10,1,9,27,51).in_time_zone
    )
  end
end

RSpec.configure do |config|
  config.include SpecsSeedHelpers, type: :feature
end
