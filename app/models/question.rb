class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :description, presence: true
  validates :quiz_id, presence: true
  accepts_nested_attributes_for :options, allow_destroy: true
  
end
