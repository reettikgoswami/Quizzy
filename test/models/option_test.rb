# frozen_string_literal: true

require 'test_helper'

class OptionTest < ActiveSupport::TestCase
  def setup 
    @user = User.new(first_name: "sam", last_name: "Smith", email: "samsmith@example.com", password: 'welcome', password_confirmation: 'welcome',role: "administrator")
    @user.save
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @quiz.save
    @question = @quiz.questions.build(description: "Which planet is closest to sun?")
    @question.save
    @option  = @question.options.build(value: "Vanus") 
  end


  def test_option_should_be_valid 
    assert @option.valid?
  end

  def test_value_should_be_present 
    @option.value = nil
    assert_not @option.valid?
    assert_equal @option.errors.full_messages, ["Value can't be blank"]
  end

end
