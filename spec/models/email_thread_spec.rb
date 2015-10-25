require 'spec_helper'

RSpec.describe EmailThread do
  it { should have_many(:emails) }
  it { should belong_to(:owner) }
  it { should have_many(:thread_labels) }
  it { should have_many(:labels) }
end
