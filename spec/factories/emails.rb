FactoryGirl.define do
  factory :email do
    association :sender, factory: :contact
    association :thread, factory: :email_thread

    subject Faker::Lorem.word
    body Faker::Lorem.paragraph
  end
end
