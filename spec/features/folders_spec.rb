RSpec.feature "Folders", js: true, type: :feature do
  describe "navigating to folders using sidebar links" do
    before(:each) do
      seed_for_one_thread_and_sign_in_as_barack
      wait_for_ajax
    end

    it "shows Inbox folder" do
      find('#starred-folder')
      find('#starred-folder').trigger('click')
      find('#inbox-folder')
      find('#inbox-folder').trigger('click')
      expect(page).to have_content(
        "Thanks for the nice words, Barack, catch up in a few.")
      expect(page).to have_content("checking in")
      expect(page).to have_content("Hillary Clinton")
    end

    it "shows Starred folder" do
      @b_thread1.emails.order(time: :asc).first.update(starred: true)
      find('#starred-folder')
      find('#starred-folder').trigger('click')
      expect(page).to have_content(
        "Hey Hill, I just wanted to check in. Is everything going alright?")
      expect(page).to have_content("checking in")
      expect(page).to have_content("Hillary Clinton")
    end

    it "shows Sent Mail folder" do
      find('#sent-folder')
      find('#sent-folder').trigger('click')
      expect(page).to have_content(
        "Thanks for the nice words, Barack, catch up in a few.")
      expect(page).to have_content("checking in")
      expect(page).to have_content("To: hillary")
    end

    it "shows Drafts folder" do
      subject = Faker::Lorem.word
      draft = create(:email, sender: @barack, draft: true, subject: subject,
              thread: create(:email_thread, owner: @barack, subject: subject))
      find('#drafts-folder')
      find('#drafts-folder').trigger('click')
      expect(page).to have_content(draft.subject)
      expect(page).to have_content(draft.body[0..30])
    end

    it "shows Trash folder" do
      @b_thread1.emails.order(time: :asc).first.update(trash: true)

      find('#trash-folder')
      find('#trash-folder').trigger('click')
      expect(page).to have_content(
        "Hey Hill, I just wanted to check in. Is everything going alright?")
      expect(page).to have_content("checking in")
      expect(page).to have_content("Hillary Clinton")
    end

    it "changes css styling of selected folder in the folder list" do
      expect(page.find('#inbox-folder')['style'])
        .to eq('color: rgb(221, 75, 57); font-weight: bold;')
      check_li_for_css_absence_except('#inbox-folder')

      find('#starred-folder').trigger('click')
      expect(page.find('#starred-folder')['style'])
        .to eq('color: rgb(221, 75, 57); font-weight: bold;')
      check_li_for_css_absence_except('#starred-folder')

      find('#sent-folder').trigger('click')
      expect(page.find('#sent-folder')['style'])
        .to eq('color: rgb(221, 75, 57); font-weight: bold;')
      check_li_for_css_absence_except('#sent-folder')

      find('#drafts-folder').trigger('click')
      expect(page.find('#drafts-folder')['style'])
        .to eq('color: rgb(221, 75, 57); font-weight: bold;')
      check_li_for_css_absence_except('#drafts-folder')

      find('#trash-folder').trigger('click')
      expect(page.find('#trash-folder')['style'])
        .to eq('color: rgb(221, 75, 57); font-weight: bold;')
      check_li_for_css_absence_except('#trash-folder')
    end
  end
end
