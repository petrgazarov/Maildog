class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def current_user_contact
    current_user ? Contact.find_by(email: current_user.email) : nil
  end

  def logged_in?
    !!current_user
  end

  def log_in!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def log_out!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_user!
    redirect_to new_session_url unless logged_in?
  end

  def redirect_current_user
    redirect_to root_url if current_user
  end
end
