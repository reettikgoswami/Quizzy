# frozen_string_literal: true

require 'test_helper'

class QuizTest < ActiveSupport::TestCase
  
  def setup 
    @user = User.new(first_name: "sam", last_name: "Smith", email: "samsmith@example.com", password: 'welcome', password_confirmation: 'welcome',role: "administrator")
    @user.save
    @quiz = @user.quizzes.build(name: "History Quiz")
  end

  def test_quiz_should_be_valid 
    assert @quiz.valid?
  end

  def test_user_id_should_be_present 
    @quiz.user_id = nil
    assert_not @quiz.valid? 
    assert_equal @quiz.errors.full_messages, ["User can't be blank"]
  end

  def test_quiz_name_should_be_present 
    @quiz.name = nil
    assert_not @quiz.valid?
    assert_equal @quiz.errors.full_messages, ["Name can't be blank", "Slug can't be blank"]
  end

end
