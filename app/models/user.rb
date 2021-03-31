# frozen_string_literal: true

class User < ApplicationRecord
  has_many :quizzes, dependent: :destroy
  has_many :attempts, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy

  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  
  enum role: %i(standard administrator)
  
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
  uniqueness: { case_sensitive: false }
  validates :first_name, presence: true, length: { maximum: 50 }                  
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true, on: :create
  
  before_save :downcase_email
  before_validation :generate_password
  
  has_secure_password

  private

  def generate_password
    if role == "standard"
      newPassword = SecureRandom.urlsafe_base64
      self.password = newPassword
      self.password_confirmation = newPassword
    end
  end

  def downcase_email 
    self.email = email.downcase 
  end

end
