RSpec.feature "Labels", js: true, type: :feature do
  scenario "clicking 'Create new label' button puts an empty input field on the page"
  scenario "pressing enter or clicking away from the new label input removes the input field"
  scenario "pressing enter or clicking away from the new label input creates a new label"
  scenario "a label is not created when the input field is empty"
  scenario "clicking on the label shows the labeled email threads"
  scenario "clicking the cross next to the label name deletes the label"
end
