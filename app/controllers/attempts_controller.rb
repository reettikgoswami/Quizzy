class AttemptsController < ApplicationController
  skip_before_action :logged_in_user 
  before_action :get_quiz, only: [:index, :create, :new, :show]
  before_action :get_user, only: [:create]

  def index 
    if @quiz.present?
      render status: :ok, json: { success: "Url is accessable" , quiz: @quiz}
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

    render status: :ok, json: { success: "User created successfully!",
                                user: @user.attributes.except("password_digest"),
                                attempt: @attempt }  
  end

  def new 
    @questions = @quiz.questions
    @question_with_options = @questions.map do |question| 
      { options: question.options.map {|option| option.attributes.except("is_correct") },
        question: question }
    end 

    render status: :ok, json: { quiz: @quiz, questions: @question_with_options }
  end

  def update 
    @attempt_answers = AttemptAnswer.create(attempt_param[:attempt])
    @attempt = Attempt.find_by(id: params[:id])
    @attempt.update(submitted: true)
    @attempt.store_correct_and_incorrect_answers_count 
    @attempt.save
    render status: :ok, json: { success: "Answers successfully submitted", }
  end

  def show 
    @attempt = Attempt.find_by(id: params[:id])
    @attempted_answer = @attempt.attempt_answers
    @questions = @quiz.questions
    @question_with_options = @questions.map do |question| 
      { options: question.options,
        question: question }
    end 
    render status: :ok, json: { attempted_answer: @attempted_answer, questions: @question_with_options, quiz: @quiz, attempt: @attempt}
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

  def attempt_param
    params.permit( attempt: [:attempt_id,:option_id, :question_id])
  end

end
