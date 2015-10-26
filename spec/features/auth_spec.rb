include IntegrationTestsHelpers

RSpec.feature "Sign up", js: true do
  before(:each) do
    visit '/users/new'
  end

  it "has a user sign up page" do
    expect(page).to have_content "Create account"
  end

  it "has a working link to sign in page" do
    click_on("Sign in")
    expect(page).to have_content "Sign in to continue"
  end

  it "form validates presence of first and last name" do
    page.execute_script("$('form .blue-button').trigger('click');")
    expect(page).to have_content("First name or last name cannot be blank")
  end
end
