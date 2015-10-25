FactoryGirl.define do
  factory :label do
    association :owner, factory: :contact
    name Faker::Name.name
  end
end
