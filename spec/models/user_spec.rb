require 'spec_helper'

RSpec.describe User do
  subject(:user) {
    build(:user_with_username, first_name: nil, last_name: nil)
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
    expect(build(:user_with_username_and_password)).to be_valid
  end

  it "validates uniqueness of username" do
    username = user.username
    first_user = create(
      :user_with_username_and_password, username: username,
      email: "#{username}@maildog.xyz"
    )
    user.valid?
    expect(user.errors[:username]).to include("has already been taken")
  end

  describe "::find_by_credentials" do
    context "when the user exists" do
      before(:each) do
        @persisted_user = create(:user_with_username, password: "password")
      end

      it "returns the user if provided password matches" do
        expect(User.find_by_credentials(@persisted_user.username, "password"))
                   .to eq(@persisted_user)
      end

      it "returns nil if provided password is incorrect" do
        expect(User.find_by_credentials(@persisted_user.email, "foo")).to be(nil)
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
      @user = build(:user_with_username)
      @user.password = "password"
    end

    it "sets user's password digest" do
      expect(@user.password_digest).to be_truthy
    end

    it "saves the password to user's password attribute" do
      expect(@user.password).to eq("password")
    end
  end

  describe "#is_password?" do
    before(:all) do
      @user = build(:user_with_username)
      @user.password = "password"
    end

    it "returns true when the given password matches saved password" do
      expect(@user.is_password?("password")).to be true
    end

    it "returns false when the given password does not match saved password" do
      expect(@user.is_password?("foobar")).to be false
    end
  end

  describe "#reset_session_token!" do
    before(:each) do
      @user = create(:user_with_username_and_password)
      @old_session_token = @user.session_token
      @user.reset_session_token!
    end

    it "resets user's session token" do
      expect(@user.session_token).not_to equal(@old_session_token)
    end

    it "saves the user after updating user's session token" do
      expect(User.find_by(session_token: @user.session_token)).to eq(@user)
    end
  end
end
