include IntegrationTestsHelpers

RSpec.feature "Sign up" do
  it "has a user sign up page" do
    visit '/users/new'
    expect(page).to have_content "Create account"
  end

  it "has a working link to sign in page" do
    visit '/users/new'
    click_on("Sign in")
    expect(page).to have_content "Sign in to continue"
  end
end
