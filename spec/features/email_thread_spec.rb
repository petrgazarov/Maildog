include SpecsSeedHelpers

RSpec.feature "Email Thread List", js: true, type: :feature do
  context "when initially logged in" do
    before(:each) do
      seed_for_one_thread
      sign_in_as("barack", "password")
    end

    it "displays the sender of the last email in a thread" do
      expect(page).to have_content("Hillary Clinton")
    end

    it "displays the number of emails in a thread" do
      expect(page).to have_content("(4)")
    end

    it "displays the subject of a thread" do
      expect(page).to have_content("checking in")
    end

    it "displays the body preview of a last email in the thread" do
      expect(page).to have_content(
        "Thanks for the nice words, Barack, catch up in a few.")
    end

    it "displays the date of the last email in the thread" do
      expect(page).to have_content("Oct 2")
    end
  end

  describe "checking check box" do
    before(:each) do
      seed_for_one_thread
      sign_in_as("barack", "password")
    end

    it "erases all checks upon page refresh" do
      find('.check-box').trigger('click')
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be true

      page.visit page.current_path
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be false
    end

    it "toggles the checked value of the thread" do
      find('.check-box').trigger('click')
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be true

      find('.check-box').trigger('click')
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be false
    end

    it "triggers email options view to display a different template" do
      find('.check-box').trigger('click')
      expect(page).to have_content("Delete")
      find('.check-box').trigger('click')
      expect(page).to_not have_content("Delete")
    end
  end

  describe "clicking star icon" do
    before(:each) do
      seed_for_one_thread
      sign_in_as("barack", "password")
    end

    it "toggles the starred value of the displayed email" do
      email_body = "Thanks for the nice words, Barack, catch up in a few."

      find('.star').trigger('click')
      wait_for_ajax
      email = Email.where(
        email_thread_id: @b_thread1.id, body: email_body).first
      expect(email.starred).to be true

      find('.star').trigger('click')
      wait_for_ajax
      email = Email.where(
        email_thread_id: @b_thread1.id, body: email_body).first
      expect(email.starred).to be false
    end
  end

  describe "clicking on email thread list item" do
    before(:each) do
      seed_for_one_thread
      sign_in_as("barack", "password")
    end

    context "while in any folder other than Drafts" do
      it "initializes ShowEmailThread view and shows the details of the selected thread" do
        find('.email-list-item-link').trigger('click')
        wait_for_ajax
      end

      it "displays the draft email as a form ready to be sent"
    end

    context "while in Drafts folder" do
      it "shows the details of the selected thread if the thread has more than one message"
      it "pops up ComposeEmailBox view if the thread only contains the draft message"
    end
  end
end
