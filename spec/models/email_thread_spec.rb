require 'spec_helper'

RSpec.describe EmailThread do
  it { should have_many(:emails) }
  it { should belong_to(:owner) }
  it { should have_many(:thread_labels) }
  it { should have_many(:labels) }
  it { validate_presence_of(:owner) }

  it "is valid with owner" do
    expect(build(:email_thread)).to be_valid
  end

  describe "#trash_count" do
    it "returns the correct count of trash emails that belong to the thread" do
      expect(build(:email_thread_with_emails).trash_count).to eq(1)
    end
  end

  describe "#non_trash_count" do
    it "returns the correct count of non trash emails that belong to the thread" do
      expect(build(:email_thread_with_emails).non_trash_count).to eq(3)
    end
  end
end
