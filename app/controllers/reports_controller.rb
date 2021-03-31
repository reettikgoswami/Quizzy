class ReportsController < ApplicationController

  def index 
    @attempts = Attempt.where(submitted: true)
    @attempts_with_user_and_quiz = @attempts.map {|attempt| { user: attempt.user , quiz: attempt.quiz, attempt: attempt}}
    render status: :ok, json: { attempt: @attempts_with_user_and_quiz }
  end
  
end
