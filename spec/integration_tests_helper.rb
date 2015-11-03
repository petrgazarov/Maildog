module IntegrationTestsHelpers
  def sign_in_as(username, password)
    visit "/session/new"
    find(:css, "input[name='user[username]']").set(username)
    page.execute_script("$('.sign-in-next-button').trigger('click');")
    find(:css, "input[name='user[password]']").set(password)
    page.execute_script("$('.sign-in-submit-button').trigger('click');")
  end

  def click_button_and_expect_content(selector, content, on_page)
    page.execute_script("$('#{selector}').trigger('click');")

    if on_page
      expect(page).to have_content(content)
    else
      expect(page).not_to have_content(content)
    end
  end

  def create_barack_user_and_contact
    barack_user = create(:barack_user)
    barack = create(:contact, owner: barack_user, email: barack_user.email,
                              first_name: "Barack", last_name: "Obama")
    [barack_user, barack]
  end

  def check_li_for_css_absence_except(selector)
    if selector != '#inbox-folder'
      expect(["", nil]).to include(page.find('#inbox-folder')['style'])
    end
    if selector != '#starred-folder'
      expect(["", nil]).to include(page.find('#starred-folder')['style'])
    end
    if selector != '#sent-folder'
      expect(["", nil]).to include(page.find('#sent-folder')['style'])
    end
    if selector != '#drafts-folder'
      expect(["", nil]).to include(page.find('#drafts-folder')['style'])
    end
    if selector != '#trash-folder'
      expect(["", nil]).to include(page.find('#trash-folder')['style'])
    end
  end
end

RSpec.configure do |config|
  config.include IntegrationTestsHelpers, type: :feature
end
