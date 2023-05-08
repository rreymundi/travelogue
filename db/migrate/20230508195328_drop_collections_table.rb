class DropCollectionsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :collections
  end
end
