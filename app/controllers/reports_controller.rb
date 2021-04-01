require 'csv'
class ReportsController < ApplicationController
  
  skip_before_action :logged_in_user

  def index 
    @attempts = Attempt.where(submitted: true)
    @attempts_with_user_and_quiz = @attempts.map {|attempt| { user: attempt.user , quiz: attempt.quiz, attempt: attempt}}
    render status: :ok, json: { attempt: @attempts_with_user_and_quiz }
  end
  
  def create 
    @attempts = Attempt.where(submitted: true)
    @report_data = @attempts.map { |attempt| { user: attempt.user , quiz: attempt.quiz, attempt: attempt }}

    respond_to do |format|
      format.csv { send_data  generate_csv(@report_data) , filename: "Report-#{Date.today}.csv" }
    end
  end

  private

  def generate_csv(reports)
    attributes = ["Quiz Name", "User Name", "Email", "Correct Answers", "Incorrect Answers"]
    CSV.generate(headers: true) do |csv| 
      csv << attributes 
    
      reports.each do |report| 
        single_row = [report[:quiz].name, report[:user].full_name, report[:user].email, report[:attempt].correct_answer_count, report[:attempt].incorrect_answer_count]
        csv << single_row
      end
     end 
  end

end
