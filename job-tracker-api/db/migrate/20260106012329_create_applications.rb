class CreateApplications < ActiveRecord::Migration[8.1]
  def change
    create_table :applications do |t|
      t.string :company_name, null: false
      t.string :role_title, null: false
      t.string :status, null: false

      t.date :applied_on, null: false
      t.date :follow_up_on
      t.date :last_followed_up_on

      t.string :job_url
      t.string :contact_email
      t.string :salary
      t.string :next_action
      t.text :notes

      t.timestamps
    end

    add_index :applications, :status
    add_index :applications, :applied_on
    add_index :applications, :follow_up_on
  end
end
