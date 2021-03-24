class QuizzesController < ApplicationController  
  before_action :get_quiz, only: [:show, :update, :destroy]
  
  def index 
    @quizzes = Quiz.order('created_at DESC')
    render status: :ok, json: { quizzes: @quizzes }
  end

  def create
    @quiz = current_user.quizzes.build(quiz_params)
      
    if @quiz.save 
      render status: :ok, json: { success: "Quiz successfully created!" }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end

  def show 
    @questions = @quiz.questions
    @question_with_options = @questions.map {|question| { options: question.options, question: question }} 

    render status: :ok, json: { quiz: @quiz , questions: @question_with_options }
    
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { success: "Quiz updated successfully." }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { success: "Quiz deleted successfully" }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end

  private 

  def get_quiz 
    @quiz = Quiz.find(params[:id])
    unless @quiz.present?
      render :json => {:error => "not-found"}.to_json, :status => 404
    end 
  end


  def quiz_params
    params.require(:quiz).permit(:name)
  end

end
