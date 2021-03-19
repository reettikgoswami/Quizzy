class ApplicationController < ActionController::Base
  include SessionsHelper


  private

  def logged_in_user
      unless logged_in?
        render status: :unauthorized, json: {
        errors: "Wrong credentials"
      }
      end
  end

end
