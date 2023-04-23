class AddLocationToTravelogues < ActiveRecord::Migration[6.1]
  def change
    add_column :travelogues, :location, :string
  end
end
