FactoryGirl.define do
  factory :thread_label do
    association :label, factory: :label
    association :thread, factory: :email_thread
  end
end
