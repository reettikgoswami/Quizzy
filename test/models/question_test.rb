# frozen_string_literal: true

require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  
  def setup 
    @user = User.new(first_name: "sam", last_name: "Smith", email: "samsmith@example.com", password: 'welcome', password_confirmation: 'welcome')
    @user.save
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @quiz.save
    question_params = {
      :question => 
                  {
                   description: "Which planet is closest to sun?",
                   options_attributes: [
                     {
                      value: "Earth",
                      is_correct: false
                     },
                     {
                      value: "Mercury",
                      is_correct: true
                     },
                     {
                      value: "Mars",
                      is_correct: false
                     },
                     {
                      value: "Venus",
                      is_correct: false
                     }    
                   ]            
                  }        
                }
    @question = @quiz.questions.build(question_params[:question]) 
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

  def test_question_has_atleast_2_options
    option = Option.create({ value: "Mercury", is_correct: true }) 
    @question.options = [option]
    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Question must_have at least 2 options."]
  end

  def test_question_have_only_one_correct_answer  
    option1 = Option.create({ value: "Mercury", is_correct: true })
    option2 = Option.create({ value: "Mars", is_correct: true }) 
    @question.options = [option1, option2]
    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Question must have only one correct answer."]
  end

  def test_question_must_have_a_correct_answer 
    option1 = Option.create({ value: "Mercury", is_correct: false })
    option2 = Option.create({ value: "Mars", is_correct: false }) 
    @question.options = [option1, option2]
    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Question must_have_a_correct_answer."]
  end

  def test_question_has_atmost_4_options
    option5 = Option.create({ value: "Saturn", is_correct: false })
    @question.options << option5
    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Question must_have at most 4 options."]
  end

end
