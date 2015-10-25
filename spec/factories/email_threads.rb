FactoryGirl.define do
  factory :email_thread do
    association :owner, factory: :contact

    subject Faker::Lorem.word
  end
end
