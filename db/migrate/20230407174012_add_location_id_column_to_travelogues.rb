class AddLocationIdColumnToTravelogues < ActiveRecord::Migration[6.1]
  def change
    add_column :travelogues, :location_id, :integer
  end
end
