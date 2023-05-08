class AddDefaultToUsersName < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :name, from: nil, to: ''
  end
end
