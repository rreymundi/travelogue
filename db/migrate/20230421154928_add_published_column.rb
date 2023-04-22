class AddPublishedColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :travelogues, :published, :boolean
  end
end
