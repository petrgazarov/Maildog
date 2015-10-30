RSpec.feature "Email Thread Show", js: true, type: :feature do
  context "when looking at a specific email thread" do
    scenario "clicking the 'Back' button takes the user back to the previous folder"

    context "while in any folder other than Trash" do
      scenario "clicking 'Delete' button moves the thread to the trash folder"
      scenario "clicking 'Delete' button updates trash value of each email in the thread"
      scenario "clicking 'Label as' button toggles the label list below the button"
      scenario "clicking away form the label list or on the list li element removes the list"

      describe "email thread labels" do
        scenario "clicking on a label in the label list changes its css background color"

        context "when thread is not labeled" do
          scenario "clicking on a label in the label list labels the thread"
        end

        context "when thread already has the label" do
          scenario "clicking on a label in the label list removes the label from the thread"
        end

        context "after the thread was labeled" do
          it "creates and saves a new instance of ThreadLabel"
          it "adds the thread to the email thread list for that label"
        end
      end

      context "when the star icon is clicked" do
        scenario "clicking the star icon changes the starred value of the selected email"
      end

      context "when the garbage can icon is clicked" do
        it "sets the trash value of the email to true"
        it "removes the email from the visible thread"
        it "puts the deleted email in the trash folder"
        it "shows the deleted email in one thread with other deleted emails from the same thread"
      end
    end

    context "while in Trash folder" do
      scenario "clicking 'Delete Forever' or 'Recover' buttons brings user back to the folder"
      scenario "clicking 'Delete Forever' button deletes the thread"
      scenario "clicking 'Recover' button puts the thread back to its folder"
    end
  end
end
