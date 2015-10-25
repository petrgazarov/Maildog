require 'spec_helper'

RSpec.describe Label do
  it { should validate_presence_of(:owner) }
  it { should validate_presence_of(:name) }
  it { should belong_to(:owner) }
  it { should have_many(:thread_labels) }
  it { should have_many(:threads) }
end
