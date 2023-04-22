class RenameTagsTableToTags < ActiveRecord::Migration[6.1]
  def change
    rename_table :tags_tables, :tags
  end
end
