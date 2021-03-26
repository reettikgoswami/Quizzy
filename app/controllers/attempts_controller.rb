class AttemptsController < ApplicationController
  skip_before_action :logged_in_user 

  def index 
    @quiz = Quiz.find_by(slug:  params[:public_slug])
    if @quiz.present?
      render status: :ok, json: { success: "Url is accessable" }
    else 
    render :json => {:error => "Quiz not published!"}.to_json, status: :forbidden
    end
  end

end
