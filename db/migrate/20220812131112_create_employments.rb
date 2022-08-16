class CreateEmployments < ActiveRecord::Migration[7.0]
  def change
    create_table :employments do |t|
      t.string :employer
      t.string :start_date
      t.string :end_date
      t.timestamps
    end
  end
end
