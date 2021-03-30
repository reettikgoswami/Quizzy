class AttemptsController < ApplicationController
  skip_before_action :logged_in_user 
  before_action :get_quiz, only: [:index, :create]
  before_action :get_user, only: [:create]

  def index 
    if @quiz.present?
      render status: :ok, json: { success: "Url is accessable" }
    else 
    render :json => {:error => "Quiz not published!"}.to_json, status: :forbidden
    end
  end

  def create
    if @user.nil? 
      @user = User.create(user_params)
    end
    @attempt = Attempt.find_by(quiz_id: @quiz.id, user_id: @user.id)

    if @attempt.nil? 
      @attempt = Attempt.create(quiz_id: @quiz.id, user_id: @user.id )
    end

    if @user.nil? || @attempt.nil? 
      render status: :unprocessable_entity, json: { errors: "Something went wrong" }
    end

    render status: :ok, json: { success: "User created successfully!" , user: @user, attempt: @attempt }
  
  end

  def new 
  end

  def show 
  
  end


  private 

  def get_quiz 
    @quiz = Quiz.find_by(slug:  params[:public_slug])
  end

  def get_user 
    @user = User.find_by(email: user_params[:email])
  end

  def user_params 
   params.require(:user).permit(:first_name, :last_name, :email)
  end


end
