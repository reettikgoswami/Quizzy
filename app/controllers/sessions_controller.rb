class SessionsController < ApplicationController

  def create 
    @user = User.find_by(email: login_params[:email])
    if @user && @user.authenticate(login_params[:password]) 
      log_in @user
      render status: :ok, json: { success: "Logged in successfully!"}
    else
      render status: :unauthorized, json: { errors: "Incorrect login credentials" } 
    end
  end

  def show 
    if logged_in?
      render status: :ok, json: { user: current_user, authenticated: current_user.present? } 
    else
      render status: :unauthorized, json: { user: nil, authenticated: false }
    end
  end


  def destroy 
    if logged_in?
      log_out
      render status: :ok, json: { success: "Log out successfully!"}
    end
  end

  private

  def login_params 
    params.require(:user).permit(:email, :password)
  end

end
