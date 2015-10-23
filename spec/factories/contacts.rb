FactoryGirl.define do
  factory :contact do
    association :owner, factory: :user

    email Faker::Internet.email

    factory :fully_filled_contact do
      first_name Faker::Name.first_name
      last_name Faker::Name.last_name
      job_title Faker::Name.title
      birth_date Faker::Date.between(55.years.ago, 18.years.ago)
      gender ["M", "F", "O"].sample
      photo_src_path Faker::Internet.url
    end
  end
end
