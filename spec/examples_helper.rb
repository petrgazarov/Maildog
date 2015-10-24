module ExamplesHelper
  def insert_before_for_contact_create_or_get
    before(:each) do
      @contact = build(:contact)
      @user = create(:user_with_password)
      @return_value = Contact.create_or_get(@contact.email, @user)
    end
  end
end
