class PublishesController < ApplicationController
  before_action :get_quiz, only: [:create]

  def create
    @quiz.publish 
    if @quiz.save
      render status: :ok, json: { success: "Quiz is successfully published" , quiz: @quiz }
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

end
