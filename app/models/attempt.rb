class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy
end
