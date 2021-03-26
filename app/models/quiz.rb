# frozen_string_literal: true

class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  belongs_to :user 

  validates :name, presence: true  
  validates :user_id , presence: true 
  validates :slug, presence: true, uniqueness: true 
  validates :is_published, default: false 
  
  before_validation :generate_slug 

  def publish 
    self.is_published = true    
  end 

  def unpublish 
    self.is_published = false
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
