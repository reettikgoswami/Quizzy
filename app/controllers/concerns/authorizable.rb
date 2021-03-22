# frozen_string_literal: true

module Authorizable
  extend ActiveSupport::Concern

  def log_in(user)
    session[:user_id] = user.id
  end

  def logged_in?
    current_user.present?
  end

  def log_out
    session.delete(:user_id)
  end

  def current_user
    if (user_id = session[:user_id])
       User.find_by(id: user_id)
    end
  end

  def logged_in_user
      unless logged_in?
        render status: :unauthorized, json: {
        errors: "Wrong credentials"
      }
      end
  end

end