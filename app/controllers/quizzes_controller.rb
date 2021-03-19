class QuizzesController < ApplicationController
  
  before_action :logged_in_user, only: [:create]

  def create
    @quiz = current_user.quizzes.build(quiz_params)
      
    if @quiz.save 
      render status: :ok, json: { success: "Quiz successfully created!" }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errro.full_messages }
    end
  end

  private 

  def quiz_params
    params.require(:quiz).permit(:name)
  end

end
