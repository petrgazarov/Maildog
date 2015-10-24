require 'spec_helper'

RSpec.describe Contact do
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:owner) }
  it { should belong_to(:owner) }
  it { should have_many(:labels) }
  it { should have_many(:threads) }
  it { should have_many(:received_emails) }
  it { should have_many(:written_emails) }
  it { should have_many(:email_addressees) }

  it "is valid with email" do
    expect(build(:contact)).to be_valid
  end

  describe "::create_or_get" do
    context "when contact exists with the given email and owner" do
      before(:each) do
        @contact = create(:contact)
      end

      it "returns existing contact" do
        expect(Contact.create_or_get(@contact.email, @contact.owner)).to eq(@contact)
      end
    end

    context "when contact with given attributes does not exist and "\
            "current_user_contact is not given" do
      extend ExamplesHelper
      insert_before_for_contact_create_or_get

      it "returns a new contact instance that is not persisted to database" do
        expect(@return_value).to be_a(Contact)
        expect(@return_value.persisted?).to be false
      end

      it "returns a contact instance with the given email address and owner" do
        expect(@return_value.email).to eq(@contact.email)
        expect(@return_value.owner).to eq(@user)
      end
    end

    context "when contact with given attributes does not exist and "\
            "current_user_contact is given" do
      extend ExamplesHelper
      insert_before_for_contact_create_or_get

      it "returns a new contact instance that is not persisted to database" do
        expect(@return_value).to be_a(Contact)
        expect(@return_value.persisted?).to be false
      end

      it "returns a contact instance with same attributes as current_contact" do
        current_user_contact = build(:fully_filled_contact, email: "Test111@testtest.com")
        user = create(:user)
        return_value = Contact.create_or_get(@contact.email, user, current_user_contact)

        expect(return_value.email).to eq(current_user_contact.email)
        expect(return_value.owner).to eq(user)
        expect(return_value.first_name).to eq(current_user_contact.first_name)
        expect(return_value.last_name).to eq(current_user_contact.last_name)
        expect(return_value.job_title).to eq(current_user_contact.job_title)
        expect(return_value.photo_src_path).to eq(current_user_contact.photo_src_path)
        expect(return_value.birth_date).to eq(current_user_contact.birth_date)
        expect(return_value.gender).to eq(current_user_contact.gender)
      end

      it "returns a contact instance with the given owner" do
        expect(@return_value.owner).to eq(@user)
      end
    end
  end
end
