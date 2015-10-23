require 'spec_helper'

RSpec.describe Contact do
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:owner) }
  it { should belong_to(:owner) }
  it { should have_many(:labels) }
  it { should have_many(:threads) }
  it { should have_many(:received_emails) }
  it { should have_many(:written_emails) }
  it { should have_many(:email_addressees) }
end
