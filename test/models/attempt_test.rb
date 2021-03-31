require 'test_helper'

class AttemptTest < ActiveSupport::TestCase
  def setup 
    @user = User.create(first_name: "sam", last_name: "Smith", email: "samsmith@example.com", password: 'welcome', password_confirmation: 'welcome')

    @quiz = @user.quizzes.build(name: "History Quiz")
    @quiz.save

    @attempt = Attempt.new(quiz_id: @quiz.id, user_id: @user.id )
  end

  def test_attempt_should_be_valid 
    assert @attempt.valid?
  end

  def test_user_id_should_be_present 
    @attempt.user_id = nil
    assert_not @attempt.valid? 
    assert_equal @attempt.errors.full_messages, ["User must exist","User can't be blank"]
  end

  def test_quiz_id_should_be_present 
    @attempt.quiz_id = nil
    assert_not @attempt.valid? 
    assert_equal @attempt.errors.full_messages, ["Quiz must exist", "Quiz can't be blank"]
  end

end
