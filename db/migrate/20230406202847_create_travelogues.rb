class CreateTravelogues < ActiveRecord::Migration[6.1]
  def change
    create_table :travelogues do |t|
      t.string :title
      t.text :description
      t.boolean :saved
      t.integer :collection_id
      t.integer :tag_id
      t.timestamps
    end
  end
end
