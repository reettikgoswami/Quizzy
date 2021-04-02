class ReportsController < ApplicationController
  before_action :generate_report, only: [:index, :create,]

  def index 
    render status: :ok, json: { report: @reports }
  end
  
  def create
    if report_exists?
      File.delete("public/report.xlsx")
    end
    ReportDownloadJob.perform_later(@reports)
    # sleep 11
    render status: :ok, json: { success: "Your report is prepared successfully" }
  end

  def show 
    if report_exists?
      send_file "public/report.xlsx", type: "application/xlsx", disposition: "attachment"
    else
      render status: 404, json: { error: "Report not found" }
    end
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

  def report_exists? 
    File.exist?("./public/report.xlsx")
  end
end
