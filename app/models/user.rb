class User < ApplicationRecord
  
  before_save :downcase_email

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :first_name, presence: true, length: { maximum: 50 }                  
  validates :last_name, presence: true, length: { maximum: 50 }


  private

  def downcase_email 
    self.email = email.downcase 
  end

end
