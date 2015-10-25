require 'spec_helper'

RSpec.describe User do
  subject(:user) {
    build(:user, first_name: nil, last_name: nil)
  }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:session_token) }
  it { should validate_presence_of(:password_digest) }
  it { should allow_value(nil).for(:password) }
  it { should validate_length_of(:password).is_at_least(6) }
  it { should have_many(:contacts) }
  it { should respond_to(:password) }

  it "is valid with username, first_name, last_name and password" do
    # sets email and session_token on after_initialize hooks

    expect(build(:user_with_password)).to be_valid
  end

  it "validates uniqueness of username" do
    username = user.username
    create(:user_with_password, username: username)
    user.valid?
    expect(user.errors[:username]).to include("has already been taken")
  end

  describe "::find_by_credentials" do
    context "when the user exists" do

      it "returns the user if provided password matches" do
        persisted_user = create(:user, password: "password")
        expect(User.find_by_credentials(persisted_user.username, "password")).to eq(persisted_user)
      end

      it "returns nil if provided password is incorrect" do
        user = create(:user, password: "password")
        expect(User.find_by_credentials(user.email, "foo")).to be(nil)
      end
    end

    context "when the user does not exist" do
      it "returns nil" do
        expect(User.find_by_credentials(Faker::Internet.user_name, "password")).to be(nil)
      end
    end
  end

  describe "#password=" do
    before(:all) do
      @user = build(:user)
      @user.password = "password"
    end

    it "sets user's password digest" do
      expect(@user.password_digest).to be_truthy
    end

    it "saves the password to user's password attribute" do
      expect(@user.password).to eq("password")
    end
  end
end
