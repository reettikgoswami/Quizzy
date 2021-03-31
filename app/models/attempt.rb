class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates_presence_of :user_id, :quiz_id
  validates :submitted,  default: false
  validates :correct_answer_count, numericality: { greater_than_or_equal_to: 0 }
  validates :incorrect_answer_count, numericality: { greater_than_or_equal_to: 0 }

end
