class RemovePublishedFromTravelogues < ActiveRecord::Migration[6.1]
  def change
    remove_column :travelogues, :published
  end
end
