require 'spec_helper'

RSpec.describe ThreadLabel do
  it { should validate_presence_of(:thread) }
  it { should validate_presence_of(:label) }
  it { should belong_to(:thread) }
  it { should belong_to(:label) }
end
