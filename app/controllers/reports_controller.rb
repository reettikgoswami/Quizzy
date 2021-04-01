class ReportsController < ApplicationController
  skip_before_action :logged_in_user
  before_action :generate_report, only: [:index, :create,]

  def index 
    render status: :ok, json: { report: @reports }
  end
  
  def create
    render status: :ok, json: { success: "Your report is prepared successfully" }
  end

  def show 
    render status: 404, json: { error: "Report not found" }
  end

  private

  def generate_report
    @attempts = Attempt.where(submitted: true)
    @reports = []

    @attempts.each do |attempt|
      user = attempt.user
      quiz = attempt.quiz

      report = {
        quiz_name: quiz.name,
        user_name: user.full_name,
        email: user.email,
        correct_answers: attempt.correct_answer_count,
        incorrect_answers: attempt.incorrect_answer_count
      }
      @reports.push(report)
    end
  end

end
