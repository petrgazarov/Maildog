class StaticPagesController < ApplicationController
  before_action :require_user!

  def mail
    remove_checks_from_current_users_emails
  end
end
