class QuestionsController < ApplicationController
  before_action :get_quiz, only: [:create, :destroy]
  before_action :get_question, only: [:show, :update, :destroy]

  def create 
    @question = @quiz.questions.build(question_params)
    if @question.save
      render status: :ok, json: { success: "Question created successfully!" }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors.full_messages.to_sentence }
    end
  end

  def show
    @options = @question.options 
    render status: :ok, json: { question: @question , options: @options }
  
  end

  def update 
    if @question.update(question_params)
      render status: :ok, json: { success: "Question updated successfully." }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
      if @quiz.questions.empty?
        @quiz.unpublish
        @quiz.save 
      end
      render status: :ok, json: { success: "Question deleted successfully" }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors.full_messages }
    end
  end


  private 

  def get_question 
    @question = Question.find_by(id:  params[:id])
    unless @question.present?
      render :json => {:error => "not-found"}.to_json, :status => 404
    end 
  end

  def get_quiz 
    @quiz = Quiz.find_by(id:  params[:quiz_id])
    unless @quiz.present?
      render :json => {:error => "not-found"}.to_json, :status => 404
    end 
  end

  def question_params 
    params.require(:question).permit(:description, options_attributes: [:id, :value, :is_correct, :_destroy])
  end
end
