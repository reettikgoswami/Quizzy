class CreateAttemptAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :attempt_answers do |t|
      t.references :attempt, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      t.references :option, null: false, foreign_key: true

      t.timestamps
    end
    add_index :attempt_answers, [:attempt_id, :question_id], unique: true
  end
end
