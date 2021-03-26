class AddSlugToQuiz < ActiveRecord::Migration[6.0]
  def change
    add_column :quizzes, :slug, :string, null: false, index: { unique: true }
    add_column :quizzes, :is_published, :boolean, null: false, default: false
  end
end
