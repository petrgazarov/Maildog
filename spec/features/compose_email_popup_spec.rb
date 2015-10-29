RSpec.feature "Compose Email Popup", js: true, type: :feature do
  it "displays sender as the logged in user"
  scenario "clicking on the trash can discards the draft and closes the popup"
  scenario "clicking on the cross icon saves the draft and closes the popup"
  scenario "clicking on the cross icon doesn't save the draft if none of the fields have been touched"
  scenario "clicking on the Send button sends the email and removes the popup"
  scenario "clicking on the Send button does not send the email if the recipient is missing"
  it "triggers an auto save of the draft on input to the form"
end
