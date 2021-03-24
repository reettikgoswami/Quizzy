class Option < ApplicationRecord
  belongs_to :question

  validates :value, presence: true
  validates :is_correct, default: false

end
