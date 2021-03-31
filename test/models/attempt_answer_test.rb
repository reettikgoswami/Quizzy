require 'test_helper'

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup 
    @user = User.create(first_name: "sam", last_name: "Smith", email: "samsmith@example.com", password: 'welcome', password_confirmation: 'welcome')

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
    @question.save
    @attempt = Attempt.create(quiz_id: @quiz.id, user_id: @user.id )
    option = @question.options.first
    @attempt_answer = AttemptAnswer.new(attempt_id: @attempt.id, question_id: @question.id,option_id:  option.id)
  end

  def test_attempt_answer_should_be_valid 
    assert @attempt_answer.valid?
  end
  
  def test_attempt_id_should_be_present 
    @attempt_answer.attempt_id = nil
    assert_not @attempt_answer.valid? 
    assert_equal @attempt_answer.errors.full_messages, ["Attempt must exist", "Attempt can't be blank"]
  end

  def test_question_id_should_be_present 
    @attempt_answer.question_id = nil
    assert_not @attempt_answer.valid? 
    assert_equal @attempt_answer.errors.full_messages, ["Question must exist", "Question can't be blank"]
  end

  def test_option_id_should_be_present 
    @attempt_answer.option_id = nil
    assert_not @attempt_answer.valid? 
    assert_equal @attempt_answer.errors.full_messages, ["Option must exist", "Option can't be blank"]
  end



end
