FactoryGirl.define do
  factory :user do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name

    factory :user_with_username do
      initialize_with { new(username: Faker::Internet.user_name) }

      factory :user_with_username_and_password do
        password Faker::Internet.password
      end
    end

    factory :barack_user do
      initialize_with { new(username: "barack") }
      password "password"
      first_name "Barack"
      last_name "Obama"
    end
  end

end
