require "axlsx"

class ReportDownloadJob < ApplicationJob
  queue_as :default

  def perform(reports)
    generate_report(reports)
  end

  private

  def generate_report(reports)
    Axlsx::Package.new do |p|

      p.workbook.add_worksheet(name: "Report") do |sheet|      
        sheet.add_row ["Quiz Name", "User Name", "Email", "Correct Answers", "Incorrect Answers"]

        reports.each do |report| 
          sheet.add_row [report[:quiz_name], report[:user_name], report[:email], report[:correct_answers], report[:incorrect_answers]]
        end
      end

      p.use_shared_strings = true
      p.serialize("public/report.xlsx")

    end
  end

end
