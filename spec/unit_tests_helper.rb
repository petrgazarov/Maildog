def insert_before_for_contact_create_or_get
  before(:each) do
    @contact = build(:contact)
    @user = create(:user_with_username_and_password)
    @return_value = Contact.create_or_get(@contact.email, @user)
  end
end

def insert_before_for_email_thread
  before(:each) do
    @email_thread = build(:email_thread_with_emails)
  end
end
