class RemoveIsPublishedFromQuiz < ActiveRecord::Migration[6.0]
  def change
    remove_column :quizzes, :is_published, :boolean
    change_column :quizzes, :slug, :string, null: true
  end
end
