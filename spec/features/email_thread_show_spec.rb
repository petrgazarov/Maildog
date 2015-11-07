RSpec.feature "Email Thread Show", js: true, type: :feature do
  context "when looking at a specific email thread" do
    before(:each) do
      seed_for_one_thread_and_sign_in_as_barack
      wait_for_ajax
      find('a.email-list-item-link').trigger('click')
      wait_for_ajax
    end

    scenario "clicking the 'Back' button takes the user back to the "\
             "previous folder" do
      # test for inbox
      click_on_back_button
      wait_for_ajax
      expect(current_url).to include("/#inbox")

      # test for sent
      click_on_sent_folder
      find('a.email-list-item-link').trigger('click')
      wait_for_ajax
      click_on_back_button
      wait_for_ajax
      expect(current_url).to include("/#sent")

      # test for starred
      @b_thread1.emails.first.update(starred: true)
      click_on_starred_folder
      find('a.email-list-item-link').trigger('click')
      wait_for_ajax
      click_on_back_button

      wait_for_ajax
      expect(current_url).to include("/#starred")

      # test for drafts
      @b_thread1.emails.create!(draft: true, sender_id: @barack.id,
          body: Faker::Lorem.paragraph, subject: Faker::Lorem.word)
      click_on_drafts_folder
      find('div.email-list-item-div').trigger('click')
      wait_for_ajax
      click_on_back_button

      wait_for_ajax
      expect(current_url).to include("/#drafts")

      # test for trash
      @b_thread1.emails.first.update(trash: true)
      click_on_trash_folder
      find('a.email-list-item-link').trigger('click')
      wait_for_ajax
      click_on_back_button

      wait_for_ajax
      expect(current_url).to include("/#trash")
    end

    context "while in any folder other than Trash" do
      scenario "clicking 'Delete' button moves the thread to the trash folder"
      scenario "clicking 'Delete' button updates trash value of each email in the thread"
      scenario "clicking 'Label as' button toggles the label list below the button"
      scenario "clicking away form the label list or on the list li element removes the list"

      describe "email thread labels" do
        scenario "clicking on a label in the label list changes its css background color"

        context "when thread is not labeled" do
          scenario "clicking on a label in the label list labels the thread"
        end

        context "when thread already has the label" do
          scenario "clicking on a label in the label list removes the label from the thread"
        end

        context "after the thread was labeled" do
          it "creates and saves a new instance of ThreadLabel"
          it "adds the thread to the email thread list for that label"
        end
      end

      context "when the star icon is clicked" do
        scenario "clicking the star icon changes the starred value of the selected email"
      end

      context "when the garbage can icon is clicked" do
        it "sets the trash value of the email to true"
        it "removes the email from the visible thread"
        it "puts the deleted email in the trash folder"
        it "shows the deleted email in one thread with other deleted emails from the same thread"
      end
    end

    context "while in Trash folder" do
      scenario "clicking 'Delete Forever' or 'Recover' buttons brings user back to the folder"
      scenario "clicking 'Delete Forever' button deletes the thread"
      scenario "clicking 'Recover' button puts the thread back to its folder"
    end
  end
end
