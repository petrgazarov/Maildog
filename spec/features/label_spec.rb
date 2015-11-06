RSpec.feature "Labels", js: true, type: :feature do
  before(:each) do
    @barack_user, @barack = create_barack_user_and_contact
    sign_in_as("barack", "password")
    wait_for_ajax
  end

  scenario "clicking 'Create new label' button puts an empty input field on the page" do
    find('#create-new-label-button')
    page.execute_script("$('#create-new-label-button').trigger('click');")
    find('input.new-label-input')
    expect(find('input.new-label-input').value).to be_blank
  end

  scenario "pressing enter or clicking away from the new label input removes the input field" do
    find('#create-new-label-button')
    page.execute_script("$('#create-new-label-button').trigger('click');")
    find('input.new-label-input')
    page.execute_script("$('html').trigger('click');")
    expect(page).not_to have_css('input.new-label-input')
  end

  scenario "pressing enter or clicking away from the new label input creates a new label" do
    # testing click away
    find('#create-new-label-button')
    page.execute_script("$('#create-new-label-button').trigger('click');")
    find('input.new-label-input')
    label = Faker::Lorem.word
    find('input.new-label-input').set(label)
    page.execute_script("$('html').trigger('click');")
    wait_for_ajax
    expect(page).to have_content(label)
    expect(Label.find_by(name: label)).not_to be nil

    # testing enter key
    page.execute_script("$('#create-new-label-button').trigger('click');")
    find('input.new-label-input')
    another_label = Faker::Lorem.word
    find('input.new-label-input').set(another_label)
    find('input.new-label-input').native.send_keys(:return)
    wait_for_ajax
    expect(page).to have_content(another_label)
    expect(Label.find_by(name: another_label)).not_to be nil
  end

  scenario "a label is not created when the input field is empty" do
    # testing click away
    find('#create-new-label-button')
    page.execute_script("$('#create-new-label-button').trigger('click');")
    find('input.new-label-input')
    page.execute_script("$('html').trigger('click');")
    expect(page).not_to have_css('input.new-label-input')
    expect(Label.all).to be_empty

    # testing enter key
    find('#create-new-label-button')
    page.execute_script("$('#create-new-label-button').trigger('click');")
    find('input.new-label-input')
    find('input.new-label-input').native.send_keys(:return)
    expect(page).not_to have_css('input.new-label-input')
    expect(Label.all).to be_empty
  end

  scenario "clicking on the label shows the labeled email threads" do
    # create label and labeled thread
    thread = create(:email_thread_with_emails, owner: @barack)
    thread.emails.update_all(sender_id: @barack.id)
    label = thread.labels.create!(name: Faker::Lorem.word, owner: @barack)
    @barack.received_emails << thread.emails

    page.visit page.current_path
    find('ul.label-list li:first-child')
    page.execute_script("$('ul.label-list li:first-child').trigger('click');")
    wait_for_ajax
    expect(page).to have_content(thread.subject)
  end

  scenario "clicking the cross next to the label name deletes the label" do
    name = Faker::Lorem.word
    create(:label, owner: @barack, name: name)
    page.visit page.current_path
    wait_for_ajax
    page.execute_script("$('div#delete-label-cross').trigger('click');")
    wait_for_ajax
    expect(page).not_to have_content(name)
    expect(Label.all).to be_empty
  end
end
