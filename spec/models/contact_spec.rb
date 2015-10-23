require 'spec_helper'

RSpec.describe Contact do
  it "must have an email" do
    expect(build(:contact, email: nil)).not_to be_valid
  end
end
