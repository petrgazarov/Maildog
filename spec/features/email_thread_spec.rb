include IntegrationTestsHelpers
include SpecsSeedHelpers

RSpec.feature "Email Thread List", js: true, type: :feature do
  context "when initially logged in" do
    before(:each) do
      seed_for_one_thread
      sign_in_as("barack", "password")
    end

    it "displays the sender of the last email in a thread" do
      expect(page).to have_content("checking in")
    end

    it "displays the number of emails in a thread" do
      expect(page).to have_content("(4)")
    end

    it "displays the subject of a thread"
    it "displays the body preview of a thread"
    it "displays the date of the last email in the thread"
  end

  describe "checking check box" do
    it "changes the checked value of the thread"
  end
end
