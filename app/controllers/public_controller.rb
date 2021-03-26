class PublicController < ApplicationController
  skip_before_action :logged_in_user

  def show 
    @quiz = Quiz.find_by(slug: params[:slug])
    if @quiz.present? && @quiz.is_published
      redirect_to root_url + "public/" + params[:slug] + "/attempt/new"
    else 
      render status: :forbidden, json: { error: "Quiz not published!"}
    end
  end

end
