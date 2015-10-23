module ExamplesHelper
  def insert_before_for_contact_create_or_get
    before(:all) do
      @contact = build(:contact)
      @user = create(:user)
      @return_value = Contact.create_or_get(@contact.email, @user)
    end
  end
end
