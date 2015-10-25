require 'spec_helper'

RSpec.describe Email do
  it { should belong_to(:sender) }
  it { should have_many(:email_addressees) }
  it { should have_many(:addressees) }
  it { should belong_to(:parent_email) }
  it { should belong_to(:original_email) }
  it { should belong_to(:thread) }

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
end
