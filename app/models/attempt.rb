class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates_presence_of :user_id, :quiz_id
  validates :submitted,  default: false
  validates :correct_answer_count, numericality: { greater_than_or_equal_to: 0 }
  validates :incorrect_answer_count, numericality: { greater_than_or_equal_to: 0 }


  def store_correct_and_incorrect_answers_count 
    no_of_correct_answers = 0
    no_of_incorrect_answers = 0

    attempted_answers = self.attempt_answers
    questions = quiz.questions
    question_options = questions.map {|question|  question.options }

    attempt_answers_hash = {}

    attempted_answers.each { |attempt| attempt_answers_hash[attempt.question_id] = attempt.option_id }

    question_options.each do |options| 
     options.each do |option| 
        if attempt_answers_hash[option.question_id] == option.id
          if option.is_correct
            no_of_correct_answers += 1
          else
            no_of_incorrect_answers += 1
          end
        end
     end
    end
    
    self.correct_answer_count = no_of_correct_answers
    self.incorrect_answer_count = no_of_incorrect_answers

  end


end
