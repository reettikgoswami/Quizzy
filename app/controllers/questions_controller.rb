class QuestionsController < ApplicationController
  before_action :get_quiz, only: [:create]

  def create 
    @question = @quiz.questions.build(question_params)
    if @question.save
      render status: :ok, json: { success: "Question created successfully!" }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    @question = Question.find_by(id: params[:id])
    if @question.destroy
      render status: :ok, json: { success: "Quiz deleted successfully" }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
    end
  end


  private 

  def get_quiz 
    @quiz = Quiz.find_by(id:  params[:quiz_id])
    unless @quiz.present?
      render :json => {:error => "not-found"}.to_json, :status => 404
    end 
  end

  def question_params 
    params.require(:question).permit(:description, options_attributes: [:value, :is_correct])
  end
end
