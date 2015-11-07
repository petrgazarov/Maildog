module IntegrationTestsHelpers
  def sign_in_as(username, password)
    visit "/session/new"
    find(:css, "input[name='user[username]']").set(username)
    page.execute_script("$('.sign-in-next-button').trigger('click');")
    find(:css, "input[name='user[password]']").set(password)
    page.execute_script("$('.sign-in-submit-button').trigger('click');")
  end

  def click_button_and_expect_content(selector, content, on_page)
    page.execute_script("$('#{selector}').trigger('click');")

    if on_page
      expect(page).to have_content(content)
    else
      expect(page).not_to have_content(content)
    end
  end

  def create_barack_user_and_contact
    barack_user = create(:barack_user)
    barack = create(:contact, owner: barack_user, email: barack_user.email,
                              first_name: "Barack", last_name: "Obama")
    [barack_user, barack]
  end

  def check_li_for_css_absence_except(selector)
    if selector != '#inbox-folder'
      expect(["", nil]).to include(page.find('#inbox-folder')['style'])
    end
    if selector != '#starred-folder'
      expect(["", nil]).to include(page.find('#starred-folder')['style'])
    end
    if selector != '#sent-folder'
      expect(["", nil]).to include(page.find('#sent-folder')['style'])
    end
    if selector != '#drafts-folder'
      expect(["", nil]).to include(page.find('#drafts-folder')['style'])
    end
    if selector != '#trash-folder'
      expect(["", nil]).to include(page.find('#trash-folder')['style'])
    end
  end

  def click_compose_button
    find('button.compose-button')
    page.execute_script("$('button.compose-button').trigger('click');")
  end

  def send_email_from_popup(options)
    click_compose_button
    find('form.compose-email-popup')

    find("input[name='email[addressees][email]']").set(options[:recipient])
    find("input[name='email[subject]']").set(options[:subject])
    find('form.compose-email-popup textarea').set(options[:body])

    page.execute_script(
      "$('form.compose-email-popup button.blue-button').trigger('click');"
    )
  end

  def create_fake_subject_body_and_recipient
    subject = Faker::Lorem.word
    body = Faker::Lorem.paragraph
    # make sure email address is fake
    recipient = "//#{Faker::Internet.email}a"

    [subject, body, recipient]
  end

  def create_self_addressed_thread_with_emails
    thread = create(:email_thread_with_emails, owner: @barack)
    thread.emails.update_all(sender_id: @barack.id)
    @barack.received_emails << thread.emails

    thread
  end

  def seed_for_one_thread_and_sign_in_as_barack
    seed_for_one_thread
    sign_in_as("barack", "password")
  end

  def barack_has_no_emails_other_than_trash
    @barack.received_emails.select { |email| !email.trash }.empty? &&
      @barack.written_emails.select { |email| !email.trash }.empty?
  end

  def click_on_inbox_folder
    find('#inbox-folder')
    find('#inbox-folder').trigger('click')
  end

  def click_on_starred_folder
    find('#starred-folder')
    find('#starred-folder').trigger('click')
  end

  def click_on_sent_folder
    find('#sent-folder')
    find('#sent-folder').trigger('click')
  end

  def click_on_drafts_folder
    find('#drafts-folder')
    find('#drafts-folder').trigger('click')
  end

  def click_on_trash_folder
    find('#trash-folder')
    find('#trash-folder').trigger('click')
  end

  def click_on_back_button
    find('button', text: "Back")
    find('button', text: "Back").trigger('click')
  end

  def click_on_label_as
    find('div.label-as-button-container')
    find('div.label-as-button-container').trigger('click')
  end

  def click_on_delete_button
    find('button', text: "Delete")
    find('button', text: "Delete").trigger('click')
  end

  def click_on_label_li(name)
    find('li', text: name)
    find('li', text: name).trigger('click')
  end

  def click_first_garbage_can
    find('aside.icon-garbage-can', match: :first)
    find('aside.icon-garbage-can', match: :first).trigger('click')
  end

  def click_on_recover
    find('button', text: "Recover")
    find('button', text: "Recover").trigger('click')
  end

  def click_on_delete_forever
    find('button', text: "Delete Forever")
    find('button', text: "Delete Forever").trigger('click')
  end

  def click_on_email_list_item_link
    find('a.email-list-item-link')
    find('a.email-list-item-link').trigger('click')
  end
end

RSpec.configure do |config|
  config.include IntegrationTestsHelpers, type: :feature
end
