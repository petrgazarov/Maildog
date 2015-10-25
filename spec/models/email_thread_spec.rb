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
end
