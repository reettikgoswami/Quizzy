# frozen_string_literal: true

require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  
  def setup 
    @user = User.new(first_name: "sam", last_name: "Smith", email: "samsmith@example.com", password: 'welcome', password_confirmation: 'welcome')
    @user.save
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @quiz.save
    @question = @quiz.questions.build(description: "Which planet is closest to sun?") 
  end

  def test_question_should_be_valid 
    assert @question.valid?
  end

  def test_quiz_id_should_be_present 
    @question.quiz_id = nil
    assert_not @question.valid? 
    assert_equal @question.errors.full_messages, ["Quiz can't be blank"]
  end

  def test_description_should_be_present 
    @question.description = nil
    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Description can't be blank"]
  end

end
