RSpec.feature "Main page", js: true, type: :feature do
  before(:each) do
    create_barack_user_and_contact
    sign_in_as("barack", "password")
  end

  describe "when initially logged in" do
    it "renders MailNav View" do
      expect(page).to have_content("Search")
      expect(page).to have_content("Log out")
      expect(page).to have_content("Barack")
      expect(page).to have_content("Maildog")
      expect(page).to have_content("Made with ♡ by Petr Gazarov")
    end

    it "renders MailSidebar View" do
      expect(page).to have_content("COMPOSE")
      expect(page).to have_content("Inbox")
      expect(page).to have_content("Starred")
      expect(page).to have_content("Sent Mail")
      expect(page).to have_content("Drafts")
      expect(page).to have_content("Trash")
      expect(page).to have_content("Create new label")
    end

    it "navigates to the inbox folder by default"
    it "clears all email threads' checks"
  end

  scenario "trying to access the page when not logged in results in a redirect to the sign in page"
  scenario "clicking on the Maildog logo refreshes the site"
  scenario "clicking the 'Petr Gazarov' link redirects user to www.petrgazarov.com"
  scenario "clicking the 'Log out' link logs user out and redirects to the sign in page"
end
