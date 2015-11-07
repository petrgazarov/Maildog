RSpec.feature "Email Thread Show", js: true, type: :feature do
  before(:each) do
    seed_for_one_thread_and_sign_in_as_barack
    wait_for_ajax
    click_on_email_list_item_link
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
    click_on_email_list_item_link
    wait_for_ajax
    click_on_back_button
    wait_for_ajax
    expect(current_url).to include("/#sent")

    # test for starred
    @b_thread1.emails.first.update(starred: true)
    click_on_starred_folder
    click_on_email_list_item_link
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
    click_on_email_list_item_link
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
      wait_for_ajax
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

        it "creates and saves a new instance of ThreadLabel", retry: 3 do
          expect(ThreadLabel.all).not_to be_empty
        end

        it "adds the thread to the email thread list for that label", retry: 3 do
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
               "selected email" do
        find('div.star', match: :first)
        find('div.star', match: :first).trigger('click')
        wait_for_ajax
        expect(page).to have_css('div.star-on')
        expect(Email.where(email_thread_id: @b_thread1.id)
                    .order(time: :asc).first.starred).to be true
      end
    end

    context "when the garbage can icon is clicked" do
      it "sets the trash value of the email to true", retry: 3 do
        click_first_garbage_can
        wait_for_ajax
        find('div', text: 'The message has been moved to the trash.', match: :first)
        expect(Email.where(email_thread_id: @b_thread1.id)
                    .order(time: :asc).first.trash).to be true
      end

      it "removes the email from the visible thread", retry: 3 do
        click_first_garbage_can
        wait_for_ajax
        find('div', text: 'The message has been moved to the trash.', match: :first)
        wait_for_ajax
        expect(page).not_to have_content(
          'Hey Hill, I just wanted to check in. Is everything going alright?')
      end

      it "puts the deleted email in the trash folder", retry: 3 do
        click_first_garbage_can
        wait_for_ajax
        find('div', text: 'The message has been moved to the trash.', match: :first)
        click_on_trash_folder
        wait_for_ajax
        expect(page).to have_content('checking in')
        expect(page).to have_content(
          'Hey Hill, I just wanted to check in. Is everything going alright?')
      end

      it "shows the deleted email in one thread with other deleted emails "\
         "from the same thread", retry: 3 do
        @b_thread1.emails.select do |e|
          e.body == 'Thanks for the nice words, Barack, catch up in a few.'
        end.first.update(trash: true)

        click_first_garbage_can
        wait_for_ajax
        find('div', text: 'The message has been moved to the trash.', match: :first)
        click_on_trash_folder
        wait_for_ajax
        expect(page).to have_content('Hillary Clinton (2)')
        expect(page).to have_content('checking in')
      end
    end
  end

  context "while in Trash folder" do
    scenario "clicking or 'Recover' buttons brings user back to the folder", retry: 3 do

      @b_thread1.emails[0..1].each { |e| e.update(trash: true) }
      click_on_trash_folder
      wait_for_ajax
      click_on_email_list_item_link
      wait_for_ajax
      click_on_recover
      find('div', text: "The conversation has been recovered.", match: :first)
      wait_for_ajax
      expect(page).to have_content('No conversations in Trash')
      wait_for_ajax
    end

    scenario "clicking or 'Delete Forever' buttons brings user back to "\
             "the folder", retry: 3 do

      @b_thread1.emails[0..1].each { |e| e.update(trash: true) }
      click_on_trash_folder
      wait_for_ajax
      click_on_email_list_item_link
      wait_for_ajax
      click_on_delete_forever
      find('div', text: 'The conversation has been deleted', match: :first)
      expect(page).to have_content('No conversations in Trash')
    end

    scenario "clicking 'Delete Forever' button deletes the trash emails "\
             "from the thread", retry: 3 do

      @b_thread1.emails[0..1].each { |e| e.update(trash: true) }
      click_on_trash_folder
      wait_for_ajax
      click_on_email_list_item_link
      wait_for_ajax
      click_on_delete_forever
      find('div', text: 'The conversation has been deleted', match: :first)
      find('aside', text: 'No conversations in Trash')
      wait_for_ajax
      expect(EmailThread.find(@b_thread1.id).emails.count).to be 2
    end

    scenario "clicking 'Recover' button puts the thread back to its folder", retry: 3 do
      @b_thread1.emails[0..1].each { |e| e.update(trash: true) }
      click_on_trash_folder
      wait_for_ajax
      click_on_email_list_item_link
      wait_for_ajax
      
      click_on_recover
      find('div', text: "The conversation has been recovered.", match: :first)
      wait_for_ajax
      find('aside', text: 'No conversations in Trash')
      click_on_inbox_folder
      wait_for_ajax
      expect(page).to have_content('Hillary Clinton (4)')
      expect(page).to have_content('checking in')
    end
  end
end
