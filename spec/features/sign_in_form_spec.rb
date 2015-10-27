include IntegrationTestsHelpers

RSpec.feature "Sign in", js: true, type: :feature do
  before(:each) do
    visit '/session/new'
  end

  it "has a user sign in page" do
    expect(page).to have_content "Sign in to continue"
  end

  it "has a working link to create account from sign in page" do
    click_on("Create account")
    expect(page).to have_content "Create your Maildog account!"
  end

  it "has a link to sign in as demo user" do
    create_barack_user_and_contact
    find(".sign-in-as-guest-button").click

    expect(page).to have_content("Barack")
    expect(page).to have_content("Inbox")
    expect(page).to have_content("Log out")
  end

  describe "Submitting sign in form" do
    it "validates the username before going to the next step" do
      find(:css, "input[name='user[username]']").set(Faker::Internet.user_name)
      click_button_and_expect_content(
        '.sign-in-next-button', "Sorry, Maildog doesn't recognize that username", true)

      visit "/session/new"
      create_barack_user_and_contact
      find(:css, "input[name='user[username]']").set("barack")
      click_button_and_expect_content(
        '.sign-in-next-button', "Sorry, Maildog doesn't recognize that username", false)
    end

    it "has a link to sign in as different user once username is validated" do
      expect(page).not_to have_content('Sign in with a different account')
      create_barack_user_and_contact
      find(:css, "input[name='user[username]']").set("barack")

      click_button_and_expect_content(
        '.sign-in-next-button', 'Sign in with a different account', true)
    end

    it "has a working link to go back once username is validated" do
      create_barack_user_and_contact
      find(:css, "input[name='user[username]']").set("barack")
      page.execute_script("$('.sign-in-next-button').trigger('click');")

      click_button_and_expect_content('.back-arrow', 'Create account', true)
    end

    it "validates password" do
      create_barack_user_and_contact
      find(:css, "input[name='user[username]']").set("barack")
      find('.sign-in-next-button').click

      find('.sign-in-text-box').set("abc")
      click_button_and_expect_content(
        '.sign-in-submit-button', "The email and password you entered don't match.", true)
    end

    it "logs user in when the username/password combo is correct" do
      create_barack_user_and_contact
      sign_in_as("barack", "password")

      expect(page).not_to have_content("The email and password you entered don't match.")
      expect(page).to have_content("Barack")
      expect(page).to have_content("Inbox")
    end
  end
end
