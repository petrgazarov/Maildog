RSpec.feature "Email Thread List", js: true, type: :feature do
  context "when initially logged in" do
    before(:each) do
      seed_for_one_thread_and_sign_in_as_barack
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

  describe "check box" do
    scenario "hard refresh of the page removes all checks" do
      seed_for_one_thread_and_sign_in_as_barack

      find('.check-box').trigger('click')
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be true

      #reload page
      page.visit page.current_path
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be false
    end

    scenario "clicking the check box toggles the checked value of the thread" do
      seed_for_one_thread_and_sign_in_as_barack

      find('.check-box').trigger('click')
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be true

      find('.check-box').trigger('click')
      wait_for_ajax
      thread = EmailThread.find(@b_thread1.id)
      expect(thread.checked).to be false
    end

    context "in any non-trash folder" do
      scenario "clicking the check box triggers email options to display a "\
               "different template" do

        seed_for_one_thread_and_sign_in_as_barack
        find('.check-box').trigger('click')
        expect(page).to have_content("Delete")
        find('.check-box').trigger('click')
        expect(page).to_not have_content("Delete")
        wait_for_ajax
      end

      context "when a thread is checked" do
        scenario "clicking 'Delete' button moves the checked thread to trash" do

          seed_for_one_thread_and_sign_in_as_barack
          find('.check-box').trigger('click')
          find('button', text: "Delete")
          page.execute_script("$('#delete-email-thread').trigger('click');")
          wait_for_ajax
          expect(page).to have_content('The conversation has been moved to trash')
          expect(page).not_to have_content('Delete')

          click_on_trash_folder
          wait_for_ajax
          expect(page).to have_content('checking in')

          thread_query = EmailThread.where(owner: @barack)
          expect(thread_query.first.emails.all? { |email| email.trash }).to be true
        end
      end

      context "when several threads are checked" do
        scenario "clicking 'Delete' button moves the checked threads to trash" do
          seed_for_two_threads
          sign_in_as('barack', "password")
          find('button', text: 'Log out')
          wait_for_ajax

          all(:css, '.check-box').each { |box| box.trigger('click') }
          find('button', text: "Delete")
          page.execute_script("$('#delete-email-thread').trigger('click');")
          wait_for_ajax

          expect(page).to have_content('The conversations have been moved to trash')
          expect(page).not_to have_content('Delete')

          click_on_trash_folder
          wait_for_ajax
          expect(page).to have_content('checking in')
          expect(page).to have_content('hi')

          expect(barack_has_no_emails_other_than_trash).to be true
        end
      end
    end

    context "in trash folder" do
      before(:each) do
        seed_for_two_threads
        @b_thread1.emails.first.update(trash: true)
        sign_in_as("barack", "password")
        click_on_trash_folder
        wait_for_ajax
      end

      scenario "clicking the check box triggers email options to display a "\
               "different template" do

        first('.check-box').trigger('click')
        expect(page).to have_content("Delete Forever")
        expect(page).to have_content("Recover")

        first('.check-box').trigger('click')
        expect(page).to_not have_content("Delete Forever")
        expect(page).to_not have_content("Recover")
        wait_for_ajax
      end

      context "when a thread is checked" do
        scenario "clicking the 'Delete Forever' button deletes the trash "\
                 "emails of the checked thread"

        scenario "clicking the 'Recover' button recovers the trash emails of "\
                 "the checked thread"
      end
      context "when several threads are checked" do
        scenario "clicking the 'Delete Forever' button deletes the trash emails "\
                 "from each checked thread"
        scenario "clicking the 'Recover' button recovers the trash emails from "\
                 "each checked thread"
      end
    end
  end

  describe "star icon" do
    before(:each) do
      seed_for_one_thread_and_sign_in_as_barack
    end

    scenario "clicking star icon toggles the starred value of the displayed email" do

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

    scenario "clicking star icon adds email thread to the Starred folder list" do
      find('.star').trigger('click')
      wait_for_ajax
      click_on_starred_folder
      expect(page).to have_content(
        "Thanks for the nice words, Barack, catch up in a few."
      )
      expect(page).to have_content("checking in")
    end
  end

  describe "clicking on email thread list item in any folder other than Drafts" do
    before(:each) do
      seed_for_one_thread_and_sign_in_as_barack
      find('.email-list-item-link').trigger('click')
      wait_for_ajax
    end

    it "triggers EmailOptions view to display the correct template" do
      find('button#email-show-back-button')
      find('button#delete-email-thread')
      find('div.label-as-button-container')
    end

    it "initializes ShowEmailThread view and shows the details of the selected thread" do
      expect(page).to have_content(
        "Hey Hill, I just wanted to check in. Is everything going alright?"
      )
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

  describe "clicking on email thread list item while in Drafts folder" do
    before(:each) do
      seed_for_one_thread_and_sign_in_as_barack
    end

    it "shows the details of the selected thread if the thread has more than one message" do
      paragraph = Faker::Lorem.paragraph
      create(:email, thread: @b_thread1, sender: @barack,
              body: paragraph, subject: @b_thread1.subject, draft: true)

      click_on_drafts_folder
      find('.email-list-item-div').trigger('click')

      expect(page).to have_content(
        "Hey Hill, I just wanted to check in. Is everything going alright?"
      )
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
      click_on_drafts_folder
      wait_for_ajax
      find('.email-list-item-div').trigger('click')

      expect(page).to have_content("From barack@maildog.xyz")
      expect(page).to have_content("To")
      expect(page).to have_content("Send")
      expect(page).to have_content("New Message")
      expect(find('form.compose-email-popup textarea').value).to eq paragraph
      expect(find("form input[name='email[subject]']").value).to eq sentence
    end

    it "doesn't pop up ComposeEmailBox view if draft message is already popped up" do
      create(:email, draft: true, thread: create(:email_thread, owner: @barack))

      click_on_drafts_folder
      wait_for_ajax
      find('.email-list-item-div').trigger('click')
      find('form.compose-email-popup')
      find('.email-list-item-div').trigger('click')
      expect(page).to have_content('This draft is already opened')

      # check that there is only one popup one the page
      find('form.compose-email-popup')
    end

    it "doesn't pop up more than two ComposeEmailBox views at a time" do
      3.times do
        create(:email, draft: true, thread: create(:email_thread, owner: @barack))
      end

      click_on_drafts_folder
      wait_for_ajax
      find('.email-list-item-div', match: :first)
      all('.email-list-item-div')[0..1].each(&:click)
      find('form.compose-email-popup', match: :first)

      all('.email-list-item-div')[2].click
      expect(page).to have_content('Please close one of the windows and try again')
      expect(all('form.compose-email-popup').count).to be 2
    end
  end
end
