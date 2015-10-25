require 'spec_helper'

RSpec.describe Email do
  it { should belong_to(:sender) }
  it { should have_many(:email_addressees) }
  it { should have_many(:addressees) }
  it { should belong_to(:parent_email) }
  it { should belong_to(:original_email) }
  it { should belong_to(:thread) }

  it "is valid without any set attributes" do
    expect(build(:email)).to be_valid
  end

  describe "#changed_star_or_trash?" do
    before(:all) do
      @email = build(:email)
    end

    it "returns true if given a contrasting star value" do
      expect(@email.changed_star_or_trash?(true, false)).to be true
    end

    it "returns true if given a contrasting trash value" do
      expect(@email.changed_star_or_trash?(false, true)).to be true
    end

    it "returns false if given same star and trash values" do
      expect(@email.changed_star_or_trash?(false, false)).to be false
    end
  end

  describe "pg_search helper methods" do
    before(:each) do
      @email = build(:email)
    end

    describe "#sender_first_name" do
      it "returns sender's first name" do
        expect(@email.sender_first_name).to eq(@email.sender.first_name)
      end
    end

    describe "#sender_last_name" do
      it "returns sender's last name" do
        expect(@email.sender_last_name).to eq(@email.sender.last_name)
      end
    end

    describe "#not_trash?" do
      it "returns true when email is not trash" do
        expect(@email.not_trash?).to be true
      end

      it "returns false when email is trash" do
        @email.trash = true
        expect(@email.not_trash?).to be false
      end
    end
  end
end
