class Remove < ActiveRecord::Migration[6.1]
  def change
    remove_column :travelogues, :collection_id
  end
end
