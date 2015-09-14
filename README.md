# Maildog

[Heroku link][heroku]

[heroku]: https://maildog.herokuapp.com/

## Minimum Viable Product
Maildog is a clone of Gmail built on Rails and Backbone. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] View and send emails
- [ ] Reply to and forward emails
- [ ] Save unfinished emails in the Drafts folder
- [ ] Star emails
- [ ] Search entire content by text fragment
- [ ] Search entire content by sender/receiver
- [ ] See search results instantly (typeahead search)
- [ ] Edit text style in their emails (font, font-size, font-color, font weight and indentation)
- [ ] label and organize emails in folders

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
* Implement user authentication in Rails.
* Build pages: sessions/new (2), users/new (2).
* Push project to heroku and ensure that everything works.

By the end of this phase, users will be able to sign in and sign up using
text forms provided on backbone views.

[Details][phase-one]

### Phase 2: Creating Emails and Viewing a List of Emails (~1 day)
* Set up the layout of the MailIndex Backbone View.
* Create EmailIndex, EmailListItem and EmailCompose Backbone Views.

By the end of this phase users will be able to create (fake) emails and view a list of their emails on their mail homepage.

[Details][phase-two]

### Phase 3: Showing Emails, Folders, Labels and Contacts (~2 days)
* Create EmailThreadIndex, EmailShow, EmailAddressList and EmailAddressListItem Backbone views.
* Add routes to show emails.
* Create Folder and Label Backbone Models and Collections.
* Create user interface and functionality for organizing emails.
* Create Contacts model to hold email addresses and names of all senders/receivers that the user corresponds with.

By the end of this phase, users will be able to view individual emails and email threads, move emails between folders, star, check and delete emails and create custom labels.

[Details][phase-three]

### Phase 4: Sending/Receiving Emails (~1-2 days)
A basic guideline on implementing emails in Rails:
http://altoros.github.io/2014/email-on-rails/

* Sending emails: ActionMailer::Base class (Rails). Build EmailMessagesController to
handle send/edit/save actions.
* Mailman gem for receiving emails.
* Configure Email server (3rd party, e.g. gmail, yahoo, etc).
* LetterOpener, MailCatcher, Mailtrap for development environment.
* Sidekiq gem for sending emails asynchronously.

By the end of this phase, users will be able to send real emails to real people. CC and BCC functionality will also be configured at this stage.

[Details][phase-four]

### Phase 5: Styling and Formatting Emails (~1 day)
* Use third-party gems to add markdown functionality to emails. Make sure that the Markdown is properly escaped when displaying emails.
* Integrate Filepicker for file upload so users can attach files to emails.
* Ensure emails are sent/received with correct formatting before moving on to the next stage.

By the end of this stage, users will be able to edit email body with their choice of font, font-weight, font-style, font-size, font-color and indentation.

[Details][phase-five]

### Phase 6: Search (~1 day)
* Implement search bar to search for messages by text or by sender/receiver.
* Add typeahead search feature.
* Add Search routes to both Emails and Contacts controllers.
* Add SearchBox and EmailSearchItem Backbone Views.

By the end of this stage users will be able to dynamically search for content in their messages.  

[Details][phase-six]


### Phase 7: CSS Styling (~1 day)

* Make it look like Gmail using CSS.

By the end of this phase, users will accidentally confuse Maildog with their Gmail account.

[Details][phase-seven]

### Phase 8: Chat (~1 day)

* Create ChatBox and ChatItem Backbone Views.
* Use third-party gem for instant message functionality.

By the end of this phase, users will be able to send instant messages to other users and receive responses.

[Details][phase-eight]

### Bonus Features (TBD)
- [ ] Users able to change theme/background image
- [ ] Users able to mark emails unread
- [ ] Multiple sessions/session management
- [ ] Users able to attach files to emails
- [ ] Users able to attach files by dragging them into the email body
- [ ] Users able to set custom signature
- [ ] Vacation automatic responder
- [ ] User profile
- [ ] Contacts page
- [ ] Display time of last account activity
- [ ] Users able to set maximum page size (number of messages displayed)
- [ ] Users able to print emails
- [ ] User able to change display density (layout)
- [ ] "Pop in new window" button for emails
- [ ] Display total size of content in GB
- [ ] Chat with other users in real time
- [ ] View their chat history

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
