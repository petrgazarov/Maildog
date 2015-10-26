include IntegrationTestsHelpers

RSpec.feature "Sign up", js: true do
  before(:each) do
    visit '/users/new'
  end

  it "has a user sign up page" do
    expect(page).to have_content "Create account"
  end

  it "has a working link to sign in from sign up page" do
    click_on("Sign in")
    expect(page).to have_content "Sign in to continue"
  end

  describe "Submitting sign up form" do
    it "validates presence of first name and last name" do
      click_sign_up_button_and_expect_content(
        "First name or last name cannot be blank", true
      )

      visit '/users/new'
      find(:css, '.sign-up-first-name').set(Faker::Name.first_name)
      click_sign_up_button_and_expect_content(
        "First name or last name cannot be blank", true
      )

      visit '/users/new'
      find(:css, '.sign-up-last-name').set(Faker::Name.last_name)
      click_sign_up_button_and_expect_content(
        "First name or last name cannot be blank", true
      )

      visit '/users/new'
      find(:css, '.sign-up-first-name').set(Faker::Name.first_name)
      find(:css, '.sign-up-last-name').set(Faker::Name.last_name)
      click_sign_up_button_and_expect_content(
        "First name or last name cannot be blank", false
      )
    end

    it "validates presence of username" do
      click_sign_up_button_and_expect_content("Username cannot be blank", true)

      visit '/users/new'
      find(:css, "input[name = 'user[username]']").set(Faker::Internet.user_name)
      click_sign_up_button_and_expect_content("Username cannot be blank", false)
    end

    it "validates presence of password" do
      click_sign_up_button_and_expect_content("Password cannot be blank", true)

      visit '/users/new'
      find(:css, ".sign-up-password").set(Faker::Internet.password)
      click_sign_up_button_and_expect_content("Password cannot be blank", false)
    end

    it "validates the length of the password to be minimum of 6 characters" do
      find(:css, ".sign-up-password").set(Faker::Internet.password(3))
      click_sign_up_button_and_expect_content("Password must be minimum 6 characters", true)
    end

    it "validates that the entered passwords match" do
      find(:css, ".sign-up-password").set("test123")
      find(:css, ".sign-up-confirm-password").set("test234")
      click_sign_up_button_and_expect_content("Passwords you entered didn't match", true)

      visit '/users/new'
      find(:css, ".sign-up-password").set("test123")
      find(:css, ".sign-up-confirm-password").set("test123")
      click_sign_up_button_and_expect_content("Passwords you entered didn't match", false)
    end

    it "validates date" do
      find(:css, "input[name = 'birthday-day']").set(Faker::Lorem.word)
      find(:css, "input[name = 'birthday-year']").set(Faker::Lorem.word)
      click_sign_up_button_and_expect_content("Date is invalid", true)

      visit '/users/new'
      find(:css, "input[name = 'birthday-day']").set(Faker::Number.between(1, 30))
      find(:css, "input[name = 'birthday-year']").set(Faker::Number.between(1900, 2000))
      click_sign_up_button_and_expect_content("Date is invalid", false)
    end

    it "validates that user agreed to be awesome" do
      click_sign_up_button_and_expect_content("You must agree to be awesome", true)

      visit '/users/new'
      find(:css, ".sign-up-checkbox").set(true)
      click_sign_up_button_and_expect_content("You must agree to be awesome", false)
    end

    it "validates uniqueness of username" do
      create(:user_with_password, username: "petr")

      find(:css, '.sign-up-first-name').set(Faker::Name.first_name)
      find(:css, '.sign-up-last-name').set(Faker::Name.last_name)
      find(:css, "input[name = 'user[username]']").set("petr")
      find(:css, ".sign-up-password").set("test123")
      find(:css, ".sign-up-confirm-password").set("test123")
      find(:css, ".sign-up-checkbox").set(true)
      click_sign_up_button_and_expect_content("This username is already taken", true)
    end

    it "successfully registers user when form is valid" do
      first_name = Faker::Name.first_name

      find(:css, '.sign-up-first-name').set(first_name)
      find(:css, '.sign-up-last-name').set(Faker::Name.last_name)
      find(:css, "input[name = 'user[username]']").set("petr")
      find(:css, ".sign-up-password").set("test123")
      find(:css, ".sign-up-confirm-password").set("test123")
      find(:css, ".sign-up-checkbox").set(true)
      click_sign_up_button_and_expect_content("This username is already taken", false)

      expect(page).to have_content(first_name)
      expect(page).to have_content("Inbox")
      expect(page).to have_content("Log out")
    end
  end
end
