class RemoveLocationIdFromTravelogues < ActiveRecord::Migration[6.1]
  def change
    remove_column :travelogues, :location_id
  end
end
