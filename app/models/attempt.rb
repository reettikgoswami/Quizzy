class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates_presence_of :user_id, :quiz_id
  validates :submitted, presence: true, default: false
  validates :correct_answer_count, presence: true, default: 0
  validates :incorrect_answer_count, presence: true, default: 0

end
