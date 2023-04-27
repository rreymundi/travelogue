class RemoveSavedFromTravelogues < ActiveRecord::Migration[6.1]
  def change
    remove_column :travelogues, :saved
  end
end
