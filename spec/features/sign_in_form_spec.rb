include IntegrationTestsHelpers

RSpec.feature "Sign in", js: true do
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
      page.execute_script("$('.sign-in-next-button').trigger('click');")
      expect(page).to have_content("Sorry, Maildog doesn't recognize that username")
    end
  end
end
