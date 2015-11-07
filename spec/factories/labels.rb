FactoryGirl.define do
  factory :label do
    association :owner, factory: :contact
    name Faker::Lorem.word
  end
end
