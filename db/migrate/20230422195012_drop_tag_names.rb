class DropTagNames < ActiveRecord::Migration[6.1]
  def change
    drop_table :tag_names
  end
end
