class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy

  validates :description, presence: true
  validates :quiz_id, presence: true

  accepts_nested_attributes_for :options,
                                  reject_if: proc { |attributes| attributes["value"].blank?}, allow_destroy: true

  validate :question_must_have_a_correct_answer, :options_limit


  def options_limit
    if options.length < 2
      errors.add(:question, "must_have at least 2 options.")
    end
    if options.length > 4
      errors.add(:question, "must_have at most 4 options.")
    end
  end

  def question_must_have_a_correct_answer
    correct_answer_count = 0

    options.each do |option|
    correct_answer_count += 1 if option.is_correct
    end

    if correct_answer_count == 0
      errors.add(:question, "must_have_a_correct_answer.")
      
    end
    if correct_answer_count > 1 
        errors.add(:question,  "must have only one correct answer.")
    end
  end
  


end
