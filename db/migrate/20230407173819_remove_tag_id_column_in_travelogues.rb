class RemoveTagIdColumnInTravelogues < ActiveRecord::Migration[6.1]
  def change
    remove_column :travelogues, :tag_id
  end
end
