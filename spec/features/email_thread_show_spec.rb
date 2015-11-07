RSpec.feature "Email Thread Show", js: true, type: :feature do
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
    scenario "clicking 'Delete' button moves the thread to the trash folder" do
      click_on_delete_button
      expect(page).to have_content('The conversation has been moved to the Trash.')
      click_on_trash_folder
      wait_for_ajax
      expect(page).to have_content("checking in")
      expect(page).to have_css('a.email-list-item-link')
    end

    scenario "clicking 'Delete' button updates trash value of each email in "\
             "the thread" do
      click_on_delete_button
      wait_for_ajax
      expect(EmailThread.find(@b_thread1.id).emails
                        .select { |e| !e.trash }).to be_empty
    end

    scenario "clicking 'Label as' button toggles the label list below "\
             "the button", retry: 3 do
      click_on_label_as
      expect(page).to have_content('Label as:')
    end

    scenario "clicking away form the label list or on the list li element "\
             "removes the list", retry: 3 do
      create(:label, owner: @barack)

      click_on_label_as
      wait_for_ajax
      find('p', text: "Label as:")
      find('html').trigger('click')
      expect(page).not_to have_css('ul.email-options-label-list')

      click_on_label_as
      wait_for_ajax
      find('p', text: "Label as:")
      find('ul.email-options-label-list li')
      find('ul.email-options-label-list li').trigger('click')
      wait_for_ajax
      expect(page).not_to have_css('ul.email-options-label-list')
    end

    describe "email thread labels" do
      before(:each) do
        @label = create(:label, owner: @barack)
      end

      scenario "clicking on a label in the label list changes its css "\
               "background color", retry: 3 do
        click_on_label_as
        wait_for_ajax
        find('ul.email-options-label-list li')
        find('ul.email-options-label-list li').trigger('click')
        wait_for_ajax

        click_on_label_as
        wait_for_ajax
        find('ul.email-options-label-list li')
        expect(find('ul.email-options-label-list')).to have_css('li.pink-background')
      end

      context "when thread is not labeled" do
        scenario "clicking on a label in the label list labels the thread", retry: 3 do
          click_on_label_as
          wait_for_ajax
          find('ul.email-options-label-list li')
          find('ul.email-options-label-list li').trigger('click')
          wait_for_ajax

          expect(EmailThread.find(@b_thread1.id).labels).not_to be_blank
        end
      end

      context "when thread already has the label" do
        scenario "clicking on a label in the label list removes the label "\
                 "from the thread"
      end

      context "after the thread was labeled" do
        before(:each) do
          click_on_label_as
          wait_for_ajax
          find('ul.email-options-label-list li')
          find('ul.email-options-label-list li').trigger('click')
          wait_for_ajax
        end

        it "creates and saves a new instance of ThreadLabel" do
          expect(ThreadLabel.all).not_to be_empty
        end

        it "adds the thread to the email thread list for that label" do
          page.visit page.current_path
          wait_for_ajax
          click_on_label_li(@label.name)
          wait_for_ajax
          expect(page).to have_content("checking in")
          expect(page).not_to have_content("No conversations with this label")
        end
      end
    end

    context "when the star icon is clicked" do
      scenario "clicking the star icon changes the starred value of the "\
               "selected email"
    end

    context "when the garbage can icon is clicked" do
      it "sets the trash value of the email to true"
      it "removes the email from the visible thread"
      it "puts the deleted email in the trash folder"
      it "shows the deleted email in one thread with other deleted emails "\
         "from the same thread"
    end
  end

  context "while in Trash folder" do
    scenario "clicking 'Delete Forever' or 'Recover' buttons brings user back to the folder"
    scenario "clicking 'Delete Forever' button deletes the thread"
    scenario "clicking 'Recover' button puts the thread back to its folder"
  end
end
