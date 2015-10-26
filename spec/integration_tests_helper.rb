module IntegrationTestsHelpers
  def sign_up(username)

  end

  def sign_in(username, password)

  end

  def click_sign_up_button_and_expect_content(content, on_page)
    page.execute_script("$('form .blue-button').trigger('click');")
    if on_page
      expect(page).to have_content(content)
    else
      expect(page).not_to have_content(content)
    end
  end
end
