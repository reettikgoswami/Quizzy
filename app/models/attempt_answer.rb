class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question
  belongs_to :option

  validates_presence_of :attempt_id, :question_id, :option_id
  validates_uniqueness_of :attempt_id, :scope => :question_id

end
