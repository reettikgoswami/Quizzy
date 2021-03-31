class CreateAttempts < ActiveRecord::Migration[6.0]
  def change
    create_table :attempts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :quiz, null: false, foreign_key: true
      t.boolean :submitted, default: false, null: false
      t.integer :correct_answer_count, default: 0, null: false
      t.integer :incorrect_answer_count, default: 0, null: false

      t.timestamps
    end
  end
end
