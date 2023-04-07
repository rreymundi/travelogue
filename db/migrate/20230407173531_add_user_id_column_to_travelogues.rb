class AddUserIdColumnToTravelogues < ActiveRecord::Migration[6.1]
  def change
    add_column :travelogues, :user_id, :integer
  end
end