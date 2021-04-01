require 'csv'
class ReportsController < ApplicationController
  skip_before_action :logged_in_user
  before_action :generate_report, only: [:index, :create,]

  def index 
    render status: :ok, json: { report: @reports }
  end
  
  def create
    ReportJob.perform_later(@reports)
    sleep 11
    render status: :ok, json: { message: "Your report is prepared successfully"}
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



  # def generate_csv(reports)
  #   attributes = ["Quiz Name", "User Name", "Email", "Correct Answers", "Incorrect Answers"]
  #   CSV.generate(headers: true) do |csv| 
  #     csv << attributes 
    
  #     reports.each do |report| 
  #       single_row = [report[:quiz].name, report[:user].full_name, report[:user].email, report[:attempt].correct_answer_count, report[:attempt].incorrect_answer_count]
  #       csv << single_row
  #     end
  #    end 
  # end

end
