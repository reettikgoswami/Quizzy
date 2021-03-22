# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  def setup 
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: 'welcome', password_confirmation: 'welcome')
  end

  def test_user_should_be_valid 
    assert @user.valid?
  end

  def test_first_name_should_be_present 
    @user.first_name = " "
    assert_not @user.valid?
    assert_equal @user.errors.full_messages, ["First name can't be blank"]
  end

  def test_last_name_should_be_present 
    @user.last_name = " "
    assert_not @user.valid?
    assert_equal @user.errors.full_messages,["Last name can't be blank"]
  end

  def test_email_should_be_present 
    @user.email = " "
    assert_not @user.valid?
    assert_equal @user.errors.full_messages, ["Email can't be blank", "Email is invalid"]
  end

  def test_first_name_should_not_be_too_long 
    @user.first_name = "a" * 51
    assert_not @user.valid?
    assert_equal @user.errors.full_messages, ["First name is too long (maximum is 50 characters)"]
  end

  def test_last_name_should_not_be_too_long 
    @user.last_name = "a" * 51
    assert_not @user.valid?
    assert_equal @user.errors.full_messages, ["Last name is too long (maximum is 50 characters)"]
  end

  def test_email_should_be_unique 
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
    assert_equal duplicate_user.errors.full_messages, ["Email has already been taken"]
  end

  def test_email_addresses_should_be_saved_as_lower_case
    mixed_case_email = "sAm@ExamPle.com"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email 
  end


  def test_email_validation_should_accept_valid_addresses 
    valid_addresses = %w[sam@example.com firstname.lastname@example.com 1234567890@example.come email@subdomain.example.com]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?
    end
  end

  def test_email_validation_should_reject_invalid_addresses 
    invalid_addresses = %w[sam@example,com user_at_sam.org user.sam@example.
    sam@eve_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?
      assert_equal @user.errors.full_messages, ["Email is invalid"]
    end
  end

  def test_email_should_not_be_case_sensitive 
    @another_user = User.new(first_name: "Sam", last_name: "evans", email: "sAM@example.com",password: 'welcome', password_confirmation: 'welcome')
    @user.save
    assert_not @another_user.valid?
    assert_equal @another_user.errors.full_messages, ["Email has already been taken"]
  end

  def test_user_should_have_a_valid_role 
    @new_user = User.new(first_name: "Eve", last_name: "Smith", email: "Eve@example.com")
    
    assert @new_user.standard?
    assert_not @new_user.administrator?
    
    @new_user.role = "administrator"
    
    assert @new_user.administrator?
    assert_not @new_user.standard?

  end

  def test_user_should_not_have_an_invalid_role 
    @new_user = User.new(first_name: "Eve", last_name: "Smith", email: "Eve@example.com")

    assert_raises ArgumentError do 
      @new_user.role = "volunteer" 
    end
  end

  def test_password_should_be_present 
    @user.password = @user.password_confirmation = "a" * 6
    assert @user.valid?
  end

  def test_password_should_have_a_minimum_length 
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
    assert_equal @user.errors.full_messages, ["Password is too short (minimum is 6 characters)"]
  end
  
  def test_password_and_password_confirmation_should_match 
    @user.password = "a" * 8
    @user.password_confirmation = "a" * 8
    assert @user.valid?
    
    @user.password = "a" * 8
    @user.password_confirmation = "b" * 8
    assert_not @user.valid?
    assert_equal @user.errors.full_messages, ["Password confirmation doesn't match Password"]
  end

end
