require 'spec_helper'

RSpec.describe EmailAddressee do
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:addressee) }
  it { should validate_presence_of(:email_type) }
  it { should belong_to(:email) }
  it { should belong_to(:addressee) }
end
