FactoryGirl.define do
  factory :user do
    initialize_with { new(username: Faker::Internet.user_name) }

    first_name Faker::Name.first_name
    last_name Faker::Name.last_name

    factory :user_with_password do
      password Faker::Internet.password
    end
  end
end
