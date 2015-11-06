RSpec.feature "Compose Email Popup", js: true, type: :feature do
  before(:each) do
    @barack_user, @barack = create_barack_user_and_contact
    sign_in_as("barack", "password")
  end

  it "pops up a compose email form when Compose button is clicked" do
    click_compose_button
    find('form.compose-email-popup')
    expect(page).to have_content('New Message')
    expect(page).to have_content('Send')
  end

  it "displays sender as the logged in user" do
    click_compose_button
    find('pre.compose-email-from')
    expect(find('pre.compose-email-from').text).to eq "From #{@barack.email}"
  end

  scenario "clicking on the trash can discards the draft and closes the popup" do
    click_compose_button
    find('form.compose-email-popup textarea').set(Faker::Lorem.paragraph)
    find("p", text: 'Saving')
    find("p", text: 'Saved')
    page.execute_script("$('aside.icon-garbage-can').trigger('click');")
    wait_for_ajax
    expect(page).not_to have_css('form.compose-email-popup')
    expect(Email.all).to be_empty
  end

  scenario "clicking on the cross icon saves the draft and closes the popup" do
    click_compose_button
    draft_body = Faker::Lorem.paragraph
    find('form.compose-email-popup textarea').set(draft_body)
    page.execute_script("$('#cancel-compose-box-popup').trigger('click');")
    expect(page).not_to have_css('form.compose-email-popup')
    wait_for_ajax
    sleep(3)
    wait_for_ajax
    expect(Email.where(body: draft_body)).not_to be_empty
  end

  scenario "clicking on the cross icon doesn't save the draft if none of the "\
           "fields have been touched" do
     click_compose_button
     find('form.compose-email-popup')
     page.execute_script("$('#cancel-compose-box-popup').trigger('click');")
     expect(page).not_to have_css('form.compose-email-popup')
     wait_for_ajax
     sleep(3)
     wait_for_ajax
     expect(Email.all).to be_empty
  end

  context "clicking the Send button" do
    it "saves the email and removes the popup" do
      subject, body, recipient = create_fake_subject_body_and_recipient

      send_email_from_popup({ body: body, subject: subject, recipient: recipient })
      expect(page).not_to have_css('form.compose-email-popup')
      wait_for_ajax
      expect(Email.where(body: body, subject: subject)).not_to be_empty
    end

    it "creates a new email thread for the email" do
      subject, body, recipient = create_fake_subject_body_and_recipient

      send_email_from_popup({ body: body, subject: subject, recipient: recipient })
      wait_for_ajax

      expect(EmailThread.all).not_to be_empty
      expect(EmailThread.find_by(subject: subject, owner: @barack)
                        .emails.first.body).to eq(body)
    end

    it "creates a new contact if user does not have a contact with the "\
       "matching email address" do
       subject, body, recipient = create_fake_subject_body_and_recipient

       send_email_from_popup({ body: body, subject: subject, recipient: recipient })
       wait_for_ajax

       expect(Contact.count).to eq 2
       expect(
         Contact.find_by(email: recipient, owner: @barack_user)).not_to be_blank
    end

    it "does not create a new contact if user has a contact with a matching "\
       "email address" do
       subject, body, recipient = create_fake_subject_body_and_recipient
       create(:contact, email: recipient, owner: @barack_user)

       send_email_from_popup({ body: body, subject: subject, recipient: recipient })
       wait_for_ajax

       expect(Contact.count).to eq 2
    end

    it "creates a new EmailAddressee" do
      subject, body, recipient = create_fake_subject_body_and_recipient

      send_email_from_popup({ body: body, subject: subject, recipient: recipient })
      wait_for_ajax

      expect(EmailAddressee.count).to eq 1
      new_contact = Contact.find_by(email: recipient, owner: @barack_user)
      expect(EmailAddressee.where(addressee_id: new_contact.id)).not_to be_blank
    end

    it "does not send the email if the recipient field is empty" do
      subject, body = create_fake_subject_body_and_recipient
      send_email_from_popup({ body: body, subject: subject, recipient: "" })

      expect(page).to have_content('Looks like you forgot to include a recipient!')
      expect(page).to have_css('form.compose-email-popup')
      expect(Email.all).to be_blank
    end
  end

  it "triggers an auto save of the draft on input to the form" do
    click_compose_button
    subject, body = create_fake_subject_body_and_recipient

    find('form.compose-email-popup textarea').set(body)
    find("p", text: 'Saving')
    find("p", text: "Saved")
    wait_for_ajax
    expect(Email.count).to eq 1
    expect(Email.where(body: body)).not_to be_empty

    find("input[name='email[subject]']").set(subject)
    find("p", text: 'Saving')
    find("p", text: "Saved")
    wait_for_ajax

    expect(Email.count).to eq 1
    expect(Email.where(body: body, subject: subject)).not_to be_empty
  end
end
