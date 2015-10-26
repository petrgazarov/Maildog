module IntegrationTestsHelpers
  def click_sign_up_button_and_expect_content(content, on_page)
    page.execute_script("$('form .blue-button').trigger('click');")
    
    if on_page
      expect(page).to have_content(content)
    else
      expect(page).not_to have_content(content)
    end
  end

  def create_barack_user_and_contact
    user = create(:user_with_password, username: "barack",
                  first_name: "Barack", last_name: "Obama", password: "password")
    create(:contact, owner: user, email: user.email)
  end
end
