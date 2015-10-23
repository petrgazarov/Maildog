require 'spec_helper'

RSpec.describe User do
  subject { User.new(username: Faker::Internet.user_name) }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:session_token) }
  it { should validate_presence_of(:password_digest) }
  it { should allow_value(nil).for(:password) }
  it { should validate_length_of(:password).is_at_least(6) }

  it "is valid with username, first_name, last_name and password" do
    # sets email and session_token on after_initialize hooks
    expect(build(:user)).to be_valid
  end

  it { should have_many(:contacts) }
end
