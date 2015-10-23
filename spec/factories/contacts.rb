FactoryGirl.define do
  factory :contact do
    email Faker::Internet.email
  end
end
