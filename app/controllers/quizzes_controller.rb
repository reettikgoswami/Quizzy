class QuizzesController < ApplicationController
  
  before_action :logged_in_user, only: [:create, :index, :show, :update]

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
    @quiz = Quiz.find(params[:id]) 
    
    if @quiz.present?
      render status: :ok, json: { quiz: @quiz }
    else
      render :json => {:error => "not-found"}.to_json, :status => 404
    end
  end

  def update
    @quiz = Quiz.find(params[:id])
    if @quiz.update(quiz_params)
      render status: :ok, json: { success: "Quiz updated successfully." }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end

  def destroy
    @quiz = Quiz.find(params[:id])
    if @quiz.destroy
      render status: :ok, json: { success: "Quiz deleted successfully" }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end

  private 

  def quiz_params
    params.require(:quiz).permit(:name)
  end

end
