class User < ApplicationRecord
  validates :first_name, :last_name, presence: true, length: {maximum: 25}
  validates :phone_number, presence: :true
  validates :email, presence: true
end
