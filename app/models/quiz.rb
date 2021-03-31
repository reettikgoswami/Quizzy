# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user 
  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy

  default_scope -> { order(created_at: :desc) }
  
  validates :name, presence: true  
  validates :user_id , presence: true 
  validates :slug, uniqueness: true, allow_nil: true 
  
  def publish 
    generate_slug
  end 

  def unpublish 
    self.slug = nil
  end

  private

  def generate_slug
    slug = name.to_s.parameterize
    counter = 1
    if Quiz.exists?(slug: slug)
      loop do 
        new_slug = "#{slug}-#{counter}"
        break self.slug = new_slug  unless Quiz.exists?(slug: new_slug) 
        counter += 1
      end
    else 
      self.slug = slug 
    end    
  end 

end
