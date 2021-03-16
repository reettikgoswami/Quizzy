desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task :populate_with_sample_data do
  create_sample_data!
end

def create_sample_data!

  puts 'Seeding with sample data...'
  user_details = { first_name: 'Sam',
                   last_name: 'Smith',
                   email: 'sam@example.com',
                   role: "administrator",
                   password: 'welcome',
                   password_confirmation: 'welcome' }
  User.create! user_details
  puts 'Done! Now you can login with "sam@example.com" using password "welcome"'
end
