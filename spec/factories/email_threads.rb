FactoryGirl.define do
  factory :email_thread do
    association :owner, factory: :contact
    subject Faker::Lorem.word

    factory :email_thread_with_emails do
      after(:build) do |email_thread|
        3.times { create(:email, thread: email_thread) }
        create(:email, thread: email_thread, trash: true)
      end
    end
  end
end
