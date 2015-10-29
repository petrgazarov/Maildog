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

      #reload page
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
      before(:each) do
        find('.email-list-item-link').trigger('click')
        wait_for_ajax
      end

      it "initializes ShowEmailThread view and shows the details of the selected thread" do
        expect(page).to have_content("Hey Hill, I just wanted to check in. Is everything going alright?")
        expect(page).to have_content("Oct 1")
        expect(page).to have_content("Hey Barack")
        expect(page).to have_content("Yeah, things are tough right now")
        expect(page).to have_content("Thanks for the nice words, Barack")
        expect(page).to have_content("Hillary Clinton")
        expect(page).to have_content("Barack Obama")
        expect(page).to have_content("Oct 2")
        expect(page).to have_content("to barack@maildog.xyz")
        expect(page).to have_content("to hillary@maildog.xyz")
      end

      it "displays a draft email in the thread as a form ready to be sent" do
        find('.reply-forward-email-box').trigger('click')
        paragraph = Faker::Lorem.paragraph
        find('.compose-email-body > textarea').set(paragraph)
        page.execute_script("$('.reply-forward-email-form').trigger('input')")
        find("p", text: "Saving")
        wait_for_ajax

        # go back and click link again
        page.visit page.current_path
        find('.email-list-item-link').trigger('click')
        wait_for_ajax
        expect(find('.compose-email-body > textarea').value).to eq paragraph
        expect(page).to have_content("Send")
      end
    end

    context "while in Drafts folder" do
      it "shows the details of the selected thread if the thread has more than one message" do
        paragraph = Faker::Lorem.paragraph
        create(:email, thread: @b_thread1, sender: @barack,
                body: paragraph, subject: @b_thread1.subject, draft: true)

        find('#drafts-folder').trigger('click')
        find('.email-list-item-div').trigger('click')

        expect(page).to have_content("Hey Hill, I just wanted to check in. Is everything going alright?")
        expect(page).to have_content("Oct 1")
        expect(page).to have_content("Hey Barack")
        expect(page).to have_content("Yeah, things are tough right now")
        expect(page).to have_content("Thanks for the nice words, Barack")
        expect(page).to have_content("Hillary Clinton")
        expect(page).to have_content("Barack Obama")
        expect(page).to have_content("Oct 2")
        expect(page).to have_content("to barack@maildog.xyz")
        expect(page).to have_content("to hillary@maildog.xyz")
      end

      it "pops up ComposeEmailBox view if the thread only contains the draft message" do
        paragraph = Faker::Lorem.paragraph
        sentence = Faker::Lorem.sentence
        create(:email, draft: true, body: paragraph, subject: sentence,
               thread: create(:email_thread, subject: sentence, owner: @barack))
        find('#drafts-folder').trigger('click')
        wait_for_ajax
        find('.email-list-item-div').trigger('click')

        expect(page).to have_content("From barack@maildog.xyz")
        expect(page).to have_content("To")
        expect(page).to have_content("Send")
        expect(page).to have_content("New Message")
      end

      it "doesn't pop up ComposeEmailBox view if draft message is already popped up"
      it "doesn't pop up more than two ComposeEmailBox views at a time"
    end
  end
end
