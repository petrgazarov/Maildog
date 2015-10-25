FactoryGirl.define do
  factory :email_addressee do
    association :email, factory: :email
    association :addressee, factory: :contact
  end
end
