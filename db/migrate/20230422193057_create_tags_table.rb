class CreateTagsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :tags_tables do |t|
      t.string :name
      t.timestamps
    end
  end
end
