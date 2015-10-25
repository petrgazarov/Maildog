require 'spec_helper'

RSpec.describe EmailThread do
  it { should have_many(:emails) }
  it { should belong_to(:owner) }
  it { should have_many(:thread_labels) }
  it { should have_many(:labels) }
  it { should validate_presence_of(:owner) }

  it "is valid with owner" do
    expect(build(:email_thread)).to be_valid
  end

  describe "#trash_count" do
    extend ExamplesHelper
    insert_before_for_email_thread

    it "returns the correct count of trash emails that belong to the thread" do
      expect((@email_thread).trash_count).to eq(1)
    end
  end

  describe "#non_trash_count" do
    extend ExamplesHelper
    insert_before_for_email_thread

    it "returns the correct count of non trash emails that belong to the thread" do
      expect((@email_thread).non_trash_count).to eq(3)
    end
  end
end
