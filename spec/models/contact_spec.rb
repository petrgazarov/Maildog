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

  describe "::create_or_get" do
    context "when contact exists with the given email and owner" do

    end

    context "when contact with given attributes does not exist and "\
            "current_user_contact is not given" do

    end

    context "when contact with given attributes does not exist and "\
            "current_user_contact is given" do

    end
  end
end
