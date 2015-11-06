# Maildog

[Live link][live]

[live]: http://maildog.xyz/

## Welcome!

Maildog is a clone of Gmail built with Ruby on Rails and Backbone.js that I created
as my final project at App Academy to demonstrate my proficiency in the various aspects
of full-stack web development.

The single-page setup choice came naturally as I was looking for a responsive design to
provide quick UX.

## What did I use?

#### Languages
* Ruby
* JavaScript
* HTML/CSS

#### Frameworks
* Backbone.js
* Rails

#### Database
* PostgreSQL

#### Libraries
* Front-end
  * JQuery
  * JQuery.serializeJSON
  * moment.js
  * JQuery.transit

* Back-end
  * pg_search
  * jbuilder
  * figaro
  * BCrypt

#### Third party APIs:
* sendgrid

## What can I do on this website?

You can:

* Securely create an account
* Compose and send emails (delivered via sendgrid server)
* Receive emails from registered Maildog users
* Star emails
* Select multiple email threads with check boxes
* Save drafts
* Move emails and email threads to trash, recover and delete forever
* Create new labels
* Label email threads
* Search for content in emails

## What kind of problems did you have to solve?

Glad you asked! :)

* Front-end design
  * I wanted to create a design that makes sense both logically and technically.
    By that I mean Objects do what you expect them to. My backbone router swaps view in the
    main show container. How do outside-the-router views communicate with inside-the-router views?
    Router wouldn't be a good candidate here, because then it would be responsible for things outside of its $rootEl.
    Instead, I instantiated an object: an extension of Backbone.Events, that I used to trigger/listen to various events and optionally pass arguments around.
  * Many views are nested Composite Views, some serving as sub-routers that change between
    templates depending on what the user is viewing.

* Back-end design
  * Okay, so now you have your main folders plus user-generated labels, each fetching a
    different collection of email threads. It would be a waste to have a controller for each folder. Instead, I use
    [custom nested collection and member routes][routes]
    and have an EmailThreads and Labels controller that send back appropriate collections.
  * When are email conversations fetched?
    Well, not when you see the list. In the folder/label, when you see a list and a preview of
    the thread's most recent conversation, that is all that is fetched at that point. When you click on a list item, the full thread gets sent from the server.

## Tests

I wrote comprehensive unit and integration tests with RSpec and Capybara.

Capybara uses Poltergeist as its JavaScript driver.
Helper libraries are FactoryGirl and Faker.

Tests live [here][specs].

[specs]: /spec/

## Future To-Dos
- [x] Write unit and integration tests
- [ ] Write tests for JavaScript code
- [ ] Make emails draggable via jQuery-UI
- [ ] Users able to attach files to emails
- [ ] Pagination via Kaminari gem
- [ ] Emails style editing via marked or markdown.js
- [ ] User profile with photo upload option via AWS S3
- [ ] Chat with other users in real time via Faye gem
- [ ] Contacts page (all contacts are already being saved automatically)
- [ ] Enable receiving emails from outside Maildog
- [ ] Users able to change theme/background image

## Licence

MIT

[routes]: ./config/routes.rb
