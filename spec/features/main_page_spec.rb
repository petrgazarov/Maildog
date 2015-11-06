RSpec.feature "Main page", js: true, type: :feature do

  describe "when initially logged in" do
    before(:each) do
      @barack_user, @barack = create_barack_user_and_contact
      sign_in_as("barack", "password")
    end

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

    it "navigates to the inbox folder by default" do
      expect(page).to have_content("No conversations in Inbox")
    end

    it "clears all email threads' checks" do
      thread = create_self_addressed_thread_with_emails
      thread.update(checked: true)

      page.visit page.current_path
      wait_for_ajax
      expect(EmailThread.where(checked: true)).to be_empty
      expect(page).not_to have_css('div.check-box.checked-check-box')
    end
  end

  scenario "trying to access the page when not logged in results in a redirect "\
           "to the sign in page" do
    visit "/"
    expect(page).to have_content("Sign in to continue")
  end

  describe "clicking links" do
    before(:each) do
      @barack_user, @barack = create_barack_user_and_contact
      sign_in_as("barack", "password")
    end

    scenario "clicking the Maildog logo redirects to the root of the site" do
      wait_for_ajax
      visit "/#sent"
      wait_for_ajax
      find('div.dog-logo')
      find('div.dog-logo').trigger('click')

      expect(page).to have_content("No conversations in Inbox")
      expect(current_path).to eq "/"
    end

    scenario "clicking the 'Log out' link logs user out and redirects to the "\
             "sign in page" do
      click_on('Log out')
      expect(page).to have_content("Sign in to continue")
    end
  end
end
