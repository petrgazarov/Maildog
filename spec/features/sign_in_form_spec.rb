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
end
