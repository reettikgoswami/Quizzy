require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  def setup 
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com")
  end

  def test_user_should_be_valid 
    assert @user.valid?
  end

  def test_first_name_should_be_present 
    @user.first_name = " "
    assert_not @user.valid?
  end

  def test_last_name_should_be_present 
    @user.last_name = " "
    assert_not @user.valid?
  end

  def test_email_should_be_present 
    @user.email = " "
    assert_not @user.valid?
  end

  def test_first_name_should_not_be_too_long 
    @user.first_name = "a" * 51
    assert_not @user.valid?
  end

  def test_last_name_should_not_be_too_long 
    @user.last_name = "a" * 51
    assert_not @user.valid?
  end

  def test_email_should_be_unique 
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
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
    end
  end

  def test_email_should_not_be_case_sensitive 
    @another_user = User.new(first_name: "Sam", last_name: "Smith", email: "sAM@example.com")
    @user.save
    assert_not @another_user.valid?
  end

end
